import clsx from "clsx";

type StringInputProps = {
  id: string;
  label: string;
  defaultChecked?: boolean | null;
  errors?: Record<string, string[] | undefined>;
  className?: string;
};

export default function CheckboxInput({
  label,
  id,
  defaultChecked,
  errors,
  className,
}: StringInputProps) {
  return (
    <div className={clsx("mb-4", className)}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={id}
            name={id}
            type="checkbox"
            defaultChecked={defaultChecked !== null ? defaultChecked : false}
            className="peer block w-24 h-8 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
