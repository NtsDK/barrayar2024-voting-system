"use client";

import Link from "next/link";
import { Button } from "@/app/ui/common/button";
import { useFormState } from "react-dom";
import { Person, VorHouse } from "@/app/lib/definitions2";
import { updateVorHouse } from "@/app/lib/vorHouseActions";
import { VORHOUSES_ROUTE } from "@/routes";
import PersonSelect from "../common/person-select";

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
        {/* Person name */}
        <div className="mb-4">
          <label
            htmlFor="family_name"
            className="mb-2 block text-sm font-medium"
          >
            Фамилия
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="family_name"
                name="family_name"
                type="text"
                defaultValue={vorHouse.family_name}
                // step="0.01"
                // placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>

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
