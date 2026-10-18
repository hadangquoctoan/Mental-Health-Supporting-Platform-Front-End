export interface PatientProfile {
  id: number;
  user_id: number;
  diagnosis_history: string | null;
  treatment_history: string | null;
  mental_health_notes: string | null;
}

export interface EmergencyContact {
  id?: number;
  name: string;
  phone: string;
  relationship: string;
  priority: number;
}

export const RELATIONSHIP_OPTIONS = [
  { value: "PARENT", label: "Cha/Mẹ" },
  { value: "SPOUSE", label: "Vợ/Chồng" },
  { value: "SIBLING", label: "Anh/Chị/Em" },
  { value: "FRIEND", label: "Bạn bè" },
  { value: "OTHER", label: "Khác" },
] as const;
