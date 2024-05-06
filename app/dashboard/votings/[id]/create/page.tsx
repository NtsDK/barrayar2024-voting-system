import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchPersons } from "@/app/lib/personData";
import { VOTINGS_ROUTE } from "@/routes";
import { fetchVotingById } from "@/app/lib/votingData";
import Form from "@/app/ui/questions/create-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [voting, persons] = await Promise.all([
    fetchVotingById(id),
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
            label: "Создать вопрос",
            href: `${VOTINGS_ROUTE}/${id}/create`,
            active: true,
          },
        ]}
      />
      <Form votingId={id} persons={persons} />
    </main>
  );
}
