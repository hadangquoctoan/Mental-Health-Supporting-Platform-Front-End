export const MOOD_VALUES = [
  "rat_tot",
  "tot",
  "binh_thuong",
  "kem",
  "rat_kem",
] as const;

export type MoodValue = (typeof MOOD_VALUES)[number];

export const STRESS_LEVELS = [
  "VERY_LOW",
  "LOW",
  "MODERATE",
  "HIGH",
  "VERY_HIGH",
] as const;

export type StressLevel = (typeof STRESS_LEVELS)[number];

export interface CheckIn {
  id: number;
  patient_id: number;
  mood: MoodValue | string | null;
  stress_level: StressLevel | null;
  note: string | null;
  created_at: string;
  updated_at?: string;
}

export interface CreateCheckInPayload {
  mood: MoodValue;
  stress_level: StressLevel;
  note?: string;
}
