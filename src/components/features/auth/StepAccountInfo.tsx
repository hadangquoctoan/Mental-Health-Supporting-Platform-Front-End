"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { DateField } from "@/components/ui/DateField";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import {
  accountInfoSchema,
  type AccountInfoFormValues,
} from "@/lib/validations/auth";
import { useRegisterWizardStore } from "@/store/register-wizard-store";

export function StepAccountInfo() {
  const account = useRegisterWizardStore((state) => state.account);
  const setAccount = useRegisterWizardStore((state) => state.setAccount);
  const goNext = useRegisterWizardStore((state) => state.goNext);
  const goBack = useRegisterWizardStore((state) => state.goBack);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, defaultValues },
  } = useForm<AccountInfoFormValues>({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      phone: account.phone,
      password: account.password,
      confirmPassword: "",
      full_name: account.full_name,
      date_of_birth: account.date_of_birth ?? "",
      gender: account.gender,
      address: account.address ?? "",
    },
  });

  function onSubmit(values: AccountInfoFormValues) {
    setAccount({
      phone: values.phone,
      password: values.password,
      full_name: values.full_name,
      date_of_birth: values.date_of_birth || undefined,
      gender: values.gender,
      address: values.address || undefined,
    });
    goNext();
  }

  const [dateOfBirth, setDateOfBirth] = useState(
    defaultValues?.date_of_birth ?? "",
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Tạo tài khoản</h2>
        <p className="mt-1 text-sm text-stone-600">
          Số điện thoại dùng để đăng nhập. Mật khẩu tối thiểu 8 ký tự, gồm chữ và số.
        </p>
      </div>

      <TextField
        label="Số điện thoại *"
        type="tel"
        autoComplete="tel"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <TextField
        label="Mật khẩu *"
        type="password"
        autoComplete="new-password"
        {...register("password")}
        error={errors.password?.message}
      />
      <TextField
        label="Xác nhận mật khẩu *"
        type="password"
        autoComplete="new-password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <TextField
        label="Họ và tên *"
        autoComplete="name"
        {...register("full_name")}
        error={errors.full_name?.message}
      />
      <DateField
        label="Ngày sinh"
        name="date_of_birth"
        value={dateOfBirth}
        onChange={(next) => {
          setDateOfBirth(next);
          setValue("date_of_birth", next, { shouldDirty: true, shouldValidate: true });
        }}
        error={errors.date_of_birth?.message}
        hint="Định dạng ngày/tháng/năm. Tuổi từ 13 đến 120."
      />
      <SelectField
        label="Giới tính"
        placeholder="Chọn giới tính"
        options={[
          { value: "MALE", label: "Nam" },
          { value: "FEMALE", label: "Nữ" },
          { value: "OTHER", label: "Khác" },
        ]}
        {...register("gender")}
        error={errors.gender?.message}
      />
      <TextField
        label="Địa chỉ"
        {...register("address")}
        error={errors.address?.message}
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
