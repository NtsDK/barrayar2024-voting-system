import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchPersons } from "@/app/lib/personData";
import { QUESTIONS_ROUTE, SESSIONS_ROUTE } from "@/routes";
import { fetchSessionById } from "@/app/lib/sessionData";
import Form from "@/app/ui/questions/vote-form";
import { fetchQuestionById } from "@/app/lib/questionData";
import { fetchVorHouses } from "@/app/lib/vorHouseData";
import { fetchCountessRequestsBySessionId } from "@/app/lib/countessRequestData";
import { CountessQuestionRequestTable } from "@/app/lib/voteDefinitions";
import { fetchSocCapCosts } from "@/app/lib/socCapCostsData";

export default async function Page({ params }: { params: { sessionId: string; id: string } }) {
  const sessionId = params.sessionId;
  const questionId = params.id;
  const [session, question, vorHouses, countessRequests, socCapCostsTable] = await Promise.all([
    fetchSessionById(sessionId),
    fetchQuestionById(questionId),
    fetchVorHouses(),
    fetchCountessRequestsBySessionId(sessionId),
    fetchSocCapCosts(),
  ]);

  if (!session || !question || !vorHouses || !countessRequests || !socCapCostsTable) {
    notFound();
  }
  const countessQuestionRequests: CountessQuestionRequestTable[] = countessRequests.map((el) => ({
    house_id: el.house_id,
    house_name: el.house_name,
    id: el.id,
    session_id: el.session_id,
    timestamp: el.timestamp,
    question_id: questionId,
    affiliatedCounts: el.question_requests[questionId].affiliatedCounts,
    unaffiliatedCounts: el.question_requests[questionId].unaffiliatedCounts,
  }));
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Заседания", href: SESSIONS_ROUTE },
          {
            label: "Голосование по вопросу",
            href: `${QUESTIONS_ROUTE}/${sessionId}/${questionId}/vote`,
            active: true,
          },
        ]}
      />
      <Form
        question={question}
        vorHouses={vorHouses}
        countessQuestionRequests={countessQuestionRequests}
        socCapCostsSettings={socCapCostsTable.settings}
      />
    </main>
  );
}
