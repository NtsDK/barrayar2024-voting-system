import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/vorHouses/create-form";
import { fetchPersons } from "@/app/lib/personData";
import { VORHOUSES_ROUTE } from "@/routes";

export default async function Page() {
  const persons = await fetchPersons();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Фор семьи", href: VORHOUSES_ROUTE },
          {
            label: "Создать фор семью",
            href: `${VORHOUSES_ROUTE}/create`,
            active: true,
          },
        ]}
      />
      <Form persons={persons} />
    </main>
  );
}
