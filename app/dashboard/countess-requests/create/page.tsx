import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/countess-requests/create-form";
import { COUNTESS_REQUESTS_ROUTE } from "@/routes";
import { fetchCountessRequestSessions } from "@/app/lib/sessionData";
import { fetchVorHousesWithoutCountessRequests } from "@/app/lib/countessRequestData";
import { fetchCountessRequestQuestions } from "@/app/lib/questionData";

export default async function Page() {
  const [sessions, vorHouses, questions] = await Promise.all([
    fetchCountessRequestSessions(),
    fetchVorHousesWithoutCountessRequests(),
    fetchCountessRequestQuestions(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Заявки графинь", href: COUNTESS_REQUESTS_ROUTE },
          {
            label: "Создать заявку",
            href: `${COUNTESS_REQUESTS_ROUTE}/create`,
            active: true,
          },
        ]}
      />
      {sessions.length === 1 && vorHouses.length > 0 && (
        <Form
          session={sessions[0]}
          vorHouses={vorHouses}
          questions={questions}
        />
      )}
      {sessions.length === 0 && (
        <div>Сейчас нет открытых голосований графинь</div>
      )}
      {vorHouses.length === 0 && <div>Заявки от всех фор домов поданы</div>}

      {sessions.length > 1 && (
        <div>
          <span>
            Открыто несколько голосований графинь. Должно быть открыто только
            одно.
          </span>
          <div>
            {sessions.map((session) => (
              <div key={session.id}>
                {session.date_time} {session.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
