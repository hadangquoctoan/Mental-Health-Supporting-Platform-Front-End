import { z } from "zod";
import { MOOD_VALUES, STRESS_LEVELS } from "@/types/check-in";

export const checkInFormSchema = z.object({
  mood: z.enum(MOOD_VALUES, { message: "Vui lòng chọn tâm trạng hôm nay." }),
  stress_level: z.enum(STRESS_LEVELS, {
    message: "Vui lòng chọn mức stress hôm nay.",
  }),
  note: z
    .string()
    .max(1000, "Ghi chú tối đa 1000 ký tự.")
    .optional()
    .or(z.literal("")),
});

export type CheckInFormValues = z.infer<typeof checkInFormSchema>;

export function toCheckInPayload(values: CheckInFormValues): {
  mood: CheckInFormValues["mood"];
  stress_level: CheckInFormValues["stress_level"];
  note?: string;
} {
  const note = values.note?.trim();
  return {
    mood: values.mood,
    stress_level: values.stress_level,
    ...(note ? { note } : {}),
  };
}
