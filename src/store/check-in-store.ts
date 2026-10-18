import { create } from "zustand";
import {
  createCheckIn,
  getTodayCheckIn,
  listCheckIns,
} from "@/lib/api/check-in";
import {
  loadPreviewCheckIns,
  loadPreviewTodayCheckIn,
  savePreviewCheckIn,
} from "@/lib/check-in-preview";
import { getApiErrorMessage } from "@/lib/api-error";
import type { CheckIn, CreateCheckInPayload } from "@/types/check-in";

interface CheckInState {
  today: CheckIn | null;
  history: CheckIn[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
  preview: boolean;
  load: (preview: boolean) => Promise<void>;
  submit: (payload: CreateCheckInPayload) => Promise<CheckIn>;
}

export const useCheckInStore = create<CheckInState>((set, get) => ({
  today: null,
  history: [],
  loading: false,
  submitting: false,
  error: null,
  preview: false,

  load: async (preview) => {
    set({ loading: true, error: null, preview });
    if (preview) {
      const history = loadPreviewCheckIns();
      set({
        today: loadPreviewTodayCheckIn(),
        history,
        loading: false,
      });
      return;
    }
    try {
      const [today, history] = await Promise.all([
        getTodayCheckIn(),
        listCheckIns(14),
      ]);
      set({ today, history, loading: false });
    } catch (error: unknown) {
      set({
        loading: false,
        error: getApiErrorMessage(error, "Không tải được check-in."),
      });
    }
  },

  submit: async (payload) => {
    if (get().submitting) {
      throw new Error("Đang gửi check-in.");
    }
    set({ submitting: true, error: null });
    try {
      const created = get().preview
        ? savePreviewCheckIn(payload)
        : await createCheckIn(payload);
      const history = get().preview
        ? loadPreviewCheckIns()
        : [created, ...get().history.filter((item) => item.id !== created.id)];
      set({
        today: created,
        history,
        submitting: false,
      });
      return created;
    } catch (error: unknown) {
      set({
        submitting: false,
        error: getApiErrorMessage(error, "Không gửi được check-in."),
      });
      throw error;
    }
  },
}));
