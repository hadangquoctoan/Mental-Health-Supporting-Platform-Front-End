"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckInForm } from "@/components/features/check-in/CheckInForm";
import { Button } from "@/components/ui/Button";
import { useCheckInStore } from "@/store/check-in-store";

function CheckInPageInner() {
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview") === "1";
  const load = useCheckInStore((state) => state.load);
  const today = useCheckInStore((state) => state.today);
  const loading = useCheckInStore((state) => state.loading);
  const error = useCheckInStore((state) => state.error);

  useEffect(() => {
    void load(preview);
  }, [load, preview]);

  const suffix = preview ? "?preview=1" : "";

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Check-in hàng ngày</h1>
          <p className="mt-1 text-sm text-stone-600">
            Ghi nhận tâm trạng và mức stress. Kết quả không thay thế chẩn đoán y khoa.
          </p>
        </div>
        <Link href={`/check-in/history${suffix}`}>
          <Button variant="secondary">Lịch sử</Button>
        </Link>
      </div>

      {preview ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Chế độ xem trước (chưa có backend). Dữ liệu lưu local trên trình duyệt.
        </p>
      ) : null}

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-stone-600" role="status">
            Đang tải check-in...
          </p>
        ) : (
          <CheckInForm locked={Boolean(today)} />
        )}
      </div>

      {error && !today ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <p className="mt-6">
        <Link href={`/dashboard${suffix}`} className="text-sm font-medium text-teal-800 hover:underline">
          Quay về trang chính
        </Link>
      </p>
    </main>
  );
}

export default function CheckInPage() {
  return (
    <Suspense
      fallback={
        <p className="p-6 text-sm text-stone-600" role="status">
          Đang tải check-in...
        </p>
      }
    >
      <CheckInPageInner />
    </Suspense>
  );
}
