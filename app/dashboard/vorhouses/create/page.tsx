import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import Form from "@/app/ui/vorHouses/create-form";
import { fetchPersons } from "@/app/lib/personData";

export default async function Page() {
  const persons = await fetchPersons();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Фор семьи", href: "/dashboard/vorhouses" },
          {
            label: "Создать фор семью",
            href: "/dashboard/vorhouses/create",
            active: true,
          },
        ]}
      />
      <Form persons={persons} />
    </main>
  );
}
