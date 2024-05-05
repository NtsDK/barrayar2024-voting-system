import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { VotingQuestionsList } from "@/app/lib/definitions2";
import {
  VOTING_QUESTION_STATUS_I18N,
  VOTING_QUESTION_TYPE_I18N,
} from "@/constants";
import clsx from "clsx";

type CardProps = {
  question: VotingQuestionsList;
  className?: string;
};

export function Card(props: CardProps) {
  const {
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
      <div className="ml-8">{VOTING_QUESTION_TYPE_I18N[type]}</div>
      <div className="ml-8">{VOTING_QUESTION_STATUS_I18N[status]}</div>
      <div>{answer1}</div>
      <div className="ml-8">{answer1_advocate_name}</div>
      <div>{answer2}</div>
      <div className="ml-8">{answer2_advocate_name}</div>
    </div>
  );
}
