import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchPersons } from "@/app/lib/personData";
import { QUESTIONS_ROUTE, SESSIONS_ROUTE } from "@/routes";
import { fetchSessionById } from "@/app/lib/sessionData";
import Form from "@/app/ui/questions/edit-form";
import { fetchQuestionById } from "@/app/lib/questionData";

export default async function Page({
  params,
}: {
  params: { sessionId: string; id: string };
}) {
  const sessionId = params.sessionId;
  const id = params.id;
  const [session, persons, question] = await Promise.all([
    fetchSessionById(sessionId),
    fetchPersons(),
    fetchQuestionById(id),
  ]);

  if (!session || !question) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Заседания", href: SESSIONS_ROUTE },
          {
            label: "Изменить вопрос",
            href: `${QUESTIONS_ROUTE}/${sessionId}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form persons={persons} question={question} />
    </main>
  );
}
