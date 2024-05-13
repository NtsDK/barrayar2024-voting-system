import { fetchVorHouses } from "@/app/lib/vorHouseData";
import { fetchPersonsWithVorHouse } from "@/app/lib/vorHouseMemberData";
import { lusitana } from "@/app/ui/fonts";
import ChangeSocialCapitalForm from "@/app/ui/social-capital/change-social-capital-form";
import { notFound } from "next/navigation";

export default async function Page() {
  const [persons, vorHouses] = await Promise.all([
    fetchPersonsWithVorHouse(),
    fetchVorHouses(),
  ]);

  if (!persons || !vorHouses) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Социальный капитал</h1>
      </div>
      <ChangeSocialCapitalForm persons={persons} vorHouses={vorHouses} />
    </div>
  );
}
