import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/persons/create-form";
import { PERSONS_ROUTE } from "@/routes";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Персонажи", href: PERSONS_ROUTE },
          {
            label: "Создать персонажа",
            href: `${PERSONS_ROUTE}/create`,
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
