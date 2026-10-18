"use client";

import { cn } from "@/lib/cn";
import { MOOD_LABELS } from "@/lib/check-in-preview";
import { MOOD_VALUES, type MoodValue } from "@/types/check-in";

type Props = {
  value?: MoodValue;
  onChange: (value: MoodValue) => void;
  disabled?: boolean;
  error?: string;
};

export function MoodPicker({ value, onChange, disabled, error }: Props) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-stone-800">
        Tâm trạng hôm nay
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {MOOD_VALUES.map((mood) => {
          const selected = value === mood;
          return (
            <label
              key={mood}
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
                name="mood"
                value={mood}
                checked={selected}
                disabled={disabled}
                onChange={() => onChange(mood)}
                className="sr-only"
              />
              {MOOD_LABELS[mood]}
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
