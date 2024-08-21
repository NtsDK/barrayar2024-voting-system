import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deletePerson } from "@/app/lib/personActions";
import { PERSONS_ROUTE } from "@/routes";

export function CreatePerson() {
  return (
    <Link
      href={`${PERSONS_ROUTE}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Создать персонажа</span> <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePerson({ id }: { id: string }) {
  return (
    <Link
      href={`${PERSONS_ROUTE}/${id}/edit`}
      title="Изменить персонажа"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePerson({ id }: { id: string }) {
  const deletePersonWithId = deletePerson.bind(null, id);
  return (
    <form action={deletePersonWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100" title="Удалить персонажа">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
