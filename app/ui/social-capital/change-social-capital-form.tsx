"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import clsx from "clsx";
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import { Person, PersonWithVorHouseTable, VorHousesTable } from "@/app/lib/definitions2";
import { SOC_CAP_ROUTE } from "@/routes";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import { State, addVorHouseMember } from "@/app/lib/vorHouseMemberActions";
import { useState } from "react";
import CommonSocialCapitalForm from "../common/common-social-capital-form";
import { updateVorHouseSocialCapital2 } from "@/app/lib/vorHouseActions2";
import HiddenInput from "../common/hidden-input";
import { ErrorPanel } from "../common/error-panel";

const sources = ["Мастер", "Беатрис", "Маргарета", "ИВА", "ПВ"];

type SelectItem = {
  id: string;
  house_name: string;
  recipient_name: string;
};

export default function ChangeSocialCapitalForm({
  persons,
  vorHouses,
  className,
}: {
  persons: PersonWithVorHouseTable[];
  vorHouses: VorHousesTable[];
  className?: string;
}) {
  const initialState = { message: null, errors: {} } as State;
  const [state, dispatch] = useFormState(updateVorHouseSocialCapital2, initialState);
  const selectVorHouses: SelectItem[] = vorHouses.map((el) => ({
    id: JSON.stringify([el.id, el.id]),
    house_name: el.family_name,
    recipient_name: el.family_name,
  }));

  const filteredPersons = persons.filter((person) => person.house_id);

  const selectPersons: SelectItem[] = filteredPersons.map((el) => ({
    id: JSON.stringify([el.house_id, el.person_id]),
    house_name: el.house_name as string,
    recipient_name: el.person_name,
  }));

  const [compositeId, setCompositeId] = useState<string>(selectVorHouses[0].id);
  const house = vorHouses.find((el) => el.id === JSON.parse(compositeId)[0]);
  const baseNumber = house?.social_capital || 0;

  const item = [...selectVorHouses, ...selectPersons].find((el) => el.id === compositeId);

  const [amount, setAmount] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  function dispatchWrapper(payload: FormData) {
    setAmount("");
    setComment("");
    dispatch(payload);
  }
  return (
    <form action={dispatchWrapper} className={clsx("rounded-lg bg-gray-50 p-4", className)}>
      <ErrorPanel errors={state?.errors} />
      <HiddenInput name="id" value={JSON.parse(compositeId)[0]} />
      <HiddenInput name="social_capital" value={baseNumber} />
      <HiddenInput name="house_name" value={item?.house_name || ""} />
      <HiddenInput name="recipient_name" value={item?.recipient_name || ""} />
      <div className="mb-4 flex">
        <div className="mb-2 flex-grow-0 w-28">Кому?</div>
        <div>
          <select
            className="mb-2 peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mr-4"
            onChange={(ev) => setCompositeId(ev.target.value)}
          >
            <optgroup label="Форсемьи">
              {selectVorHouses.map((house) => (
                <option key={house.id} value={house.id}>
                  {house.house_name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Персонажи">
              {selectPersons.map((person) => (
                <option key={person.id} value={person.id}>
                  {`${person.recipient_name} - ${person.house_name}`}
                </option>
              ))}
            </optgroup>
          </select>
          <div className="text-gray-600 italic">{`Соц кап ${house?.family_name}: ${baseNumber}`}</div>
        </div>
      </div>

      <div className="mb-4 flex">
        <div className="mb-2 flex-grow-0 w-28">Источник</div>
        <select
          id="source"
          name="source"
          className="mb-2 peer block w-1/2 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mr-4"
        >
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex">
        <div className="mb-2 flex-grow-0 w-28">Сколько</div>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(ev) => setAmount(ev.target.value)}
          className="peer block w-20 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
        />
      </div>

      <div className="mb-4 flex">
        <div className="mb-2 flex-grow-0 w-28">Комент</div>
        <input
          id="comment"
          name="comment"
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
          className="mb-2 peer block w-1/2 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mr-4"
        />
      </div>

      <Button type="submit" disabled={comment.trim() === ""}>
        OK
      </Button>
    </form>
  );
}
