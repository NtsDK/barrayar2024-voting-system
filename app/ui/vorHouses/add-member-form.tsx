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
import { Person, PersonWithVorHouseTable } from "@/app/lib/definitions2";
import { VORHOUSES_ROUTE } from "@/routes";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import { State, addVorHouseMember } from "@/app/lib/vorHouseMemberActions";
import HiddenInput from "../common/hidden-input";

export default function AddMemberForm({
  persons,
  house_id,
}: {
  persons: PersonWithVorHouseTable[];
  house_id: string;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState<State, FormData>(
    addVorHouseMember,
    initialState
  );
  return (
    <form action={dispatch} className="flex">
      <HiddenInput name="house_id" value={house_id} />
      <select
        id="person_id"
        name="person_id"
        className="peer block w-1/2 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mr-4"
      >
        {persons.map((person) => (
          <option key={person.person_id} value={person.person_id}>
            {person.house_name
              ? `${person.person_name} - ${person.house_name}`
              : person.person_name}
          </option>
        ))}
      </select>
      <Button type="submit">Добавить члена семьи</Button>
    </form>
  );
}
