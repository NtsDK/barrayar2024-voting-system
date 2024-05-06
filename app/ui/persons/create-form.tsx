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
import { createPerson } from "@/app/lib/personActions";
import { PERSONS_ROUTE } from "@/routes";
import StringInput from "../common/string-input";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPerson, initialState);
  // console.log("state", state);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <StringInput id="name" label="Имя персонажа" errors={state.errors} />
        <StringInput id="comment" label="Комментарий" errors={state.errors} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={PERSONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать персонажа</Button>
      </div>
    </form>
  );
}
