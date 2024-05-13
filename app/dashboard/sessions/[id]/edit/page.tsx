import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import Form from "@/app/ui/sessions/edit-form";
import { fetchVorHouseById } from "@/app/lib/vorHouseData";
import { fetchPersons } from "@/app/lib/personData";
import { SESSIONS_ROUTE } from "@/routes";
import { fetchSessionById } from "@/app/lib/sessionData";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await fetchSessionById(id);

  if (!session) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Заседания", href: SESSIONS_ROUTE },
          {
            label: "Изменить заседание",
            href: `${SESSIONS_ROUTE}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form session={session} />
    </main>
  );
}
