"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  addYears,
  buildMonthDays,
  formatIsoDateDisplay,
  parseIsoDate,
  shiftMonth as nextMonth,
  startOfToday,
  toIsoDate,
  yearsDescending,
} from "@/lib/date";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MONTH_LABELS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

type DateFieldProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  minAge?: number;
  maxAge?: number;
  name?: string;
};

export function DateField({
  label,
  value,
  onChange,
  error,
  hint,
  minAge = 13,
  maxAge = 120,
  name,
}: DateFieldProps) {
  const generatedId = useId();
  const fieldId = name ?? generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const today = useMemo(() => startOfToday(), []);
  const maxDate = useMemo(() => addYears(today, -minAge), [today, minAge]);
  const minDate = useMemo(() => addYears(today, -maxAge), [today, maxAge]);
  const selected = parseIsoDate(value);
  const defaultView = useMemo(() => {
    const year = today.getFullYear() - 25;
    return { year, month: 0 };
  }, [today]);
  const [viewYear, setViewYear] = useState(
    () => selected?.getFullYear() ?? defaultView.year,
  );
  const [viewMonth, setViewMonth] = useState(
    () => selected?.getMonth() ?? defaultView.month,
  );

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const days = useMemo(
    () => buildMonthDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );
  const years = useMemo(
    () => yearsDescending(maxDate.getFullYear(), minDate.getFullYear()),
    [maxDate, minDate],
  );

  function isDisabled(date: Date): boolean {
    return date < minDate || date > maxDate;
  }

  function selectDate(date: Date) {
    if (isDisabled(date)) return;
    onChange(toIsoDate(date));
    setOpen(false);
  }

  function onShiftMonth(delta: number) {
    const next = nextMonth(viewYear, viewMonth, delta);
    setViewYear(next.year);
    setViewMonth(next.month);
  }

  return (
    <div ref={rootRef} className="relative z-30 flex flex-col gap-1.5 overflow-visible">
      <label htmlFor={fieldId} className="text-sm font-medium text-stone-800">
        {label}
      </label>
      <button
        id={fieldId}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex min-h-11 w-full items-center justify-between rounded-md border bg-white px-3 text-left text-sm focus:outline-none focus:ring-2 focus:ring-teal-700",
          error ? "border-red-600" : "border-stone-300",
        )}
      >
        <span className={value ? "text-stone-900" : "text-stone-400"}>
          {formatIsoDateDisplay(value) || "Chọn ngày sinh"}
        </span>
        <CalendarDays className="h-4 w-4 text-stone-500" aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Chọn ngày sinh"
          className="absolute left-0 top-full z-50 mt-2 w-full rounded-md border border-stone-200 bg-white p-3 shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onShiftMonth(-1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-700 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              aria-label="Tháng trước"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex flex-1 gap-2">
              <select
                aria-label="Tháng"
                value={viewMonth}
                onChange={(event) => setViewMonth(Number(event.target.value))}
                className="min-h-8 flex-1 rounded-md border border-stone-300 bg-white px-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                {MONTH_LABELS.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                aria-label="Năm"
                value={viewYear}
                onChange={(event) => setViewYear(Number(event.target.value))}
                className="min-h-8 w-24 rounded-md border border-stone-300 bg-white px-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => onShiftMonth(1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-700 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              aria-label="Tháng sau"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-stone-500">
            {WEEKDAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map((date) => {
              const iso = toIsoDate(date);
              const outside = date.getMonth() !== viewMonth;
              const disabled = isDisabled(date);
              const isSelected = value === iso;
              const isToday = toIsoDate(today) === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDate(date)}
                  className={cn(
                    "flex h-8 items-center justify-center rounded-md text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:text-stone-300",
                    outside && !isSelected && "text-stone-400",
                    isSelected && "bg-teal-800 text-white",
                    !isSelected && !disabled && "hover:bg-teal-50",
                    isToday && !isSelected && "ring-1 ring-teal-700",
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

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
