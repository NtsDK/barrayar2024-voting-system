import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchPersons } from "@/app/lib/personData";
import { QUESTIONS_ROUTE, VOTINGS_ROUTE } from "@/routes";
import { fetchVotingById } from "@/app/lib/votingData";
import Form from "@/app/ui/questions/edit-form";
import { fetchQuestionById } from "@/app/lib/questionData";

export default async function Page({
  params,
}: {
  params: { votingId: string; id: string };
}) {
  const votingId = params.votingId;
  const id = params.id;
  const [voting, persons, question] = await Promise.all([
    fetchVotingById(votingId),
    fetchPersons(),
    fetchQuestionById(id),
  ]);

  if (!voting || !question) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Голосования", href: VOTINGS_ROUTE },
          {
            label: "Изменить вопрос",
            href: `${QUESTIONS_ROUTE}/${votingId}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form persons={persons} question={question} />
    </main>
  );
}
