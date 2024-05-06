"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import { Person, VotingQuestion } from "@/app/lib/definitions2";
import {
  VOTING_QUESTION_STATUS_I18N,
  VOTING_QUESTION_TYPE_I18N,
} from "@/constants";
import { VOTINGS_ROUTE } from "@/routes";
import { updateQuestion } from "@/app/lib/questionActions";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import CommonSelect from "../common/common-select";
import { QUESTION_TYPE_LIST } from "./questionTypeList";
import { QUESTION_STATUS_LIST } from "./questionStatusList";

type FormProps = {
  question: VotingQuestion;
  persons: Person[];
};

export default function EditQuestionForm({ persons, question }: FormProps) {
  const initialState = { message: null, errors: {} };
  const updateQuestionWithId = updateQuestion.bind(null, question.id);
  const [state, dispatch] = useFormState(updateQuestionWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input
          type="hidden"
          id="voting_id"
          name="voting_id"
          value={question.voting_id}
        />
        <input
          type="hidden"
          id="vote_log"
          name="vote_log"
          value={question.vote_log}
        />

        <CommonSelect
          id="type"
          label="Тип вопроса"
          defaultValue={question.type}
          valueList={QUESTION_TYPE_LIST}
          i18n={VOTING_QUESTION_TYPE_I18N}
        />

        <StringInput
          id="question_text"
          label="Вопрос"
          defaultValue={question.question_text}
          errors={state.errors}
        />

        <StringInput
          id="answer1"
          label="Ответ 1"
          defaultValue={question.answer1}
          errors={state.errors}
        />

        <PersonSelect
          id="answer1_advocate_id"
          label="Адвокат ответа 1"
          defaultValue={question.answer1_advocate_id}
          persons={persons}
        />

        <StringInput
          id="answer2"
          label="Ответ 2"
          defaultValue={question.answer2}
          errors={state.errors}
        />

        <PersonSelect
          id="answer2_advocate_id"
          label="Адвокат ответа 2"
          defaultValue={question.answer2_advocate_id}
          persons={persons}
        />

        <CommonSelect
          id="status"
          label="Статус"
          defaultValue={question.status}
          valueList={QUESTION_STATUS_LIST}
          i18n={VOTING_QUESTION_STATUS_I18N}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={VOTINGS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Изменить вопрос</Button>
      </div>
    </form>
  );
}
