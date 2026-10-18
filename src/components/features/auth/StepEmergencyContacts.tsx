"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import {
  emergencyContactsSchema,
  type EmergencyContactsFormValues,
} from "@/lib/validations/patient";
import { RELATIONSHIP_OPTIONS } from "@/types/patient";
import { useRegisterWizardStore } from "@/store/register-wizard-store";

export function StepEmergencyContacts() {
  const emergencyContacts = useRegisterWizardStore(
    (state) => state.emergencyContacts,
  );
  const setEmergencyContacts = useRegisterWizardStore(
    (state) => state.setEmergencyContacts,
  );
  const goNext = useRegisterWizardStore((state) => state.goNext);
  const goBack = useRegisterWizardStore((state) => state.goBack);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmergencyContactsFormValues>({
    resolver: zodResolver(emergencyContactsSchema),
    defaultValues: {
      contacts:
        emergencyContacts.length > 0
          ? emergencyContacts
          : [{ name: "", phone: "", relationship: "", priority: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  function onSubmit(values: EmergencyContactsFormValues) {
    setEmergencyContacts(
      values.contacts.map((contact, index) => ({
        ...contact,
        priority: index + 1,
      })),
    );
    goNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Người thân liên hệ khi khẩn cấp
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Bắt buộc ít nhất 1 liên hệ. Thứ tự danh sách là thứ tự ưu tiên gọi.
        </p>
      </div>

      {errors.contacts?.root?.message || errors.contacts?.message ? (
        <p role="alert" className="text-sm text-red-700">
          {errors.contacts?.root?.message ?? errors.contacts?.message}
        </p>
      ) : null}

      {fields.map((field, index) => (
        <fieldset
          key={field.id}
          className="flex flex-col gap-3 rounded-md border border-stone-200 p-4"
        >
          <legend className="px-1 text-sm font-medium text-stone-800">
            Liên hệ #{index + 1}
          </legend>
          <TextField
            label="Tên *"
            {...register(`contacts.${index}.name`)}
            error={errors.contacts?.[index]?.name?.message}
          />
          <TextField
            label="Số điện thoại *"
            type="tel"
            {...register(`contacts.${index}.phone`)}
            error={errors.contacts?.[index]?.phone?.message}
          />
          <SelectField
            label="Mối quan hệ *"
            placeholder="Chọn mối quan hệ"
            options={RELATIONSHIP_OPTIONS.map((item) => ({
              value: item.value,
              label: item.label,
            }))}
            {...register(`contacts.${index}.relationship`)}
            error={errors.contacts?.[index]?.relationship?.message}
          />
          <input
            type="hidden"
            {...register(`contacts.${index}.priority`, { valueAsNumber: true })}
          />
          {fields.length > 1 ? (
            <Button
              variant="ghost"
              onClick={() => remove(index)}
              className="self-start"
            >
              Xóa liên hệ này
            </Button>
          ) : null}
        </fieldset>
      ))}

      <Button
        variant="secondary"
        onClick={() =>
          append({
            name: "",
            phone: "",
            relationship: "",
            priority: fields.length + 1,
          })
        }
      >
        Thêm liên hệ khác
      </Button>

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
