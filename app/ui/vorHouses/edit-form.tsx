"use client";

import Link from "next/link";
import { Button } from "@/app/ui/common/button";
import { useFormState } from "react-dom";
import { Person, VorHouse } from "@/app/lib/definitions2";
import { updateVorHouse } from "@/app/lib/vorHouseActions";
import { VORHOUSES_ROUTE } from "@/routes";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";

export default function EditVorHouseForm({
  vorHouse,
  persons,
}: {
  vorHouse: VorHouse;
  persons: Person[];
}) {
  const initialState = { message: null, errors: {} };
  const updateVorHouseWithId = updateVorHouse.bind(null, vorHouse.id);
  const [state, dispatch] = useFormState(updateVorHouseWithId, initialState);

  // console.log("vorHouse", vorHouse);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <StringInput
          id="family_name"
          label="Фамилия"
          defaultValue={vorHouse.family_name}
          errors={state.errors}
        />

        <PersonSelect
          id="count_id"
          label="Граф"
          persons={persons}
          defaultValue={vorHouse.count_id}
        />

        <PersonSelect
          id="countess_id"
          label="Графиня"
          persons={persons}
          defaultValue={vorHouse.countess_id}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={VORHOUSES_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Изменить фор семью</Button>
      </div>
    </form>
  );
}
