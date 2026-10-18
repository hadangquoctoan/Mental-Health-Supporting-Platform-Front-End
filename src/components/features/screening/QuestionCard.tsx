"use client";

import type { ScreeningQuestion } from "@/types/screening";
import { cn } from "@/lib/cn";

const SCALE_OPTIONS = [0, 1, 2, 3];

type Props = {
  question: ScreeningQuestion;
  selected: number | string | boolean | undefined;
  onSelect: (value: number | string | boolean) => void;
};

export function QuestionCard({ question, selected, onSelect }: Props) {
  if (question.question_type === "SCALE") {
    const options = question.question_text.includes("PSS") ? [0, 1, 2, 3, 4] : SCALE_OPTIONS;
    return (
      <fieldset className="rounded-md border border-stone-200 bg-white p-4">
        <legend className="px-1 text-sm font-medium text-stone-900">
          Câu {question.question_number}. {question.question_text}
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {options.map((value) => {
            const active = selected === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelect(value)}
                className={cn(
                  "min-h-11 rounded-md border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700",
                  active
                    ? "border-teal-800 bg-teal-800 text-white"
                    : "border-stone-300 bg-white text-stone-800 hover:bg-stone-50",
                )}
                aria-pressed={active}
              >
                {value}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  if (question.question_type === "YES_NO") {
    return (
      <fieldset className="rounded-md border border-stone-200 bg-white p-4">
        <legend className="px-1 text-sm font-medium text-stone-900">
          Câu {question.question_number}. {question.question_text}
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: "Có", value: true as const },
            { label: "Không", value: false as const },
          ].map((item) => {
            const active = selected === item.value;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelect(item.value)}
                className={cn(
                  "min-h-11 rounded-md border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700",
                  active
                    ? "border-teal-800 bg-teal-800 text-white"
                    : "border-stone-300 bg-white text-stone-800 hover:bg-stone-50",
                )}
                aria-pressed={active}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <label className="flex flex-col gap-1.5 rounded-md border border-stone-200 bg-white p-4">
      <span className="text-sm font-medium text-stone-900">
        Câu {question.question_number}. {question.question_text}
      </span>
      <textarea
        value={typeof selected === "string" ? selected : ""}
        onChange={(event) => onSelect(event.target.value)}
        className="min-h-24 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700"
        placeholder="Nhập câu trả lời"
      />
    </label>
  );
}
