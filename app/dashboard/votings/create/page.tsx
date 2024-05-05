import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/votings/create-form";
import { VOTINGS_ROUTE } from "@/routes";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Голосования", href: VOTINGS_ROUTE },
          {
            label: "Создать голосование",
            href: `${VOTINGS_ROUTE}/create`,
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
