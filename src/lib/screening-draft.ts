import type { ScreeningAnswer } from "@/types/screening";

export interface ScreeningDraft {
  attemptId: number | null;
  screeningTypeId: number | null;
  answers: Record<number, ScreeningAnswer["value"]>;
  currentIndex: number;
  updatedAt: string;
}

function draftKey(code: string, attemptId: number | string): string {
  return `screening:draft:${code}:${attemptId}`;
}

function legacyKey(code: string): string {
  return `screening:draft:${code}`;
}

export function loadDraft(code: string, attemptId: number | string): ScreeningDraft | null {
  if (typeof window === "undefined") return null;
  const raw =
    window.localStorage.getItem(draftKey(code, attemptId)) ??
    window.localStorage.getItem(legacyKey(code));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ScreeningDraft;
  } catch {
    return null;
  }
}

export function saveDraft(
  code: string,
  attemptId: number | string,
  draft: ScreeningDraft,
): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(draftKey(code, attemptId), JSON.stringify(draft));
}

export function clearDraft(code: string, attemptId: number | string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(draftKey(code, attemptId));
  window.localStorage.removeItem(legacyKey(code));
}

export function clearAllDraftsForCode(code: string): void {
  if (typeof window === "undefined") return;
  const prefix = `screening:draft:${code}:`;
  for (let i = window.localStorage.length - 1; i >= 0; i -= 1) {
    const key = window.localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      window.localStorage.removeItem(key);
    }
  }
  window.localStorage.removeItem(legacyKey(code));
}
