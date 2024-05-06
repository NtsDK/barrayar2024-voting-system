type CommonSelectProps = {
  id: string;
  label: string;
  defaultValue?: string | null;
  errors?: Record<string, string[] | undefined>;
  valueList: string[];
  i18n?: Record<string, string>;
};

export default function CommonSelect({
  label,
  id,
  defaultValue,
  valueList,
  i18n,
}: CommonSelectProps) {
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
          defaultValue={defaultValue !== null ? defaultValue : ""}
        >
          {valueList.map((status) => (
            <option key={status} value={status}>
              {i18n ? i18n[status] : status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
