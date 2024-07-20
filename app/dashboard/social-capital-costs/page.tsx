import { fetchSocCapCosts } from "@/app/lib/socCapCostsData";
import { fetchVorHouses } from "@/app/lib/vorHouseData";
import { fetchPersonsWithVorHouse } from "@/app/lib/vorHouseMemberData";
import { lusitana } from "@/app/ui/fonts";
import ChangeSocialCapitalCostsForm from "@/app/ui/social-capital-costs/change-social-capital-costs-form";
import { notFound } from "next/navigation";

export default async function Page() {
  const socCapCostsTable = await fetchSocCapCosts();

  if (!socCapCostsTable) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Социальный капитал цены</h1>
      </div>
      <ChangeSocialCapitalCostsForm socCapCostsTable={socCapCostsTable} />
    </div>
  );
}
