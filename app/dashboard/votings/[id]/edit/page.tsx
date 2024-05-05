import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import Form from "@/app/ui/votings/edit-form";
import { fetchVorHouseById } from "@/app/lib/vorHouseData";
import { fetchPersons } from "@/app/lib/personData";
import { VOTINGS_ROUTE } from "@/routes";
import { fetchVotingById } from "@/app/lib/votingData";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const voting = await fetchVotingById(id);

  if (!voting) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Голосования", href: VOTINGS_ROUTE },
          {
            label: "Изменить голосование",
            href: `${VOTINGS_ROUTE}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form voting={voting} />
    </main>
  );
}
