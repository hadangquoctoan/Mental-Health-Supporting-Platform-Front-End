export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface User {
  id: number;
  role: UserRole;
  full_name: string;
  phone: string;
  date_of_birth: string | null;
  gender: Gender | null;
  address: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}
