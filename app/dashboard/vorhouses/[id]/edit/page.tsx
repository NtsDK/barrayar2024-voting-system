import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import Form from "@/app/ui/vorHouses/edit-form";
import { fetchVorHouseById } from "@/app/lib/vorHouseData";
import { fetchPersons } from "@/app/lib/personData";
import { VORHOUSES_ROUTE } from "@/routes";

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
          { label: "Фор семьи", href: VORHOUSES_ROUTE },
          {
            label: "Изменить персонажа",
            href: `${VORHOUSES_ROUTE}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form vorHouse={vorHouse} persons={persons} />
    </main>
  );
}
