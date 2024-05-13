import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchPersons } from "@/app/lib/personData";
import { QUESTIONS_ROUTE, SESSIONS_ROUTE } from "@/routes";
import { fetchSessionById } from "@/app/lib/sessionData";
import Form from "@/app/ui/questions/create-form";

export default async function Page({
  params,
}: {
  params: { sessionId: string };
}) {
  const sessionId = params.sessionId;
  const [session, persons] = await Promise.all([
    fetchSessionById(sessionId),
    fetchPersons(),
  ]);

  if (!session) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Голосования", href: SESSIONS_ROUTE },
          {
            label: "Создать вопрос",
            href: `${QUESTIONS_ROUTE}/${sessionId}/create`,
            active: true,
          },
        ]}
      />
      <Form sessionId={sessionId} persons={persons} />
    </main>
  );
}
