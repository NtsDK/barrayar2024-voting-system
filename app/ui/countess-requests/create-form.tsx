"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import { COUNTESS_REQUESTS_ROUTE } from "@/routes";
import StringInput from "../common/string-input";
import { createCountessRequest } from "@/app/lib/countessRequestActions";
import { CouncilSession, MinimalVorHouse, SessionQuestion } from "@/app/lib/definitions2";
import ErrorMessage from "../error-message";
import CommonSelect from "../common/common-select";
import HiddenInput from "../common/hidden-input";
import { useState } from "react";
import {
  AffiliatedCount,
  CountessQuestionRequest,
  QuestionRequests,
  SocCapCostsSettings,
  UnaffiliatedCount,
} from "@/app/lib/voteDefinitions";
import { countSocCapCountInfoList, defaultCountessQuestionRequest } from "./utils";
import { assertQuestionRequests, validateQuestionRequests } from "@/app/lib/voteValidation";
import CountSection from "./count-section";
import { SocCapMessages } from "./soc-cap-messages";

interface FormProps {
  session: CouncilSession;
  vorHouses: MinimalVorHouse[];
  questions: SessionQuestion[];
  socCapCostsSettings: SocCapCostsSettings;
}

export default function Form(props: FormProps) {
  const { session, vorHouses, questions, socCapCostsSettings } = props;
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCountessRequest, initialState);
  // console.log("state", state);
  const houseNameIndex = vorHouses.reduce((acc: Record<string, string>, house) => {
    acc[house.id] = house.family_name;
    return acc;
  }, {});

  const [countInfoList, setCountInfoList] = useState<CountessQuestionRequest[]>(
    questions.map(() => defaultCountessQuestionRequest()),
  );

  function dispatchWrapper(payload: FormData) {
    // const house_id = payload.get("house_id") as string;
    // const { family_name } = vorHouses.find(
    //   (el) => el.id === house_id
    // ) as MinimalVorHouse;
    // console.log("payload", );
    const question_requests: QuestionRequests = {};
    questions.forEach((question, index) => {
      question_requests[question.id] = {
        // vorHouseId: house_id,
        // familyName: family_name,
        affiliatedCounts: countInfoList[index].affiliatedCounts,
        unaffiliatedCounts: countInfoList[index].unaffiliatedCounts,
      };
    });
    // формально проверка лишняя
    assertQuestionRequests(question_requests);

    payload.append("question_requests", JSON.stringify(question_requests, null, "  "));

    dispatch(payload);
  }

  const [houseId, setHouseId] = useState(vorHouses[0].id);

  const vorHouseSocCap = vorHouses.find((el) => el.id === houseId)?.social_capital || 0;
  const requestSocCap = countSocCapCountInfoList(countInfoList, socCapCostsSettings);

  return (
    <form action={dispatchWrapper}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <ErrorMessage formState={state} />
        <HiddenInput name="session_id" value={session.id} />
        {/* <HiddenInput name="question_requests" value={"{}"} /> */}
        <CommonSelect
          id="house_id"
          label="Фор семья"
          // defaultValue={vorHouses[0].id}
          value={houseId}
          onChange={(ev) => setHouseId(ev.target.value)}
          valueList={vorHouses.map((house) => house.id)}
          i18n={houseNameIndex}
          className="mb-8"
        />
        <CountSection
          questions={questions}
          countInfoList={countInfoList}
          setCountInfoList={setCountInfoList}
          socCapCostsSettings={socCapCostsSettings}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <SocCapMessages requestSocCap={requestSocCap} vorHouseSocCap={vorHouseSocCap} />
        <Link
          href={COUNTESS_REQUESTS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit" disabled={vorHouseSocCap < requestSocCap}>
          Создать заявку
        </Button>
      </div>
    </form>
  );
}
