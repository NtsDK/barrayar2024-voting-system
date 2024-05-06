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
import { Person } from "@/app/lib/definitions2";
import { updatePerson } from "@/app/lib/personActions";
import { PERSONS_ROUTE } from "@/routes";
import StringInput from "../common/string-input";

export default function EditPersonForm({ person }: { person: Person }) {
  const initialState = { message: null, errors: {} };
  const updatePersonWithId = updatePerson.bind(null, person.id);
  const [state, dispatch] = useFormState(updatePersonWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <StringInput
          id="name"
          label="Имя персонажа"
          defaultValue={person.name}
          errors={state.errors}
        />
        <StringInput
          id="comment"
          label="Комментарий"
          defaultValue={person.comment}
          errors={state.errors}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={PERSONS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Изменить персонажа</Button>
      </div>
    </form>
  );
}
