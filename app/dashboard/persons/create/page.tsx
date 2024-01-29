// import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import Form from "@/app/ui/persons/create-form";

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Персонажи", href: "/dashboard/persons" },
          {
            label: "Создать персонажа",
            href: "/dashboard/persons/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
