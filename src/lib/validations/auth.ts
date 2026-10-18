import { z } from "zod";

export const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export const loginSchema = z.object({
  phone: z.string().regex(phoneRegex, "Số điện thoại không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const accountInfoSchema = z
  .object({
    phone: z.string().regex(phoneRegex, "Số điện thoại không hợp lệ"),
    password: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .regex(/[a-zA-Z]/, "Phải có ít nhất 1 chữ cái")
      .regex(/\d/, "Phải có ít nhất 1 chữ số"),
    confirmPassword: z.string(),
    full_name: z.string().min(2, "Họ tên tối thiểu 2 ký tự").max(255),
    date_of_birth: z.string().optional().or(z.literal("")),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    address: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type AccountInfoFormValues = z.infer<typeof accountInfoSchema>;
