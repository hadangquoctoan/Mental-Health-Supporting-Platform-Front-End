import { apiClient } from "@/lib/api-client";
import type {
  ScreeningAttempt,
  ScreeningQuestion,
  ScreeningResult,
  ScreeningType,
} from "@/types/screening";

export async function listScreeningTypes(): Promise<ScreeningType[]> {
  const { data } = await apiClient.get<ScreeningType[] | { data: ScreeningType[] }>(
    "/screening-types",
  );
  if (Array.isArray(data)) return data;
  return data.data;
}

export async function listScreeningQuestions(
  code: string,
): Promise<ScreeningQuestion[]> {
  const { data } = await apiClient.get<
    ScreeningQuestion[] | { data: ScreeningQuestion[] }
  >(`/screening-types/${code}/questions`);
  if (Array.isArray(data)) return data;
  return data.data;
}

export async function createScreeningAttempt(payload: {
  screening_type_id: number;
}): Promise<ScreeningAttempt> {
  const { data } = await apiClient.post<ScreeningAttempt | { attempt: ScreeningAttempt }>(
    "/screening-attempts",
    payload,
  );
  if ((data as ScreeningAttempt).id) return data as ScreeningAttempt;
  return (data as { attempt: ScreeningAttempt }).attempt;
}

export async function abandonScreeningAttempt(
  attemptId: number,
): Promise<ScreeningAttempt> {
  const { data } = await apiClient.patch<
    ScreeningAttempt | { attempt: ScreeningAttempt }
  >(`/screening-attempts/${attemptId}`, { status: "ABANDONED" });
  if ((data as ScreeningAttempt).id) return data as ScreeningAttempt;
  return (data as { attempt: ScreeningAttempt }).attempt;
}

export async function submitScreeningResult(payload: {
  attempt_id: number;
  screening_type_id: number;
  answers: Array<{ question_number: number; value: number | string | boolean }>;
}): Promise<ScreeningResult> {
  const { data } = await apiClient.post<
    ScreeningResult | { result: ScreeningResult }
  >("/screening-results", payload);
  if ((data as ScreeningResult).id) return data as ScreeningResult;
  return (data as { result: ScreeningResult }).result;
}

export async function listScreeningHistory(params?: {
  code?: string;
  page?: number;
}): Promise<ScreeningResult[]> {
  const { data } = await apiClient.get<ScreeningResult[] | { data: ScreeningResult[] }>(
    "/screening-results",
    { params },
  );
  if (Array.isArray(data)) return data;
  return data.data;
}

export async function getScreeningResult(resultId: number): Promise<ScreeningResult> {
  const { data } = await apiClient.get<ScreeningResult | { result: ScreeningResult }>(
    `/screening-results/${resultId}`,
  );
  if ((data as ScreeningResult).id) return data as ScreeningResult;
  return (data as { result: ScreeningResult }).result;
}
