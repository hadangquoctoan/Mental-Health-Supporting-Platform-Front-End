"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { MoodPicker } from "@/components/features/check-in/MoodPicker";
import { StressPicker } from "@/components/features/check-in/StressPicker";
import { RedFlagBanner } from "@/components/features/check-in/RedFlagBanner";
import { hasCheckInRedFlag } from "@/lib/check-in-red-flags";
import {
  checkInFormSchema,
  toCheckInPayload,
  type CheckInFormValues,
} from "@/lib/validations/check-in";
import { useCheckInStore } from "@/store/check-in-store";

type Props = {
  locked: boolean;
};

export function CheckInForm({ locked }: Props) {
  const submit = useCheckInStore((state) => state.submit);
  const submitting = useCheckInStore((state) => state.submitting);
  const storeError = useCheckInStore((state) => state.error);
  const [success, setSuccess] = useState(false);

  const form = useForm<CheckInFormValues>({
    resolver: zodResolver(checkInFormSchema),
    defaultValues: {
      mood: undefined,
      stress_level: undefined,
      note: "",
    },
  });

  const disabled = locked || submitting;

  async function onSubmit(values: CheckInFormValues) {
    setSuccess(false);
    try {
      await submit(toCheckInPayload(values));
      setSuccess(true);
    } catch {
      // error already stored
    }
  }

  if (locked) {
    return (
      <p className="rounded-md border border-stone-200 bg-white p-4 text-sm text-stone-700">
        Bạn đã check-in hôm nay. Quay lại vào ngày mai.
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <Controller
        name="mood"
        control={form.control}
        render={({ field, fieldState }) => (
          <MoodPicker
            value={field.value}
            disabled={disabled}
            error={fieldState.error?.message}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="stress_level"
        control={form.control}
        render={({ field, fieldState }) => (
          <StressPicker
            value={field.value}
            disabled={disabled}
            error={fieldState.error?.message}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="note"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <TextAreaField
              label="Ghi chú (không bắt buộc)"
              hint="Bạn có thể viết ngắn về cảm xúc hoặc giấc ngủ. Tối đa 1000 ký tự."
              maxLength={1000}
              disabled={disabled}
              error={fieldState.error?.message}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
            {hasCheckInRedFlag(field.value) ? <RedFlagBanner /> : null}
          </>
        )}
      />
      {storeError ? (
        <p role="alert" className="text-sm text-red-700">
          {storeError}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="text-sm text-teal-800">
          Đã ghi nhận check-in hôm nay.
        </p>
      ) : null}
      <Button type="submit" disabled={disabled} fullWidth>
        {submitting ? "Đang gửi..." : "Gửi check-in"}
      </Button>
    </form>
  );
}
