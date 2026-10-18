"use client";

import { Button } from "@/components/ui/Button";

export function AbandonConfirm({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xác nhận bỏ dở"
      className="fixed inset-0 z-40 flex items-center justify-center bg-stone-900/40 p-4"
    >
      <div className="w-full max-w-md rounded-md border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">Bỏ dở bài làm?</h2>
        <p className="mt-1 text-sm text-stone-600">
          Bài làm sẽ được đánh dấu ABANDONED và không tạo kết quả.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Tiếp tục làm
          </Button>
          <Button onClick={onConfirm}>Bỏ dở</Button>
        </div>
      </div>
    </div>
  );
}
