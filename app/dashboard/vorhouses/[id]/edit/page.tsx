import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import Form from "@/app/ui/vorHouses/edit-form";
import { fetchVorHouseById } from "@/app/lib/vorHouseData";
import { fetchPersons } from "@/app/lib/personData";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [vorHouse, persons] = await Promise.all([
    fetchVorHouseById(id),
    fetchPersons(),
  ]);

  if (!vorHouse) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Фор семьи", href: "/dashboard/vorhouses" },
          {
            label: "Изменить персонажа",
            href: `/dashboard/vorhouses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form vorHouse={vorHouse} persons={persons} />
    </main>
  );
}
