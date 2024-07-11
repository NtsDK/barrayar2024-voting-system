"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function CheckButton({
  checked,
  onClick,
  disabled,
}: {
  onClick: () => void;
  checked: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="rounded-md border border-blue-900 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      <CheckIcon
        className={clsx("w-5", {
          invisible: !checked,
        })}
      />
    </button>
  );
}
