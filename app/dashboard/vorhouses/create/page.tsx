import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import Form from "@/app/ui/vorHouses/create-form";

export default async function Page() {
  // const customers = await fetchCustomers();

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
      <Form />
    </main>
  );
}
