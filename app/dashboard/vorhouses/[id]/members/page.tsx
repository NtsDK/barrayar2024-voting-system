import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { notFound } from "next/navigation";
import Form from "@/app/ui/vorHouses/edit-form";
import { fetchVorHouseById } from "@/app/lib/vorHouseData";
import { fetchPersons } from "@/app/lib/personData";
import { VORHOUSES_ROUTE } from "@/routes";
import {
  fetchPersonsWithVorHouse,
  fetchVorHouseMembersById,
} from "@/app/lib/vorHouseMemberData";
import MembersTable from "@/app/ui/vorHouses/members-table";
import AddMemberForm from "@/app/ui/vorHouses/add-member-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [vorHouse, vorHouseMembers, persons] = await Promise.all([
    fetchVorHouseById(id),
    fetchVorHouseMembersById(id),
    fetchPersonsWithVorHouse(),
  ]);

  if (!vorHouse || !vorHouseMembers || !persons) {
    notFound();
  }

  // console.log("persons", persons);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Фор семьи", href: VORHOUSES_ROUTE },
          {
            label: "Члены и друзья семьи",
            href: `${VORHOUSES_ROUTE}/${id}/members`,
            active: true,
          },
        ]}
      />
      <div className="mb-8">
        <AddMemberForm house_id={id} persons={persons} />
      </div>
      <MembersTable vorHouse={vorHouse} vorHouseMembers={vorHouseMembers} />
    </main>
  );
}
