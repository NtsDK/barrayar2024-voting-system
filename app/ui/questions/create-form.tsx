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
import { Person } from "@/app/lib/definitions2";
import {
  SESSION_QUESTION_STATUS_I18N,
  SESSION_QUESTION_TYPE_I18N,
} from "@/constants";
import { SESSIONS_ROUTE } from "@/routes";
import { createQuestion } from "@/app/lib/questionActions";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import CommonSelect from "../common/common-select";
import { QUESTION_TYPE_LIST } from "./questionTypeList";
import { QUESTION_STATUS_LIST } from "./questionStatusList";
import HiddenInput from "../common/hidden-input";

type FormProps = {
  sessionId: string;
  persons: Person[];
};

export default function Form({ sessionId, persons }: FormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createQuestion, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <HiddenInput name="session_id" value={sessionId} />

        <CommonSelect
          id="type"
          label="Тип вопроса"
          defaultValue="master"
          valueList={QUESTION_TYPE_LIST}
          i18n={SESSION_QUESTION_TYPE_I18N}
        />

        <StringInput id="question_text" label="Вопрос" errors={state.errors} />

        <StringInput id="answer1" label="Ответ 1" errors={state.errors} />

        <PersonSelect
          id="answer1_advocate_id"
          label="Адвокат ответа 1"
          persons={persons}
        />

        <StringInput id="answer2" label="Ответ 2" errors={state.errors} />

        <PersonSelect
          id="answer2_advocate_id"
          label="Адвокат ответа 2"
          persons={persons}
        />

        <CommonSelect
          id="status"
          label="Статус"
          defaultValue="raised"
          valueList={QUESTION_STATUS_LIST}
          i18n={SESSION_QUESTION_STATUS_I18N}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={SESSIONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать вопрос</Button>
      </div>
    </form>
  );
}
