"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import {
  Person,
  SessionQuestion,
  VorHousesTable,
} from "@/app/lib/definitions2";
import {
  SESSION_QUESTION_STATUS_I18N,
  SESSION_QUESTION_TYPE_I18N,
} from "@/constants";
import { SESSIONS_ROUTE } from "@/routes";
import {
  updateQuestion,
  updateQuestionVoteLog,
} from "@/app/lib/questionActions";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import CommonSelect from "../common/common-select";
import { QUESTION_TYPE_LIST } from "./questionTypeList";
import { QUESTION_STATUS_LIST } from "./questionStatusList";
import { useState } from "react";
import { getDefaultVoteLog, voteList } from "./vorHouseList";
import clsx from "clsx";
import HiddenInput from "../common/hidden-input";
import { CountsVoteLog, VoteLog } from "@/app/lib/voteDefinitions";
import CheckButton from "../common/check-button";
import CountsVoteTable from "./counts-vote-table";

type FormProps = {
  question: SessionQuestion;
  vorHouses: VorHousesTable[];
};

export default function VoteOnQuestionForm({ question, vorHouses }: FormProps) {
  const initialState = { message: null, errors: {} };
  const updateQuestionVoteLognWithId = updateQuestionVoteLog.bind(
    null,
    question.id
  );
  const [state, dispatch] = useFormState(
    updateQuestionVoteLognWithId,
    initialState
  );
  const [countsVoteLog, setCountsVoteLog] = useState<CountsVoteLog>(
    question.vote_log === ""
      ? getDefaultVoteLog(vorHouses).counts
      : // TODO validate vote log
        JSON.parse(question.vote_log).counts
  );
  return (
    <form action={dispatch}>
      <HiddenInput
        name="vote_log"
        value={JSON.stringify({ counts: countsVoteLog })}
      />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <CountsVoteTable
          countsVoteLog={countsVoteLog}
          setCountsVoteLog={setCountsVoteLog}
          vorHouses={vorHouses}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={SESSIONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Сохранить вопрос</Button>
      </div>
    </form>
  );
}
