import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import Form from "@/app/ui/countess-requests/edit-form";
import { COUNTESS_REQUESTS_ROUTE, PERSONS_ROUTE } from "@/routes";
import {
  fetchCountessRequestById,
  fetchVorHousesWithoutCountessRequests,
} from "@/app/lib/countessRequestData";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [countessRequest, vorHouses] = await Promise.all([
    fetchCountessRequestById(id),
    fetchVorHousesWithoutCountessRequests(),
  ]);

  if (!countessRequest) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Заявки графинь", href: COUNTESS_REQUESTS_ROUTE },
          {
            label: "Изменить заявку",
            href: `${COUNTESS_REQUESTS_ROUTE}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form countessRequest={countessRequest} vorHouses={vorHouses} />
    </main>
  );
}
