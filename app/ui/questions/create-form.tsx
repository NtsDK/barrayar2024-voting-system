"use client";

import { useFormState } from "react-dom";
import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import { Person } from "@/app/lib/definitions2";
import { COUNCIL_VOTING_STATUS_I18N } from "@/constants";
import { VOTINGS_ROUTE } from "@/routes";
import { createQuestion } from "@/app/lib/questionActions";
import PersonSelect from "../common/person-select";
// import { DATE_TIME_LIST } from "./dateTimeList";
// import { STATUS_LIST } from "./statusList";

type FormProps = {
  votingId: string;
  persons: Person[];
};

export default function Form({ votingId, persons }: FormProps) {
  const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(createInvoice, initialState);
  const [state, dispatch] = useFormState(createQuestion, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          {/* <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date_time &&
              state.errors.date_time.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* type GroupButton */}

        {/* Person name */}
        <div className="mb-4">
          <label
            htmlFor="question_text"
            className="mb-2 block text-sm font-medium"
          >
            Вопрос
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="question_text"
                name="question_text"
                type="text"
                // step="0.01"
                // placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="answer1" className="mb-2 block text-sm font-medium">
            Ответ 1
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="answer1"
                name="answer1"
                type="text"
                // step="0.01"
                // placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <PersonSelect
          id="answer1_advocate_id"
          label="Адвокат ответа 1"
          persons={persons}
        />

        <div className="mb-4">
          <label htmlFor="answer2" className="mb-2 block text-sm font-medium">
            Ответ 2
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="answer2"
                name="answer2"
                type="text"
                // step="0.01"
                // placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <PersonSelect
          id="answer2_advocate_id"
          label="Адвокат ответа 2"
          persons={persons}
        />

        {/* status select */}

        {/* vote_log - input hidden */}

        {/* <div className="mb-4">
          <label htmlFor="date_time" className="mb-2 block text-sm font-medium">
            Время голосования
          </label>
          <div className="relative">
            <select
              id="date_time"
              name="date_time"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
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
              defaultValue={"planned"}
            >
              {STATUS_LIST.map((status) => (
                <option key={status} value={status}>
                  {COUNCIL_VOTING_STATUS_I18N[status]}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* Person comment */}

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
          href={VOTINGS_ROUTE}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать вопрос</Button>
      </div>
    </form>
  );
}
