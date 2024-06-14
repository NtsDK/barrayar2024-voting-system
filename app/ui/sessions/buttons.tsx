import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { SESSIONS_ROUTE } from "@/routes";
import { deleteSession } from "@/app/lib/sessionActions";

export function CreateSession() {
  return (
    <Link
      href={`${SESSIONS_ROUTE}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Создать заседание</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSession({ id }: { id: string }) {
  return (
    <Link
      href={`${SESSIONS_ROUTE}/${id}/edit`}
      title="Изменить заседание"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSession({ id }: { id: string }) {
  const deleteSessionWithId = deleteSession.bind(null, id);
  return (
    <form action={deleteSessionWithId}>
      <button
        className="rounded-md border p-2 hover:bg-gray-100"
        title="Удалить заседание"
      >
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
