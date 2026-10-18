"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/TextAreaField";
import {
  patientProfileSchema,
  type PatientProfileFormValues,
} from "@/lib/validations/patient";
import { useRegisterWizardStore } from "@/store/register-wizard-store";

export function StepPatientProfile() {
  const patientProfile = useRegisterWizardStore((state) => state.patientProfile);
  const setPatientProfile = useRegisterWizardStore(
    (state) => state.setPatientProfile,
  );
  const goNext = useRegisterWizardStore((state) => state.goNext);
  const goBack = useRegisterWizardStore((state) => state.goBack);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientProfileFormValues>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: patientProfile,
  });

  function saveAndNext(values: PatientProfileFormValues) {
    setPatientProfile({
      diagnosis_history: values.diagnosis_history ?? "",
      treatment_history: values.treatment_history ?? "",
      mental_health_notes: values.mental_health_notes ?? "",
    });
    goNext();
  }

  function skip() {
    goNext();
  }

  return (
    <form onSubmit={handleSubmit(saveAndNext)} className="flex flex-col gap-4" noValidate>
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Thông tin sức khỏe tâm lý
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Có thể bổ sung sau. Không bắt buộc ở bước này.
        </p>
      </div>

      <TextAreaField
        label="Tiền sử chẩn đoán"
        placeholder="VD: Trầm cảm nhẹ (2024), rối loạn lo âu (2025)"
        {...register("diagnosis_history")}
        error={errors.diagnosis_history?.message}
      />
      <TextAreaField
        label="Lịch sử điều trị"
        placeholder="VD: Sertraline 50mg 6 tháng, CBT 12 buổi"
        {...register("treatment_history")}
        error={errors.treatment_history?.message}
      />
      <TextAreaField
        label="Ghi chú quan trọng khác"
        placeholder="VD: Dị ứng thuốc nhóm SSRI, tiền sử gia đình"
        {...register("mental_health_notes")}
        error={errors.mental_health_notes?.message}
      />

      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
        <Button variant="secondary" onClick={goBack} className="flex-1">
          Quay lại
        </Button>
        <Button type="submit" className="flex-1">
          Tiếp
        </Button>
      </div>
      <Button variant="ghost" onClick={skip}>
        Bỏ qua
      </Button>
    </form>
  );
}
