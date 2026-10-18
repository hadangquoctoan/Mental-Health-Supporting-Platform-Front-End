export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface DoctorProfile {
  id: number;
  user_id: number;
  license_number: string;
  approval_status: ApprovalStatus;
  approved_by: number | null;
  approved_at: string | null;
  phone: string | null;
  bio: string | null;
}
