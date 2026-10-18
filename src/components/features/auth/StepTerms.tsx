"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api-error";
import { getPostLoginPath } from "@/lib/auth-redirect";
import {
  toDoctorRegisterPayload,
  toPatientRegisterPayload,
} from "@/lib/register-payload";
import { useAuthStore } from "@/store/auth-store";
import { useRegisterWizardStore } from "@/store/register-wizard-store";

export function StepTerms() {
  const router = useRouter();
  const wizard = useRegisterWizardStore();
  const registerPatientAccount = useAuthStore(
    (state) => state.registerPatientAccount,
  );
  const registerDoctorAccount = useAuthStore(
    (state) => state.registerDoctorAccount,
  );
  const [accepted, setAccepted] = useState(wizard.termsAccepted);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit() {
    if (!accepted) {
      setError("Bạn cần đồng ý điều khoản trước khi hoàn tất.");
      return;
    }
    if (!wizard.role) {
      setError("Thiếu vai trò đăng ký.");
      return;
    }

    wizard.setTermsAccepted(true);
    setSubmitting(true);
    setError(null);

    try {
      if (wizard.role === "PATIENT") {
        const user = await registerPatientAccount(
          toPatientRegisterPayload(wizard),
        );
        wizard.reset();
        router.push(getPostLoginPath(user));
        return;
      }

      const user = await registerDoctorAccount(
        toDoctorRegisterPayload(wizard),
      );
      wizard.reset();
      router.push(getPostLoginPath(user));
    } catch (submitError) {
      const status = axios.isAxiosError(submitError)
        ? submitError.response?.status
        : undefined;
      if (status === 409 && wizard.role === "DOCTOR") {
        setError("Số chứng chỉ đã được sử dụng.");
        wizard.goTo(3);
        return;
      }
      if (status === 409) {
        setError("Số điện thoại đã được đăng ký.");
        wizard.goTo(2);
        return;
      }
      setError(
        getApiErrorMessage(
          submitError,
          "Không hoàn tất đăng ký. Vui lòng thử lại.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Điều khoản sử dụng</h2>
        <p className="mt-1 text-sm text-stone-600">
          Đọc điều khoản trước khi tạo tài khoản.
        </p>
      </div>

      <Link
        href="/terms"
        className="text-sm font-medium text-teal-800 hover:underline"
      >
        Xem toàn bộ điều khoản
      </Link>

      <label className="flex items-start gap-3 text-sm text-stone-800">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => {
            setAccepted(event.target.checked);
            setError(null);
          }}
          className="mt-1 h-4 w-4 rounded border-stone-300 text-teal-800 focus:ring-teal-700"
        />
        <span>
          Tôi đã đọc và đồng ý Điều khoản Sử dụng và Chính sách Bảo mật Dữ liệu
          Sức khỏe.
        </span>
      </label>

      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={wizard.goBack} className="flex-1">
          Quay lại
        </Button>
        <Button onClick={onSubmit} disabled={submitting} className="flex-1">
          {submitting ? "Đang gửi..." : "Hoàn tất"}
        </Button>
      </div>
    </div>
  );
}
