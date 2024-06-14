"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function CheckButton({
  checked,
  onClick,
}: {
  onClick: () => void;
  checked: boolean;
}) {
  return (
    <button
      type="button"
      className="rounded-md border border-blue-900 p-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <CheckIcon
        className={clsx("w-5", {
          invisible: !checked,
        })}
      />
    </button>
  );
}
