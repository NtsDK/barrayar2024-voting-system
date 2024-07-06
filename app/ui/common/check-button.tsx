"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function CheckButton({
  checked,
  onClick,
  votingEnabled,
}: {
  onClick: () => void;
  checked: boolean;
  votingEnabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="rounded-md border border-blue-900 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={!votingEnabled}
    >
      <CheckIcon
        className={clsx("w-5", {
          invisible: !checked,
        })}
      />
    </button>
  );
}
