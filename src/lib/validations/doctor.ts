import { z } from "zod";
import { phoneRegex } from "./auth";

export const licenseRegex = /^BYT-\d{6}$/;

export const doctorProfileSchema = z.object({
  license_number: z
    .string()
    .regex(licenseRegex, "Số CCHN phải có dạng BYT-XXXXXX (VD: BYT-123456)"),
  phone: z
    .string()
    .regex(phoneRegex, "Số điện thoại không hợp lệ")
    .optional()
    .or(z.literal("")),
  bio: z.string().max(1000, "Tối đa 1000 ký tự").optional().or(z.literal("")),
});

export type DoctorProfileFormValues = z.infer<typeof doctorProfileSchema>;
