import { fetchFilteredCouncilSessions } from "@/app/lib/sessionData";
import { DeleteSession, UpdateSession } from "./buttons";
import { COUNCIL_SESSION_STATUS_I18N } from "@/constants";
import { Card } from "../questions/card";
import { CreateQuestion } from "../questions/buttons";

export default async function VorHousesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const sessions = await fetchFilteredCouncilSessions(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {sessions?.map((session) => (
            <div key={session.id} className="mb-10">
              <div>
                <h2>{session.title}</h2>
                {session.date_time}{" "}
                {COUNCIL_SESSION_STATUS_I18N[session.status]}
                <div className="flex justify-end gap-3">
                  <CreateQuestion id={session.id} />
                  <UpdateSession id={session.id} />
                  <DeleteSession id={session.id} />
                </div>
              </div>
              <div className="ml-8">
                {session.questions.map((question) => (
                  <Card key={question.id} question={question} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
