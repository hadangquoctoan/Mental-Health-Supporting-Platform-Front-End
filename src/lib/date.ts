const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function padDatePart(value: number): string {
  return String(value).padStart(2, "0");
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;
}

export function parseIsoDate(value?: string): Date | null {
  if (!value) return null;
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatIsoDateDisplay(value?: string): string {
  const date = parseIsoDate(value);
  if (!date) return "";
  return `${padDatePart(date.getDate())}/${padDatePart(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function startOfCalendarGrid(year: number, month: number): Date {
  const first = new Date(year, month, 1);
  const weekday = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - weekday);
  return start;
}

export function buildMonthDays(year: number, month: number): Date[] {
  const start = startOfCalendarGrid(year, month);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export function shiftMonth(year: number, month: number, delta: number): {
  year: number;
  month: number;
} {
  const next = new Date(year, month + delta, 1);
  return { year: next.getFullYear(), month: next.getMonth() };
}

export function yearsDescending(fromYear: number, toYear: number): number[] {
  const years: number[] = [];
  for (let year = fromYear; year >= toYear; year -= 1) {
    years.push(year);
  }
  return years;
}

export function addYears(date: Date, years: number): Date {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export const APP_TIMEZONE = "Asia/Ho_Chi_Minh";

export function todayInAppTimezone(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

export function isoDateFromTimestamp(value: string, timeZone = APP_TIMEZONE): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

export function formatTimestampDisplay(value: string, timeZone = APP_TIMEZONE): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
