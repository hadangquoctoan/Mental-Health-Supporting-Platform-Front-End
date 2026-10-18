import { apiClient } from "@/lib/api-client";
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterDoctorRequest,
  RegisterPatientRequest,
} from "@/types/auth";

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function registerPatient(
  payload: RegisterPatientRequest,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
  );
  return data;
}

export async function registerDoctor(
  payload: RegisterDoctorRequest,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
  );
  return data;
}

export async function refreshTokens(refreshToken?: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const { data } = await apiClient.post<{
    accessToken: string;
    refreshToken: string;
  }>("/auth/refresh", refreshToken ? { refreshToken } : {});
  return data;
}

export async function getMe(): Promise<{ user: AuthUser }> {
  const { data } = await apiClient.get<{ user: AuthUser }>("/auth/me");
  return data;
}
