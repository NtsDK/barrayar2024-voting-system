type StringInputProps = {
  id: string;
  label: string;
  defaultValue?: string | null;
  errors?: Record<string, string[] | undefined>;
};

export default function StringInput({
  label,
  id,
  defaultValue,
  errors,
}: StringInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={id}
            name={id}
            type="text"
            defaultValue={defaultValue !== null ? defaultValue : ""}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>
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
