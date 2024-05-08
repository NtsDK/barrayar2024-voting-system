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
import { createVorHouse } from "@/app/lib/vorHouseActions";
import { Person } from "@/app/lib/definitions2";
import { VORHOUSES_ROUTE } from "@/routes";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";

export default function Form({ persons }: { persons: Person[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createVorHouse, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <StringInput id="family_name" label="Фамилия" errors={state.errors} />

        <PersonSelect id="count_id" label="Граф" persons={persons} />

        <PersonSelect id="countess_id" label="Графиня" persons={persons} />

        <StringInput
          id="social_capital"
          label="Социальный капитал"
          errors={state.errors}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={VORHOUSES_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать форсемью</Button>
      </div>
    </form>
  );
}
