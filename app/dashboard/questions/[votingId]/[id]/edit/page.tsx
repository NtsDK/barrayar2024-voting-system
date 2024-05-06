import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchPersons } from "@/app/lib/personData";
import { QUESTIONS_ROUTE, VOTINGS_ROUTE } from "@/routes";
import { fetchVotingById } from "@/app/lib/votingData";
// import Form from "@/app/ui/questions/create-form";

export default async function Page({
  params,
}: {
  params: { votingId: string; id: string };
}) {
  const votingId = params.votingId;
  const id = params.id;
  const [voting, persons] = await Promise.all([
    fetchVotingById(votingId),
    fetchPersons(),
  ]);

  if (!voting) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Голосования", href: VOTINGS_ROUTE },
          {
            label: "Изменить вопрос",
            href: `${QUESTIONS_ROUTE}/${votingId}/${id}/create`,
            active: true,
          },
        ]}
      />
      {/* <Form votingId={votingId} persons={persons} /> */}
    </main>
  );
}
