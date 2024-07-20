import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { VorHouse, VorHousesTable } from "./definitions2";
import {
  SocCapCosts,
  SocCapCostsSettings,
  SocCapCostsTable,
  SocCapLogItem,
  socCapCostsSettingsDefault,
} from "./voteDefinitions";
import { assertSocCapCostsSettings } from "./voteValidation";

export async function fetchSocCapLog(): Promise<SocCapLogItem[] | undefined> {
  noStore();
  try {
    const data = await sql<SocCapLogItem[]>`
      SELECT
        soc_cap_log.id,
        soc_cap_log.source,
        soc_cap_log.house_name,
        soc_cap_log.recipient_name,
        soc_cap_log.timestamp,
        soc_cap_log.comment,
        soc_cap_log.amount,
        soc_cap_log.total
      FROM 
        soc_cap_log
      ORDER BY
        soc_cap_log.timestamp DESC;
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
