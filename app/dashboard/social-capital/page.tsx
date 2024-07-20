import { fetchSocCapLog } from "@/app/lib/socCapLogData";
import { fetchVorHouses } from "@/app/lib/vorHouseData";
import { fetchPersonsWithVorHouse } from "@/app/lib/vorHouseMemberData";
import { lusitana } from "@/app/ui/fonts";
import ChangeSocialCapitalForm from "@/app/ui/social-capital/change-social-capital-form";
import { SocialCapitalLogTable } from "@/app/ui/social-capital/social-capital-log-table";
import { notFound } from "next/navigation";

export default async function Page() {
  const [persons, vorHouses, socCapLog] = await Promise.all([
    fetchPersonsWithVorHouse(),
    fetchVorHouses(),
    fetchSocCapLog(),
  ]);

  if (!persons || !vorHouses || !socCapLog) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className={`${lusitana.className} text-2xl`}>Социальный капитал</h1>
      </div>
      <ChangeSocialCapitalForm persons={persons} vorHouses={vorHouses} className="mb-8" />
      <SocialCapitalLogTable socCapLog={socCapLog} />
    </div>
  );
}
