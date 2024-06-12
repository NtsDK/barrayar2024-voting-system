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
import { VoteLog } from "@/app/lib/voteDefinitions";

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
  const [voteLog, setVoteLog] = useState<VoteLog>(
    question.vote_log === ""
      ? getDefaultVoteLog(vorHouses)
      : JSON.parse(question.vote_log)
  );
  return (
    <form action={dispatch}>
      <HiddenInput name="vote_log" value={JSON.stringify(voteLog)} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Фамилия
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Ответ 1
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Ответ 2
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Воздержался
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Отсутствует
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {vorHouses?.map((vorHouse) => (
              <tr
                key={vorHouse.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {vorHouse.family_name}
                </td>
                {voteList.map((vote) => (
                  <td
                    key={`${vorHouse.id}_${vote}`}
                    className="whitespace-nowrap px-3 py-3"
                  >
                    <CheckButton
                      checked={voteLog.counts[vorHouse.id].vote === vote}
                      onClick={() =>
                        setVoteLog({
                          ...voteLog,
                          counts: {
                            ...voteLog.counts,
                            [vorHouse.id]: {
                              vote,
                              familyName: vorHouse.family_name,
                            },
                          },
                        })
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                Всего{" "}
                {vorHouses.length -
                  Object.values(voteLog.counts).filter(
                    (el) => el.vote === "notFilled"
                  ).length}
              </td>
              {voteList.map((vote) => (
                <td key={vote} className="whitespace-nowrap px-3 py-3">
                  {
                    Object.values(voteLog.counts).filter(
                      (el) => el.vote === vote
                    ).length
                  }
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={SESSIONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Изменить вопрос</Button>
      </div>
    </form>
  );
}

function CheckButton({
  checked,
  onClick,
}: {
  onClick: () => void;
  checked: boolean;
}) {
  return (
    <button
      type="button"
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <CheckIcon
        className={clsx("w-5", {
          invisible: !checked,
        })}
      />
    </button>
  );
}
