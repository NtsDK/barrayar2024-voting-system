"use client";

import {
  updateVorHouseSocialCapital,
  updateVorHouse,
  State,
} from "@/app/lib/vorHouseActions";
import { useState } from "react";
import { useFormState } from "react-dom";

type SocialCapitalFormProps = {
  id: string;
  baseNumber: number;
};

export default function SocialCapitalForm({
  id,
  baseNumber,
}: SocialCapitalFormProps) {
  const initialState = { message: null, errors: {} };
  const updateVorHouseSocialCapitalWithId = updateVorHouseSocialCapital.bind(
    null,
    id
  );
  const [value, setValue] = useState("");
  const [state, dispatch] = useFormState<State, FormData>(async function (
    state: State,
    payload: FormData
  ): Promise<State> {
    const res = await updateVorHouseSocialCapitalWithId(state, payload);
    setValue("");
    return res;
  }, initialState);

  return (
    <form
      action={(payload: FormData) => {
        dispatch(payload);
      }}
      className="flex"
    >
      <input
        type="hidden"
        id="social_capital"
        name="social_capital"
        value={(() => {
          try {
            return baseNumber + Number(value);
          } catch {}
          return baseNumber;
        })()}
      />

      <input
        type="number"
        onChange={(ev) => {
          try {
            setValue(ev.target.value);
          } catch {}
        }}
        value={value}
        className="ml-4 peer block w-20 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
      />
      <button className="rounded-md border p-2 hover:bg-gray-100 ml-4">
        OK
      </button>
    </form>
  );
}
