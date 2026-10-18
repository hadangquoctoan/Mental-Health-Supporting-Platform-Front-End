"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { getApiErrorMessage } from "@/lib/api-error";
import { getPostLoginPath } from "@/lib/auth-redirect";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useAuthStore } from "@/store/auth-store";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formError, setFormError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setFormError(null);
    try {
      const user = await login(values);
      router.push(getPostLoginPath(user));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setFormError("Số điện thoại hoặc mật khẩu không đúng.");
        return;
      }
      setFormError(
        getApiErrorMessage(error, "Không đăng nhập được. Vui lòng thử lại."),
      );
    }
  }

  function onForgotPassword() {
    setToast("Tính năng đang phát triển, vui lòng liên hệ quản trị viên.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <TextField
        label="Số điện thoại"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        autoComplete="current-password"
        {...register("password")}
        error={errors.password?.message}
      />

      <button
        type="button"
        onClick={onForgotPassword}
        className="self-start text-sm text-teal-800 underline-offset-2 hover:underline"
      >
        Quên mật khẩu?
      </button>

      {toast ? (
        <p role="status" className="rounded-md bg-stone-100 px-3 py-2 text-sm text-stone-700">
          {toast}
        </p>
      ) : null}

      {formError ? (
        <p role="alert" className="text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

      <p className="text-center text-sm text-stone-600">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="font-medium text-teal-800 hover:underline">
          Đăng ký
        </Link>
      </p>
    </form>
  );
}
