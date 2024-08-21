import { PencilIcon, PlusIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deletePerson } from "@/app/lib/personActions";
import { COUNTESS_REQUESTS_ROUTE } from "@/routes";
import { deleteCountessRequest } from "@/app/lib/countessRequestActions";

export function CreateCountessRequest() {
  return (
    <Link
      href={`${COUNTESS_REQUESTS_ROUTE}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Создать заявку</span> <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCountessRequest({ id, editable }: { id: string; editable: boolean }) {
  const params = new URLSearchParams();
  params.set("editable", String(editable));
  return (
    <Link
      href={`${COUNTESS_REQUESTS_ROUTE}/${id}/edit?${params.toString()}`}
      className="rounded-md border p-2 hover:bg-gray-100"
      title={editable ? "Изменить заявку графини" : "Посмотреть заявку графини"}
    >
      {editable ? <PencilIcon className="w-5" /> : <MagnifyingGlassIcon className="w-5" />}
    </Link>
  );
}

export function DeleteCountessRequest({ id }: { id: string }) {
  const deleteCountessRequestWithId = deleteCountessRequest.bind(null, id);
  return (
    <form action={deleteCountessRequestWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100" title="Удалить заявку графини">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
