export type ScreeningCode = "PHQ9" | "GAD7" | "PSS10" | "AUDIT";

export type ScreeningStatus = "IN_PROGRESS" | "COMPLETED" | "ABANDONED";

export type QuestionType = "SCALE" | "YES_NO" | "TEXT";

export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface ScreeningType {
  id: number;
  code: ScreeningCode;
  name: string;
  description: string | null;
  total_questions: number;
}

export interface ScreeningQuestion {
  id: number;
  screening_type_id: number;
  question_number: number;
  question_text: string;
  question_type: QuestionType;
}

export interface ScreeningAttempt {
  id: number;
  patient_id: number;
  status: ScreeningStatus;
  started_at: string;
  completed_at: string | null;
}

export interface ScreeningAnswer {
  question_number: number;
  value: number | string | boolean;
}

export interface ScreeningResult {
  id: number;
  patient_id: number;
  attempt_id: number;
  screening_type_id: number;
  answers: ScreeningAnswer[];
  total_score: number | null;
  risk_level?: RiskLevel | null;
  created_at: string;
}

export interface ScreeningResultDetail extends ScreeningResult {
  screening_type: ScreeningType;
  attempt: ScreeningAttempt;
}
