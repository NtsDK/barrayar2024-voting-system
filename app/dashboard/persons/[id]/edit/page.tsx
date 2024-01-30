// import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { fetchPersonById } from "@/app/lib/data2";
// import Form from "@/app/ui/persons/create-form";
import Form from "@/app/ui/persons/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  // const [invoice, customers] = await Promise.all([
  //   fetchInvoiceById(id),
  //   fetchCustomers(),
  // ]);
  // const invoice = await fetchInvoiceById(id);
  const person = await fetchPersonById(id);

  if (!person) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Персонажи", href: "/dashboard/persons" },
          {
            label: "Изменить персонажа",
            href: `/dashboard/persons/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form person={person} />
    </main>
  );
}
