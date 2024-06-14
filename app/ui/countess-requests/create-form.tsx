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
import { COUNTESS_REQUESTS_ROUTE } from "@/routes";
import StringInput from "../common/string-input";
import { createCountessRequest } from "@/app/lib/countessRequestActions";
import {
  CouncilSession,
  MinimalVorHouse,
  SessionQuestion,
} from "@/app/lib/definitions2";
import ErrorMessage from "../error-message";
import CommonSelect from "../common/common-select";
import HiddenInput from "../common/hidden-input";
import { useState } from "react";
import {
  AffiliatedCount,
  CountessQuestionRequest,
  UnaffiliatedCount,
} from "@/app/lib/voteDefinitions";
import CheckButton from "../common/check-button";
import AffiliatedCountEditor from "./affiliated-count-editor";
import UnaffiliatedCountEditor from "./unaffiliated-count-editor";

interface FormProps {
  session: CouncilSession;
  vorHouses: MinimalVorHouse[];
  questions: SessionQuestion[];
}

export default function Form(props: FormProps) {
  const { session, vorHouses, questions } = props;
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCountessRequest, initialState);
  // console.log("state", state);
  const houseNameIndex = vorHouses.reduce(
    (acc: Record<string, string>, house) => {
      acc[house.id] = house.family_name;
      return acc;
    },
    {}
  );
  // const [questionRequest, setQuestionRequest] =
  //   useState<CountessQuestionRequest>({
  //     familyName: "",
  //     vorHouseId: "",
  //     affiliatedCounts: ["unaffiliated", "unaffiliated", "unaffiliated"],
  //     unaffiliatedCounts: ["unaffiliated", "unaffiliated"],
  //   });
  const [affiliatedCounts, setAffiliatedCounts] = useState<AffiliatedCount[]>([
    "unaffiliated",
    "unaffiliated",
    "unaffiliated",
  ]);
  const [unaffiliatedCounts, setUnaffiliatedCounts] = useState<
    UnaffiliatedCount[]
  >(["unaffiliated", "unaffiliated"]);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <ErrorMessage formState={state} />
        <HiddenInput name="session_id" value={session.id} />
        <HiddenInput name="question_requests" value={"{}"} />
        <CommonSelect
          id="house_id"
          label="Фор семья"
          defaultValue={vorHouses[0].id}
          valueList={vorHouses.map((house) => house.id)}
          i18n={houseNameIndex}
        />
        {questions.map((question, index) => (
          <div key={question.id} className="mb-20">
            <div className="mb-6">
              <div className="text-xl mb-6">
                Вопрос {index + 1}: {question.question_text}
              </div>
              <div className="mb-6">Ответ 1: {question.answer1}</div>
              <div className="mb-6">Ответ 2: {question.answer2}</div>
            </div>

            <div className="mb-6">
              <div className="mb-4">Свои графы</div>
              <AffiliatedCountEditor
                affiliatedCounts={affiliatedCounts}
                setAffiliatedCounts={setAffiliatedCounts}
              />
            </div>
            <div>
              <div className="mb-4">Свободные графы</div>
              <UnaffiliatedCountEditor
                unaffiliatedCounts={unaffiliatedCounts}
                setUnaffiliatedCounts={setUnaffiliatedCounts}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={COUNTESS_REQUESTS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать заявку</Button>
      </div>
    </form>
  );
}
