"use client";

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/common/button";
import { useFormState } from "react-dom";
import {
  MinimalVorHouse,
  Person,
  SessionQuestion,
} from "@/app/lib/definitions2";
import { updatePerson } from "@/app/lib/personActions";
import { COUNTESS_REQUESTS_ROUTE, PERSONS_ROUTE } from "@/routes";
import StringInput from "../common/string-input";
import {
  CountessQuestionRequest,
  CountessSessionRequestTable2,
  QuestionRequests,
} from "@/app/lib/voteDefinitions";
import ErrorMessage from "../error-message";
import { updateCountessRequest } from "@/app/lib/countessRequestActions";
import HiddenInput from "../common/hidden-input";
import CommonSelect from "../common/common-select";
import CheckboxInput from "../common/checkbox-input";
import { useState } from "react";
import { defaultCountessQuestionRequest } from "./utils";
import CountSection from "./count-section";
import { assertQuestionRequests } from "@/app/lib/voteValidation";

export default function EditCountessRequestForm({
  countessRequest,
  vorHouses,
  questions,
}: {
  countessRequest: CountessSessionRequestTable2;
  vorHouses: MinimalVorHouse[];
  questions: SessionQuestion[];
}) {
  const initialState = { message: null, errors: {} };
  const updateCountessRequestWithId = updateCountessRequest.bind(
    null,
    countessRequest.id
  );
  const [state, dispatch] = useFormState(
    updateCountessRequestWithId,
    initialState
  );
  const vorHouses2: MinimalVorHouse[] = [
    { id: countessRequest.house_id, family_name: countessRequest.house_name },
    ...vorHouses,
  ];
  const houseNameIndex = vorHouses2.reduce(
    (acc: Record<string, string>, house) => {
      acc[house.id] = house.family_name;
      return acc;
    },
    {}
  );

  const [countInfoList, setCountInfoList] = useState<CountessQuestionRequest[]>(
    questions.map(
      (q) =>
        countessRequest.question_requests[q.id] ||
        defaultCountessQuestionRequest()
    )
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

    payload.append(
      "question_requests",
      JSON.stringify(question_requests, null, "  ")
    );

    dispatch(payload);
  }

  return (
    <form action={dispatchWrapper}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <ErrorMessage formState={state} />
        {/* <HiddenInput name="question_requests" value={"{}"} /> */}
        <HiddenInput
          name="timestamp"
          value={countessRequest.timestamp.toISOString()}
        />
        <CommonSelect
          id="house_id"
          label="Фор семья"
          defaultValue={vorHouses2[0].id}
          valueList={vorHouses2.map((house) => house.id)}
          i18n={houseNameIndex}
        />
        <CheckboxInput
          id="should_update_timestamp"
          label="Нужно ли обновить время изменения заявки"
          defaultChecked={true}
          errors={state.errors}
        />
        <CountSection
          questions={questions}
          countInfoList={countInfoList}
          setCountInfoList={setCountInfoList}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={COUNTESS_REQUESTS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Изменить заявку</Button>
      </div>
    </form>
  );
}
