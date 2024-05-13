import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { SessionQuestionsList } from "@/app/lib/definitions2";
import {
  SESSION_QUESTION_STATUS_I18N,
  SESSION_QUESTION_TYPE_I18N,
} from "@/constants";
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
    <div className={clsx("m-4", props.className)}>
      <div>{question_text}</div>
      <div className="flex justify-end gap-3">
        <VoteOnQuestion id={id} sessionId={session_id} />
        <UpdateQuestion id={id} sessionId={session_id} />
        <DeleteQuestion id={id} />
      </div>
      <div className="ml-8">{SESSION_QUESTION_TYPE_I18N[type]}</div>
      <div className="ml-8">{SESSION_QUESTION_STATUS_I18N[status]}</div>
      <div>{answer1}</div>
      <div className="ml-8">{answer1_advocate_name}</div>
      <div>{answer2}</div>
      <div className="ml-8">{answer2_advocate_name}</div>
    </div>
  );
}
