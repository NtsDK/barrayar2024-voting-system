import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/sessions/create-form";
import { SESSIONS_ROUTE } from "@/routes";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Голосования", href: SESSIONS_ROUTE },
          {
            label: "Создать голосование",
            href: `${SESSIONS_ROUTE}/create`,
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
