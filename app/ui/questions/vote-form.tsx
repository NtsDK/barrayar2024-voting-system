"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import { Person, SessionQuestion, SessionQuestionStatus, VorHousesTable } from "@/app/lib/definitions2";
import {
  COUNT_VOTE_REQUEST_I18N,
  COUNT_VOTE_STATUS_I18N,
  REQUEST_STATUS_I18N,
  SESSION_QUESTION_STATUS_I18N,
  SESSION_QUESTION_TYPE_I18N,
  VOTE_I18N,
} from "@/constants";
import { SESSIONS_ROUTE } from "@/routes";
import { updateQuestion, updateQuestionVoteLog } from "@/app/lib/questionActions";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import CommonSelect from "../common/common-select";
import { QUESTION_TYPE_LIST } from "./questionTypeList";
import { QUESTION_STATUS_LIST } from "./questionStatusList";
import { useEffect, useMemo, useState } from "react";
import { getDefaultCountsVoteLog, voteList } from "./vorHouseList";
import clsx from "clsx";
import HiddenInput from "../common/hidden-input";
import {
  AffiliatedCountVoteLogItem,
  CountVoteStatus,
  CountessQuestionRequestTable,
  CountsVoteLog,
  MeaningfulVote,
  PrecomputeVotesResult,
  SocCapitalExpenseRecord,
  UnaffiliatedCountVoteLogItem,
  VoteLog,
  VoteSummaryRow,
  socCapCostsSettingsDefault,
} from "@/app/lib/voteDefinitions";
import CountsVoteTable from "./counts-vote-table";
import precomputeVotes, { canPrecomputeVotes } from "@/app/lib/precomputeVotes";
import { VotingSummary } from "./voting-summary";
import { ChangesToApply } from "./changes-to-apply";
import { CountVoteLogCard } from "./count-vote-log-card";
import { DetailedVoteLog } from "./detailed-vote-log";
import { ErrorPanel } from "../common/error-panel";

type FormProps = {
  question: SessionQuestion;
  vorHouses: VorHousesTable[];
  countessQuestionRequests: CountessQuestionRequestTable[];
};

export default function VoteOnQuestionForm({ question, vorHouses, countessQuestionRequests }: FormProps) {
  // question.vote_log
  const initialState = { message: null, errors: {} };
  const updateQuestionVoteLognWithId = updateQuestionVoteLog.bind(null, question.id);
  const [state, dispatch] = useFormState(updateQuestionVoteLognWithId, initialState);
  const [countsVoteLog, setCountsVoteLog] = useState<CountsVoteLog>(
    question.vote_log.counts || getDefaultCountsVoteLog(vorHouses),
  );
  const canPrecomputeVotesFlag = useMemo(() => canPrecomputeVotes(countsVoteLog), [countsVoteLog]);

  const [precomputeState, setPrecomputeState] = useState<PrecomputeVotesResult | undefined>(
    question.vote_log.precomputeVotesResult,
  );

  const [masterVote, setMasterVote] = useState<MeaningfulVote>(precomputeState?.masterVote || "abstain");

  const votingEnabled = question.status === "raised";

  function onPrecomputeVotes() {
    setPrecomputeState(
      precomputeVotes(countsVoteLog, socCapCostsSettingsDefault, countessQuestionRequests, masterVote),
    );
  }

  precomputeState?.socCapitalExpenses;
  return (
    <form action={dispatch}>
      <HiddenInput
        name="vote_log"
        value={JSON.stringify({ counts: countsVoteLog, precomputeVotesResult: precomputeState } satisfies VoteLog)}
      />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <ErrorPanel errors={state.errors} />
        <div className="mb-8">
          <div className="mb-4">
            Вопрос: <span className="italic">{question.question_text}</span>
          </div>
          <div className="mb-4">
            Ответ 1: <span className="italic">{question.answer1}</span>
          </div>
          <div>
            Ответ 2: <span className="italic">{question.answer2}</span>
          </div>
        </div>
        <div className="mb-8">Статус вопроса: {SESSION_QUESTION_STATUS_I18N[question.status]}</div>
        <CountsVoteTable
          countsVoteLog={countsVoteLog}
          setCountsVoteLog={(countsVoteLog: CountsVoteLog) => {
            setCountsVoteLog(countsVoteLog);
            setPrecomputeState(undefined);
          }}
          vorHouses={vorHouses}
          votingEnabled={votingEnabled}
          className="mb-8"
        />
        <div className="mb-8">
          <div className="mb-8">Голоса графов распределены: {canPrecomputeVotesFlag ? "Да" : "Нет"}</div>
          <div className="mb-8">
            <div className="mb-4">Мастер голос</div>
            <div className="flex">
              {(["answer1", "answer2", "abstain"] as const).map((el) => (
                <Button
                  key={el}
                  type="button"
                  onClick={() => {
                    setMasterVote(el);
                    setPrecomputeState(undefined);
                  }}
                  className={clsx("mr-4", {
                    "opacity-50": masterVote !== el,
                  })}
                >
                  {COUNT_VOTE_REQUEST_I18N[el]}
                </Button>
              ))}
            </div>
          </div>
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
              className="mb-8"
            />
            <DetailedVoteLog precomputeState={precomputeState} />
          </>
        )}
        {/* <pre>{JSON.stringify(precomputeState?.affiliatedCountsVoteLog, null, "  ")}</pre> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={SESSIONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit" disabled={!votingEnabled} name="update_type" value="apply">
          Применить результаты голосования
        </Button>
        <Button type="submit" disabled={!votingEnabled} name="update_type" value="save">
          Сохранить вопрос
        </Button>
      </div>
    </form>
  );
}
