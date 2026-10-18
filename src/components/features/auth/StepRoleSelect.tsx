"use client";

import { HeartPulse, Stethoscope } from "lucide-react";
import { useRegisterWizardStore } from "@/store/register-wizard-store";

export function StepRoleSelect() {
  const setRole = useRegisterWizardStore((state) => state.setRole);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Bạn là ai?</h2>
        <p className="mt-1 text-sm text-stone-600">
          Chọn vai trò để tiếp tục đăng ký. Mỗi bước chỉ hỏi một nhóm thông tin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setRole("PATIENT")}
          className="flex min-h-28 flex-col items-start gap-3 rounded-md border border-stone-300 bg-white p-4 text-left hover:border-teal-700 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          <HeartPulse className="h-5 w-5 text-teal-800" aria-hidden="true" />
          <span className="text-base font-medium text-stone-900">Tôi là bệnh nhân</span>
          <span className="text-sm text-stone-600">
            Theo dõi kế hoạch điều trị, sàng lọc và liên hệ khẩn cấp.
          </span>
        </button>

        <button
          type="button"
          onClick={() => setRole("DOCTOR")}
          className="flex min-h-28 flex-col items-start gap-3 rounded-md border border-stone-300 bg-white p-4 text-left hover:border-teal-700 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          <Stethoscope className="h-5 w-5 text-teal-800" aria-hidden="true" />
          <span className="text-base font-medium text-stone-900">Tôi là bác sĩ</span>
          <span className="text-sm text-stone-600">
            Đăng ký với số CCHN Bộ Y Tế, chờ quản trị viên xác minh.
          </span>
        </button>
      </div>
    </div>
  );
}
