import { z } from "zod";
import { phoneRegex } from "./auth";

export const emergencyContactSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên người thân"),
  phone: z.string().regex(phoneRegex, "Số điện thoại không hợp lệ"),
  relationship: z.string().min(1, "Vui lòng chọn mối quan hệ"),
  priority: z.number().int().min(1),
});

export const patientProfileSchema = z.object({
  diagnosis_history: z.string().optional().or(z.literal("")),
  treatment_history: z.string().optional().or(z.literal("")),
  mental_health_notes: z.string().optional().or(z.literal("")),
});

export const emergencyContactsSchema = z.object({
  contacts: z
    .array(emergencyContactSchema)
    .min(1, "Bắt buộc ít nhất 1 liên hệ khẩn cấp"),
});

export type PatientProfileFormValues = z.infer<typeof patientProfileSchema>;
export type EmergencyContactsFormValues = z.infer<typeof emergencyContactsSchema>;
