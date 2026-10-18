"use client";

import { cn } from "@/lib/cn";
import { STRESS_LABELS } from "@/lib/check-in-preview";
import { STRESS_LEVELS, type StressLevel } from "@/types/check-in";

type Props = {
  value?: StressLevel;
  onChange: (value: StressLevel) => void;
  disabled?: boolean;
  error?: string;
};

export function StressPicker({ value, onChange, disabled, error }: Props) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-stone-800">
        Mức stress hôm nay
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {STRESS_LEVELS.map((level) => {
          const selected = value === level;
          return (
            <label
              key={level}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-700",
                selected
                  ? "border-teal-800 bg-teal-50 text-teal-900"
                  : "border-stone-300 bg-white text-stone-800 hover:border-teal-700",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              <input
                type="radio"
                name="stress_level"
                value={level}
                checked={selected}
                disabled={disabled}
                onChange={() => onChange(level)}
                className="sr-only"
              />
              {STRESS_LABELS[level]}
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
