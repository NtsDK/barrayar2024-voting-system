import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchPersons } from "@/app/lib/personData";
import { QUESTIONS_ROUTE, SESSIONS_ROUTE } from "@/routes";
import { fetchSessionById } from "@/app/lib/sessionData";
import Form from "@/app/ui/questions/vote-form";
import { fetchQuestionById } from "@/app/lib/questionData";
import { fetchVorHouses } from "@/app/lib/vorHouseData";

export default async function Page({
  params,
}: {
  params: { sessionId: string; id: string };
}) {
  const sessionId = params.sessionId;
  const id = params.id;
  const [session, question, vorHouses] = await Promise.all([
    fetchSessionById(sessionId),
    fetchQuestionById(id),
    fetchVorHouses(),
  ]);

  if (!session || !question || !vorHouses) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Заседания", href: SESSIONS_ROUTE },
          {
            label: "Голосование по вопросу",
            href: `${QUESTIONS_ROUTE}/${sessionId}/${id}/vote`,
            active: true,
          },
        ]}
      />
      <Form question={question} vorHouses={vorHouses} />
    </main>
  );
}
