import clsx from "clsx";
import { SelectHTMLAttributes } from "react";

interface CommonSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  // defaultValue?: string | null;
  // value?:
  // errors?: Record<string, string[] | undefined>;
  valueList: string[];
  i18n?: Record<string, string>;
  className?: string;
}

export default function CommonSelect({ label, valueList, i18n, className, id, ...rest }: CommonSelectProps) {
  return (
    <div className={clsx("mb-4", className)}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          {...rest}
          // defaultValue={defaultValue !== null ? defaultValue : ""}
        >
          {valueList.map((value) => (
            <option key={value} value={value}>
              {i18n ? i18n[value] : value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
