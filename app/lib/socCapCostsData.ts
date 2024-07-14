import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { VorHouse, VorHousesTable } from "./definitions2";
import { SocCapCosts, SocCapCostsSettings, SocCapCostsTable, socCapCostsSettingsDefault } from "./voteDefinitions";
import { assertSocCapCostsSettings } from "./voteValidation";

export async function fetchSocCapCosts(): Promise<SocCapCostsTable | undefined> {
  noStore();
  try {
    const data = await sql<SocCapCosts[]>`
      SELECT
        soc_cap_costs.id,
        soc_cap_costs.settings
      FROM soc_cap_costs;
    `;

    return rawSocCapCostsToSocCapCosts(data[0]);
  } catch (error) {
    console.error("Database Error:", error);
  }
}

function rawSocCapCostsToSocCapCosts(rawSocCapCosts: SocCapCosts): SocCapCostsTable {
  let socCapCostsSettings: SocCapCostsSettings = { ...socCapCostsSettingsDefault };
  try {
    socCapCostsSettings = JSON.parse(rawSocCapCosts.settings);
    assertSocCapCostsSettings(socCapCostsSettings);
  } catch (err) {
    console.error("rawSocCapCostsToSocCapCosts", err);
    socCapCostsSettings = { ...socCapCostsSettingsDefault };
  }

  return {
    id: rawSocCapCosts.id,
    settings: socCapCostsSettings,
  };
}
