import { cn } from "@/lib/cn";
import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  className,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;
  const hintId = hint && fieldId ? `${fieldId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-stone-800">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "min-h-11 w-full rounded-md border bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700",
          error ? "border-red-600" : "border-stone-300",
          className,
        )}
        {...props}
      />
      {hint && !error ? (
        <p id={hintId} className="text-xs text-stone-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
