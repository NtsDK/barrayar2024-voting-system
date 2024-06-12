"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface ErrorMessageProps {
  formState?: {
    message?: string | null | undefined;
    errors?: Record<string, string[]>;
  };
}

export default function ErrorMessage({ formState }: ErrorMessageProps) {
  if (!formState?.message) {
    return null;
  }
  return (
    <div
      className="flex h-8 items-end space-x-1"
      aria-live="polite"
      aria-atomic="true"
    >
      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
      <p className="text-sm text-red-500">{formState?.message}</p>
      {Object.entries(formState.errors ?? {}).map(([key, value]) => {
        return (
          <div key={key}>
            {key} {JSON.stringify(value)}
          </div>
        );
      })}
    </div>
  );
}
