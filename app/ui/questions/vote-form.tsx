"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import { Person, SessionQuestion, SessionQuestionStatus, VorHousesTable } from "@/app/lib/definitions2";
import { COUNT_VOTE_STATUS_I18N, SESSION_QUESTION_STATUS_I18N, SESSION_QUESTION_TYPE_I18N } from "@/constants";
import { SESSIONS_ROUTE } from "@/routes";
import { updateQuestion, updateQuestionVoteLog } from "@/app/lib/questionActions";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import CommonSelect from "../common/common-select";
import { QUESTION_TYPE_LIST } from "./questionTypeList";
import { QUESTION_STATUS_LIST } from "./questionStatusList";
import { useEffect, useMemo, useState } from "react";
import { getDefaultVoteLog, voteList } from "./vorHouseList";
import clsx from "clsx";
import HiddenInput from "../common/hidden-input";
import {
  CountVoteStatus,
  CountessQuestionRequestTable,
  CountsVoteLog,
  MeaningfulVote,
  PrecomputeVotesResult,
  SocCapitalExpenseRecord,
  VoteLog,
  VoteSummaryRow,
  socCapitalValues,
} from "@/app/lib/voteDefinitions";
import CheckButton from "../common/check-button";
import CountsVoteTable from "./counts-vote-table";
import precomputeVotes, { canPrecomputeVotes } from "@/app/lib/precomputeVotes";
import { VotingSummary } from "./voting-summary";
import { ChangesToApply } from "./changes-to-apply";

type FormProps = {
  question: SessionQuestion;
  vorHouses: VorHousesTable[];
  countessQuestionRequests: CountessQuestionRequestTable[];
};

export default function VoteOnQuestionForm({ question, vorHouses, countessQuestionRequests }: FormProps) {
  const initialState = { message: null, errors: {} };
  const updateQuestionVoteLognWithId = updateQuestionVoteLog.bind(null, question.id);
  const [state, dispatch] = useFormState(updateQuestionVoteLognWithId, initialState);
  const [countsVoteLog, setCountsVoteLog] = useState<CountsVoteLog>(
    question.vote_log === ""
      ? getDefaultVoteLog(vorHouses).counts
      : // TODO validate vote log
        JSON.parse(question.vote_log).counts,
  );
  const canPrecomputeVotesFlag = useMemo(() => canPrecomputeVotes(countsVoteLog), [countsVoteLog]);

  const [precomputeState, setPrecomputeState] = useState<PrecomputeVotesResult>();

  useEffect(() => {
    setPrecomputeState(undefined);
  }, [countsVoteLog]);

  const [masterVote, setMasterVote] = useState<MeaningfulVote>("abstain");

  const votingEnabled = question.status === "raised";

  function onPrecomputeVotes() {
    setPrecomputeState(precomputeVotes(countsVoteLog, socCapitalValues, countessQuestionRequests, masterVote));
  }

  precomputeState?.socCapitalExpenses;
  return (
    <form action={dispatch}>
      <HiddenInput name="vote_log" value={JSON.stringify({ counts: countsVoteLog })} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-8">Статус вопроса: {SESSION_QUESTION_STATUS_I18N[question.status]}</div>
        <CountsVoteTable
          countsVoteLog={countsVoteLog}
          setCountsVoteLog={setCountsVoteLog}
          vorHouses={vorHouses}
          votingEnabled={votingEnabled}
          className="mb-8"
        />
        <div className="mb-8">
          <div>Голоса графов распределены: {canPrecomputeVotesFlag ? "Да" : "Нет"}</div>
          <Button type="button" disabled={!(votingEnabled && canPrecomputeVotesFlag)} onClick={onPrecomputeVotes}>
            Подсчитать голосование графинь
          </Button>
        </div>
        {precomputeState && (
          <>
            <VotingSummary summary={precomputeState.summary} className="mb-8" />
            <ChangesToApply
              questionStatus={precomputeState.questionStatus}
              socCapitalExpenses={precomputeState.socCapitalExpenses}
            />
          </>
        )}
        {/* <pre>{JSON.stringify(precomputeState, null, "  ")}</pre> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={SESSIONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit" disabled={!votingEnabled}>
          Сохранить вопрос
        </Button>
      </div>
    </form>
  );
}
