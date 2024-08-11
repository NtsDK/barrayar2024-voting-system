import { fetchCountessRequestSessions, fetchFilteredCouncilSessions } from "@/app/lib/sessionData";
import { fetchSocCapCosts } from "@/app/lib/socCapCostsData";
import { fetchVorHouses } from "@/app/lib/vorHouseData";
import { CountessFormBody } from "@/app/ui/countess-form/countess-form-body";
import { notFound } from "next/navigation";

export default async function Page() {
  const [vorHouses, countessRequestSessions, sessions, socCapCostsTable] = await Promise.all([
    fetchVorHouses(),
    fetchCountessRequestSessions(),
    fetchFilteredCouncilSessions(),
    fetchSocCapCosts(),
  ]);

  if (countessRequestSessions.length !== 1) {
    return <p>Количество голосований графинь: {countessRequestSessions.length}</p>;
  }

  const session = sessions.find((session) => session.id === countessRequestSessions[0].id);

  if (!session || !socCapCostsTable) {
    notFound();
  }

  return (
    <div>
      <div>
        {vorHouses.map((vorHouse) => (
          <div
            key={vorHouse.id}
            style={{ width: "210mm" }}
            className="outline outline-blue-200 print:outline-none break-after-page"
          >
            <header className="flex">
              <div className="font-bold text-sm flex-1">Заседание №___________ </div>
              <div className="font-bold text-sm">
                {vorHouse.family_name} - {vorHouse.social_capital} ск
              </div>
            </header>
            <CountessFormBody session={session} socCapCostsTable={socCapCostsTable} />
          </div>
        ))}
      </div>
    </div>
  );
}
