import { DATE_TIME_LIST } from "./dateTimeList";

type SessioDateTimeSelectProps = {
  id: string;
  defaultValue?: string;
  errors?: Record<string, string[] | undefined>;
};

export default function SessionDateTimeSelect({
  id,
  defaultValue,
  errors,
}: SessioDateTimeSelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        Время заседания
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={defaultValue}
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
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {errors?.[id] &&
          errors?.[id]?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
}
