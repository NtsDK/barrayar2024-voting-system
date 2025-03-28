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
import { COUNCIL_SESSION_STATUS_I18N } from "@/constants";
import { SESSIONS_ROUTE } from "@/routes";
import { createSession } from "@/app/lib/sessionActions";
import { STATUS_LIST } from "./statusList";
import CommonSelect from "../common/common-select";
import SessionDateTimeSelect from "./session-date-time-select";
import StringInput from "../common/string-input";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSession, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <StringInput id="title" label="Название" errors={state.errors} />

        <SessionDateTimeSelect id="date_time" errors={state.errors} />

        <CommonSelect
          id="status"
          label="Состояние"
          defaultValue="planned"
          valueList={STATUS_LIST}
          i18n={COUNCIL_SESSION_STATUS_I18N}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={SESSIONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать заседание</Button>
      </div>
    </form>
  );
}
