"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { TextField } from "@/components/ui/TextField";
import {
  doctorProfileSchema,
  type DoctorProfileFormValues,
} from "@/lib/validations/doctor";
import { useRegisterWizardStore } from "@/store/register-wizard-store";

export function StepDoctorProfile() {
  const doctorProfile = useRegisterWizardStore((state) => state.doctorProfile);
  const setDoctorProfile = useRegisterWizardStore((state) => state.setDoctorProfile);
  const goNext = useRegisterWizardStore((state) => state.goNext);
  const goBack = useRegisterWizardStore((state) => state.goBack);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorProfileFormValues>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      license_number: doctorProfile.license_number,
      phone: doctorProfile.professional_phone,
      bio: doctorProfile.bio,
    },
  });

  function onSubmit(values: DoctorProfileFormValues) {
    setDoctorProfile({
      license_number: values.license_number,
      professional_phone: values.phone ?? "",
      bio: values.bio ?? "",
    });
    goNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Thông tin hành nghề</h2>
        <p className="mt-1 text-sm text-stone-600">
          Số chứng chỉ hành nghề theo định dạng BYT-XXXXXX.
        </p>
      </div>

      <TextField
        label="Số CCHN Bộ Y Tế *"
        placeholder="BYT-123456"
        {...register("license_number")}
        error={errors.license_number?.message}
      />
      <TextField
        label="Số điện thoại nghề nghiệp"
        type="tel"
        hint="Khác số điện thoại tài khoản nếu có"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <TextAreaField
        label="Giới thiệu chuyên môn"
        maxLength={1000}
        {...register("bio")}
        error={errors.bio?.message}
      />

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={goBack} className="flex-1">
          Quay lại
        </Button>
        <Button type="submit" className="flex-1">
          Tiếp
        </Button>
      </div>
    </form>
  );
}
