import { create } from "zustand";
import type { ScreeningAnswer } from "@/types/screening";

interface ScreeningRunnerState {
  code: string | null;
  attemptId: number | null;
  screeningTypeId: number | null;
  answers: Record<number, ScreeningAnswer["value"]>;
  currentIndex: number;
  setRunner: (payload: {
    code: string;
    attemptId: number | null;
    screeningTypeId: number | null;
    answers?: Record<number, ScreeningAnswer["value"]>;
    currentIndex?: number;
  }) => void;
  setAnswer: (questionNumber: number, value: ScreeningAnswer["value"]) => void;
  setIndex: (index: number) => void;
  reset: () => void;
}

export const useScreeningRunnerStore = create<ScreeningRunnerState>((set) => ({
  code: null,
  attemptId: null,
  screeningTypeId: null,
  answers: {},
  currentIndex: 0,
  setRunner: (payload) =>
    set({
      code: payload.code,
      attemptId: payload.attemptId,
      screeningTypeId: payload.screeningTypeId,
      answers: payload.answers ?? {},
      currentIndex: payload.currentIndex ?? 0,
    }),
  setAnswer: (questionNumber, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionNumber]: value },
    })),
  setIndex: (currentIndex) => set({ currentIndex }),
  reset: () =>
    set({
      code: null,
      attemptId: null,
      screeningTypeId: null,
      answers: {},
      currentIndex: 0,
    }),
}));
