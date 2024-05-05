"use client";

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useFormState } from "react-dom";
import { CouncilVoting, Person, VorHouse } from "@/app/lib/definitions2";
// import { updateVorHouse } from "@/app/lib/vorHouseActions";
import { updateVoting } from "@/app/lib/votingActions";
import { COUNCIL_VOTING_STATUS_I18N } from "@/constants";
import { VORHOUSES_ROUTE } from "@/routes";
import { DATE_TIME_LIST } from "./dateTimeList";
import { STATUS_LIST } from "./statusList";

export default function EditVotingForm({ voting }: { voting: CouncilVoting }) {
  const initialState = { message: null, errors: {} };
  const updateVotingWithId = updateVoting.bind(null, voting.id);
  const [state, dispatch] = useFormState(updateVotingWithId, initialState);

  // console.log("vorHouse", vorHouse);
  // const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Person name */}
        {/* <div className="mb-4">
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
            </div>
          </div>
        </div> */}

        {/* Person comment */}
        {/* <div className="mb-4">
          <label htmlFor="comment" className="mb-2 block text-sm font-medium">
            Комментарий
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="comment"
                name="comment"
                type="text"
                defaultValue={vorHouse.comment}
                // step="0.01"
                // placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div> */}
        {/* Customer Name */}
        {/* <div className="mb-4">
          <label htmlFor="count" className="mb-2 block text-sm font-medium">
            Граф
          </label>
          <div className="relative">
            <select
              id="count"
              name="count_id"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={
                vorHouse.count_id != null ? vorHouse.count_id : ZERO_UUID
              }
            >
              <option value={ZERO_UUID}>Не выбрано</option>
              {persons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="countess" className="mb-2 block text-sm font-medium">
            Графиня
          </label>
          <div className="relative">
            <select
              id="countess"
              name="countess_id"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={
                vorHouse.countess_id != null ? vorHouse.countess_id : ZERO_UUID
              }
            >
              <option value={ZERO_UUID}>Не выбрано</option>
              {persons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div> */}

        <div className="mb-4">
          <label htmlFor="date_time" className="mb-2 block text-sm font-medium">
            Время голосования
          </label>
          <div className="relative">
            <select
              id="date_time"
              name="date_time"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={voting.date_time}
            >
              <option value="">Не выбрано</option>
              {DATE_TIME_LIST.map((dateTime) => (
                <optgroup key={dateTime.date} label={dateTime.date}>
                  {dateTime.time.map((time) => (
                    <option
                      key={dateTime.date + time}
                      value={`${dateTime.date} ${time}`}
                    >
                      {`${dateTime.date} ${time}`}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Состояние
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={voting.status}
            >
              {STATUS_LIST.map((status) => (
                <option key={status} value={status}>
                  {COUNCIL_VOTING_STATUS_I18N[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Invoice Amount */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div> */}

        {/* Invoice Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === "pending"}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === "paid"}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={VORHOUSES_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Изменить голосование</Button>
      </div>
    </form>
  );
}
