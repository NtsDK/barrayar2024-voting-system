import { PencilIcon, PlusIcon, TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteVorHouse } from "@/app/lib/vorHouseActions";
import { VORHOUSES_ROUTE } from "@/routes";
import { deleteVorHouseMember } from "@/app/lib/vorHouseMemberActions";
import { DeleteButtonWrapper } from "../common/delete-button-wrapper";

export function CreateVorHouse() {
  return (
    <Link
      href={`${VORHOUSES_ROUTE}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Создать фор семью</span> <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateVorHouse({ id }: { id: string }) {
  return (
    <Link
      href={`${VORHOUSES_ROUTE}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
      title="Изменить фор семью"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function UpdateVorHouseMembers({ id }: { id: string }) {
  return (
    <Link
      href={`${VORHOUSES_ROUTE}/${id}/members`}
      className="rounded-md border p-2 hover:bg-gray-100"
      title="Изменить членов семьи"
    >
      <UsersIcon className="w-5" />
    </Link>
  );
}

export function DeleteVorHouse0({ id }: { id: string }) {
  const deleteVorHouseWithId = deleteVorHouse.bind(null, id);
  return (
    <form action={deleteVorHouseWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100" title="Удалить фор семью">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteVorHouseMember0({ id }: { id: string }) {
  const deleteVorHouseMemberWithId = deleteVorHouseMember.bind(null, id);
  return (
    <form action={deleteVorHouseMemberWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100" title="Удалить члена семьи">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteVorHouse({ id }: { id: string }) {
  return (
    <DeleteButtonWrapper title="Удалить фор семью">
      <DeleteVorHouse0 id={id} />
    </DeleteButtonWrapper>
  );
}
export function DeleteVorHouseMember({ id }: { id: string }) {
  return (
    <DeleteButtonWrapper title="Удалить члена семьи">
      <DeleteVorHouseMember0 id={id} />
    </DeleteButtonWrapper>
  );
}
