import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { VOTINGS_ROUTE } from "@/routes";
import { deleteVoting } from "@/app/lib/votingActions";

export function CreateQuestion({ id }: { id: string }) {
  return (
    <Link
      href={`${VOTINGS_ROUTE}/${id}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PlusIcon className="h-5" />
    </Link>
  );
}

// export function UpdateVoting({ id }: { id: string }) {
//   return (
//     <Link
//       href={`${VOTINGS_ROUTE}/${id}/edit`}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <PencilIcon className="w-5" />
//     </Link>
//   );
// }

// export function DeleteVoting({ id }: { id: string }) {
//   const deleteVotingWithId = deleteVoting.bind(null, id);
//   return (
//     <form action={deleteVotingWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Удалить</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
