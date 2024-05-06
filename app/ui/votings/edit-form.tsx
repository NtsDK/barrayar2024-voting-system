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
import { CouncilVoting } from "@/app/lib/definitions2";
import { updateVoting } from "@/app/lib/votingActions";
import { COUNCIL_VOTING_STATUS_I18N } from "@/constants";
import { VORHOUSES_ROUTE } from "@/routes";
import { STATUS_LIST } from "./statusList";
import CommonSelect from "../common/common-select";
import VotingDateTimeSelect from "./voting-date-time-select";
import StringInput from "../common/string-input";

export default function EditVotingForm({ voting }: { voting: CouncilVoting }) {
  const initialState = { message: null, errors: {} };
  const updateVotingWithId = updateVoting.bind(null, voting.id);
  const [state, dispatch] = useFormState(updateVotingWithId, initialState);

  // console.log("vorHouse", vorHouse);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <StringInput
          id="title"
          label="Название"
          defaultValue={voting.title}
          errors={state.errors}
        />

        <VotingDateTimeSelect
          id="date_time"
          defaultValue={voting.date_time}
          errors={state.errors}
        />

        <CommonSelect
          id="status"
          label="Состояние"
          defaultValue={voting.status}
          valueList={STATUS_LIST}
          i18n={COUNCIL_VOTING_STATUS_I18N}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={VORHOUSES_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Изменить голосование</Button>
      </div>
    </form>
  );
}
