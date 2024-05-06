import { Person } from "@/app/lib/definitions2";
import { ZERO_UUID } from "@/constants";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

type PersonSelectProps = {
  persons: Person[];
  label: string;
  id: string;
  defaultValue?: string | null;
};

export default function PersonSelect({
  persons,
  label,
  id,
  defaultValue,
}: PersonSelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={defaultValue != null ? defaultValue : ZERO_UUID}
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
  );
}
