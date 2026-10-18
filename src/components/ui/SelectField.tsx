import { cn } from "@/lib/cn";
import type { SelectHTMLAttributes } from "react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
};

export function SelectField({
  id,
  label,
  error,
  options,
  placeholder,
  className,
  ...props
}: SelectFieldProps) {
  const fieldId = id ?? props.name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-stone-800">
        {label}
      </label>
      <select
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          "min-h-11 w-full rounded-md border bg-white px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700",
          error ? "border-red-600" : "border-stone-300",
          className,
        )}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
