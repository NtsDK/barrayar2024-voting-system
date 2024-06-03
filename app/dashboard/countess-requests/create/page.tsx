import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/persons/create-form";
import { COUNTESS_REQUESTS_ROUTE } from "@/routes";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Заявки графинь", href: COUNTESS_REQUESTS_ROUTE },
          {
            label: "Создать заявку",
            href: `${COUNTESS_REQUESTS_ROUTE}/create`,
            active: true,
          },
        ]}
      />
      TODO
      {/* <Form /> */}
    </main>
  );
}
