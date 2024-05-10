import { VorHouse, VorHouseMembersTable } from "@/app/lib/definitions2";
import { DeleteVorHouseMember } from "./buttons";

export default function MembersTable({
  vorHouse,
  vorHouseMembers,
}: {
  vorHouse: VorHouse;
  vorHouseMembers: VorHouseMembersTable[];
}) {
  return (
    <div>
      <div className="mb-8">{vorHouse.family_name}</div>
      {vorHouseMembers.length === 0 && <div>Члены семьи не найдены</div>}

      <div className="ml-8">
        {vorHouseMembers.map((member) => (
          <div key={member.person_id} className="flex w-1/2 mb-4">
            <div className="flex-auto">{member.person_name}</div>
            <div className="flex justify-end gap-3">
              <DeleteVorHouseMember id={member.person_id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
