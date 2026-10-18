import { apiClient } from "@/lib/api-client";
import type { CheckIn, CreateCheckInPayload } from "@/types/check-in";

function unwrapCheckIn(data: CheckIn | { data?: CheckIn; check_in?: CheckIn } | null): CheckIn | null {
  if (!data) return null;
  if ((data as CheckIn).id) return data as CheckIn;
  const wrapped = data as { data?: CheckIn; check_in?: CheckIn };
  return wrapped.check_in ?? wrapped.data ?? null;
}

function unwrapList(
  data: CheckIn[] | { data: CheckIn[] },
): CheckIn[] {
  if (Array.isArray(data)) return data;
  return data.data ?? [];
}

export async function getTodayCheckIn(): Promise<CheckIn | null> {
  const { data } = await apiClient.get<
    CheckIn | { data?: CheckIn; check_in?: CheckIn } | null
  >("/check-ins/today");
  return unwrapCheckIn(data);
}

export async function listCheckIns(limit = 14): Promise<CheckIn[]> {
  const { data } = await apiClient.get<CheckIn[] | { data: CheckIn[] }>(
    "/check-ins",
    { params: { limit } },
  );
  return unwrapList(data);
}

export async function createCheckIn(
  payload: CreateCheckInPayload,
): Promise<CheckIn> {
  const { data } = await apiClient.post<
    CheckIn | { data?: CheckIn; check_in?: CheckIn }
  >("/check-ins", payload);
  const created = unwrapCheckIn(data);
  if (!created) {
    throw new Error("Máy chủ không trả về bản ghi check-in.");
  }
  return created;
}
