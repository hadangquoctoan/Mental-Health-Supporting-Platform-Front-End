import type { User, UserRole, Gender } from "./user";
import type { PatientProfile, EmergencyContact } from "./patient";
import type { DoctorProfile } from "./doctor";

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterAccountInfo {
  phone: string;
  password: string;
  full_name: string;
  date_of_birth?: string;
  gender?: Gender;
  address?: string;
}

export interface RegisterPatientRequest extends RegisterAccountInfo {
  role: "PATIENT";
  diagnosis_history?: string;
  treatment_history?: string;
  mental_health_notes?: string;
  emergency_contacts: EmergencyContact[];
}

export interface RegisterDoctorRequest extends RegisterAccountInfo {
  role: "DOCTOR";
  license_number: string;
  professional_phone?: string;
  bio?: string;
}

export type RegisterRequest = RegisterPatientRequest | RegisterDoctorRequest;

export interface AuthUser extends User {
  patient_profile?: PatientProfile | null;
  doctor_profile?: DoctorProfile | null;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface RegisterWizardState {
  role: "PATIENT" | "DOCTOR" | null;
  account: RegisterAccountInfo;
  patientProfile: {
    diagnosis_history: string;
    treatment_history: string;
    mental_health_notes: string;
  };
  doctorProfile: {
    license_number: string;
    professional_phone: string;
    bio: string;
  };
  emergencyContacts: EmergencyContact[];
  termsAccepted: boolean;
}
