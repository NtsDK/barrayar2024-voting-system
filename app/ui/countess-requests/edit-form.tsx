"use client";

import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/common/button";
import { useFormState } from "react-dom";
import { MinimalVorHouse, Person, SessionQuestion } from "@/app/lib/definitions2";
import { updatePerson } from "@/app/lib/personActions";
import { COUNTESS_REQUESTS_ROUTE, PERSONS_ROUTE } from "@/routes";
import StringInput from "../common/string-input";
import {
  CountessQuestionRequest,
  CountessSessionRequestTable2,
  QuestionRequests,
  SocCapCostsSettings,
} from "@/app/lib/voteDefinitions";
import ErrorMessage from "../error-message";
import { updateCountessRequest } from "@/app/lib/countessRequestActions";
import HiddenInput from "../common/hidden-input";
import CommonSelect from "../common/common-select";
import CheckboxInput from "../common/checkbox-input";
import { useState } from "react";
import { countSocCapCountInfoList, defaultCountessQuestionRequest } from "./utils";
import CountSection from "./count-section";
import { assertQuestionRequests } from "@/app/lib/voteValidation";
import { SocCapMessages } from "./soc-cap-messages";

export default function EditCountessRequestForm({
  countessRequest,
  vorHouses,
  questions,
  socCapCostsSettings,
}: {
  countessRequest: CountessSessionRequestTable2;
  vorHouses: MinimalVorHouse[];
  questions: SessionQuestion[];
  socCapCostsSettings: SocCapCostsSettings;
}) {
  const initialState = { message: null, errors: {} };
  const updateCountessRequestWithId = updateCountessRequest.bind(null, countessRequest.id);
  const [state, dispatch] = useFormState(updateCountessRequestWithId, initialState);
  const vorHouses2: MinimalVorHouse[] = [
    {
      id: countessRequest.house_id,
      family_name: countessRequest.house_name,
      social_capital: countessRequest.house_social_capital,
    },
    ...vorHouses,
  ];
  // console.log("vorHouses2", vorHouses2);
  const houseNameIndex = vorHouses2.reduce((acc: Record<string, string>, house) => {
    acc[house.id] = house.family_name;
    return acc;
  }, {});

  const [countInfoList, setCountInfoList] = useState<CountessQuestionRequest[]>(
    questions.map((q) => countessRequest.question_requests[q.id] || defaultCountessQuestionRequest()),
  );

  function dispatchWrapper(payload: FormData) {
    // const house_id = payload.get("house_id") as string;
    // const { family_name } = vorHouses2.find(
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

  const [houseId, setHouseId] = useState(vorHouses2[0].id);

  const vorHouseSocCap = vorHouses2.find((el) => el.id === houseId)?.social_capital || 0;
  const requestSocCap = countSocCapCountInfoList(countInfoList, socCapCostsSettings);

  return (
    <form action={dispatchWrapper}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <ErrorMessage formState={state} />
        {/* <HiddenInput name="question_requests" value={"{}"} /> */}
        <HiddenInput name="timestamp" value={countessRequest.timestamp.toISOString()} />
        <CommonSelect
          id="house_id"
          label="Фор семья"
          // defaultValue={vorHouses2[0].id}
          value={houseId}
          onChange={(ev) => setHouseId(ev.target.value)}
          valueList={vorHouses2.map((house) => house.id)}
          i18n={houseNameIndex}
          className="mb-8"
        />
        <CheckboxInput
          id="should_update_timestamp"
          label="Нужно ли обновить время изменения заявки"
          defaultChecked={true}
          errors={state.errors}
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
          Изменить заявку
        </Button>
      </div>
    </form>
  );
}
