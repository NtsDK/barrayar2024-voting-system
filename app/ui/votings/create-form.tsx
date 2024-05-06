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
import { COUNCIL_VOTING_STATUS_I18N } from "@/constants";
import { VOTINGS_ROUTE } from "@/routes";
import { createVoting } from "@/app/lib/votingActions";
import { STATUS_LIST } from "./statusList";
import CommonSelect from "../common/common-select";
import VotingDateTimeSelect from "./voting-date-time-select";
import StringInput from "../common/string-input";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createVoting, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <StringInput id="title" label="Название" errors={state.errors} />

        <VotingDateTimeSelect id="date_time" errors={state.errors} />

        <CommonSelect
          id="status"
          label="Состояние"
          defaultValue="planned"
          valueList={STATUS_LIST}
          i18n={COUNCIL_VOTING_STATUS_I18N}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={VOTINGS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать голосование</Button>
      </div>
    </form>
  );
}
