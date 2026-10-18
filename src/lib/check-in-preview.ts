import { todayInAppTimezone } from "@/lib/date";
import type { CheckIn, CreateCheckInPayload, MoodValue, StressLevel } from "@/types/check-in";

const STORAGE_KEY = "mh_checkin_preview";

function readAll(): CheckIn[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CheckIn[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(items: CheckIn[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function loadPreviewCheckIns(): CheckIn[] {
  return readAll().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function loadPreviewTodayCheckIn(): CheckIn | null {
  const today = todayInAppTimezone();
  return (
    loadPreviewCheckIns().find((item) => item.created_at.slice(0, 10) === today) ??
    null
  );
}

export function savePreviewCheckIn(payload: CreateCheckInPayload): CheckIn {
  const today = todayInAppTimezone();
  const existing = loadPreviewTodayCheckIn();
  if (existing) return existing;

  const now = new Date().toISOString();
  const record: CheckIn = {
    id: Date.now(),
    patient_id: 0,
    mood: payload.mood,
    stress_level: payload.stress_level,
    note: payload.note ?? null,
    created_at: `${today}T${now.slice(11)}`,
    updated_at: now,
  };
  writeAll([record, ...readAll()]);
  return record;
}

export function isSameCalendarDay(createdAt: string, day = todayInAppTimezone()): boolean {
  return createdAt.slice(0, 10) === day;
}

export const MOOD_LABELS: Record<MoodValue, string> = {
  rat_tot: "Rất tốt",
  tot: "Tốt",
  binh_thuong: "Bình thường",
  kem: "Kém",
  rat_kem: "Rất kém",
};

export const STRESS_LABELS: Record<StressLevel, string> = {
  VERY_LOW: "Rất thấp",
  LOW: "Thấp",
  MODERATE: "Trung bình",
  HIGH: "Cao",
  VERY_HIGH: "Rất cao",
};

export function moodLabel(value: string | null | undefined): string {
  if (!value) return "Chưa chọn";
  return MOOD_LABELS[value as MoodValue] ?? value;
}

export function stressLabel(value: string | null | undefined): string {
  if (!value) return "Chưa chọn";
  return STRESS_LABELS[value as StressLevel] ?? value;
}
