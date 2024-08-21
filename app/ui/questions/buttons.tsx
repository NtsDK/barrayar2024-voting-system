import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  HandRaisedIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { QUESTIONS_ROUTE } from "@/routes";
import { deleteSession } from "@/app/lib/sessionActions";
import { deleteQuestion } from "@/app/lib/questionActions";
import { DeleteButtonWrapper } from "../common/delete-button-wrapper";

export function CreateQuestion({ id }: { id: string }) {
  return (
    <Link
      href={`${QUESTIONS_ROUTE}/${id}/create`}
      title="Создать вопрос"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PlusIcon className="h-5" />
    </Link>
  );
}

export function UpdateQuestion({ sessionId, id }: { sessionId: string; id: string }) {
  return (
    <Link
      href={`${QUESTIONS_ROUTE}/${sessionId}/${id}/edit`}
      title="Изменить вопрос"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteQuestion0({ id }: { id: string }) {
  const deleteQuestionWithId = deleteQuestion.bind(null, id);
  return (
    <form action={deleteQuestionWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100" title="Удалить вопрос">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteQuestion({ id }: { id: string }) {
  return (
    <DeleteButtonWrapper title="Удалить вопрос">
      <DeleteQuestion0 id={id} />
    </DeleteButtonWrapper>
  );
}

export function VoteOnQuestion({ sessionId, id }: { sessionId: string; id: string }) {
  return (
    <Link
      href={`${QUESTIONS_ROUTE}/${sessionId}/${id}/vote`}
      className="rounded-md border p-2 hover:bg-gray-100 flex"
      title="Проголосовать по вопросу"
    >
      <HandThumbUpIcon className="w-5" />
      <HandRaisedIcon className="w-5" />
      <HandThumbDownIcon className="w-5" />
    </Link>
  );
}
