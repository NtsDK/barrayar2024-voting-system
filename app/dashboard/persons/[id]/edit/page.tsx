// import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { fetchPersonById } from "@/app/lib/personData";
// import Form from "@/app/ui/persons/create-form";
import Form from "@/app/ui/persons/edit-form";
import { PERSONS_ROUTE } from "@/routes";

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
          { label: "Персонажи", href: PERSONS_ROUTE },
          {
            label: "Изменить персонажа",
            href: `${PERSONS_ROUTE}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form person={person} />
    </main>
  );
}
