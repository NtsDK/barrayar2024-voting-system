import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { SessionQuestionsList } from "@/app/lib/definitions2";
import { SESSION_QUESTION_STATUS_I18N, SESSION_QUESTION_TYPE_I18N } from "@/constants";
import clsx from "clsx";
import { DeleteQuestion, UpdateQuestion, VoteOnQuestion } from "./buttons";

type CardProps = {
  question: SessionQuestionsList;
  className?: string;
};

export function Card(props: CardProps) {
  const {
    id,
    session_id: session_id,
    question_text,
    status,
    type,
    answer1,
    answer1_advocate_name,
    answer2,
    answer2_advocate_name,
  } = props.question;

  return (
    <div className={clsx("m-4 flex", props.className)}>
      <div className="flex-auto">
        <div className="mb-4">
          <div className="text-lg">{question_text}</div>
          <div className="text-gray-600 italic">{SESSION_QUESTION_TYPE_I18N[type]}</div>
        </div>

        <div className="mb-4">
          Статус вопроса: <span className="italic">{SESSION_QUESTION_STATUS_I18N[status]}</span>
        </div>

        <div className="mb-4 ml-8">
          <div>
            Ответ 1: <span className="italic">{answer1}</span>
          </div>
          {answer1_advocate_name && <div className="ml-8 text-gray-600 italic">{answer1_advocate_name}</div>}
        </div>
        <div className="ml-8">
          <div>
            Ответ 2: <span className="italic">{answer2}</span>
          </div>
          {answer2_advocate_name && <div className="ml-8 text-gray-600 italic">{answer2_advocate_name}</div>}
        </div>
      </div>

      <div className="flex justify-end gap-3 flex-grow-0 flex-shrink-0 h-10">
        <VoteOnQuestion id={id} sessionId={session_id} />
        <UpdateQuestion id={id} sessionId={session_id} />
        <DeleteQuestion id={id} />
      </div>
    </div>
  );
}
