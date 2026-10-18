"use client";

import Link from "next/link";
import { StepAccountInfo } from "@/components/features/auth/StepAccountInfo";
import { StepDoctorProfile } from "@/components/features/auth/StepDoctorProfile";
import { StepEmergencyContacts } from "@/components/features/auth/StepEmergencyContacts";
import { StepPatientProfile } from "@/components/features/auth/StepPatientProfile";
import { StepRoleSelect } from "@/components/features/auth/StepRoleSelect";
import { StepTerms } from "@/components/features/auth/StepTerms";
import { useRegisterWizardStore } from "@/store/register-wizard-store";

export function RegisterStepper() {
  const step = useRegisterWizardStore((state) => state.step);
  const role = useRegisterWizardStore((state) => state.role);
  const totalSteps = useRegisterWizardStore((state) => state.totalSteps());

  function renderStep() {
    if (step === 1) return <StepRoleSelect />;
    if (step === 2) return <StepAccountInfo />;
    if (role === "DOCTOR") {
      if (step === 3) return <StepDoctorProfile />;
      return <StepTerms />;
    }
    if (step === 3) return <StepPatientProfile />;
    if (step === 4) return <StepEmergencyContacts />;
    return <StepTerms />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          Bước {step}/{totalSteps}
        </p>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-valuenow={step}
          aria-label="Tiến trình đăng ký"
        >
          <div
            className="h-full bg-teal-800 transition-all"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      {step === 1 ? (
        <p className="text-center text-sm text-stone-600">
          Đã có tài khoản?{" "}
          <Link href="/login" className="font-medium text-teal-800 hover:underline">
            Đăng nhập
          </Link>
        </p>
      ) : null}
    </div>
  );
}
