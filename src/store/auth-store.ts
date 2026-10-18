import { create } from "zustand";
import {
  getMe,
  login as loginRequest,
  refreshTokens,
  registerDoctor,
  registerPatient,
} from "@/lib/api/auth";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/auth-tokens";
import type {
  AuthUser,
  LoginRequest,
  RegisterDoctorRequest,
  RegisterPatientRequest,
} from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isHydrated: boolean;
  login: (payload: LoginRequest) => Promise<AuthUser>;
  registerPatientAccount: (
    payload: RegisterPatientRequest,
  ) => Promise<AuthUser>;
  registerDoctorAccount: (payload: RegisterDoctorRequest) => Promise<AuthUser>;
  refreshSession: () => Promise<string | null>;
  hydrate: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isHydrated: false,

  login: async (payload) => {
    const response = await loginRequest(payload);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    set({ user: response.user, accessToken: response.accessToken });
    return response.user;
  },

  registerPatientAccount: async (payload) => {
    const response = await registerPatient(payload);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    set({ user: response.user, accessToken: response.accessToken });
    return response.user;
  },

  registerDoctorAccount: async (payload) => {
    const response = await registerDoctor(payload);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    set({ user: response.user, accessToken: response.accessToken });
    return response.user;
  },

  refreshSession: async () => {
    try {
      const currentRefresh = getRefreshToken();
      const tokens = await refreshTokens(currentRefresh ?? undefined);
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      set({ accessToken: tokens.accessToken });
      return tokens.accessToken;
    } catch {
      get().logout();
      return null;
    }
  },

  hydrate: async () => {
    const existingAccess = getAccessToken();
    const existingRefresh = getRefreshToken();
    if (!existingAccess && !existingRefresh) {
      set({ isHydrated: true, user: null, accessToken: null });
      return;
    }
    try {
      if (!existingAccess && existingRefresh) {
        await get().refreshSession();
      }
      const { user } = await getMe();
      set({
        user,
        accessToken: getAccessToken(),
        isHydrated: true,
      });
    } catch {
      get().logout();
      set({ isHydrated: true });
    }
  },

  logout: () => {
    clearTokens();
    set({ user: null, accessToken: null });
  },
}));
