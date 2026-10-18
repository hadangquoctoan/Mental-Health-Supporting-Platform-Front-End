import { z } from "zod";

export const screeningAnswerSchema = z.object({
  question_number: z.number().int().min(1),
  value: z.union([z.number().int(), z.string().min(1), z.boolean()]),
});

export const submitScreeningSchema = z.object({
  screening_type_id: z.number().int().min(1),
  attempt_id: z.number().int().min(1).optional(),
  answers: z.array(screeningAnswerSchema).min(1, "Vui lòng trả lời ít nhất 1 câu"),
});

export type SubmitScreeningValues = z.infer<typeof submitScreeningSchema>;
