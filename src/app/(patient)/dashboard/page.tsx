"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TodayCheckInCard } from "@/components/features/check-in/TodayCheckInCard";
import { CheckInHistoryList } from "@/components/features/check-in/CheckInHistoryList";
import { Button } from "@/components/ui/Button";
import { useCheckInStore } from "@/store/check-in-store";

function PatientDashboardInner() {
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview") === "1";
  const load = useCheckInStore((state) => state.load);
  const today = useCheckInStore((state) => state.today);
  const history = useCheckInStore((state) => state.history);
  const loading = useCheckInStore((state) => state.loading);
  const error = useCheckInStore((state) => state.error);
  const suffix = preview ? "?preview=1" : "";

  useEffect(() => {
    void load(preview);
  }, [load, preview]);

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="text-2xl font-semibold text-stone-900">Hôm nay</h1>
      <p className="mt-2 text-sm text-stone-600">
        Ghi nhận cảm xúc ngắn, rồi tiếp tục sàng lọc khi sẵn sàng.
      </p>

      {preview ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Chế độ xem trước (chưa có backend). Dữ liệu lưu local trên trình duyệt.
        </p>
      ) : null}

      <div className="mt-6">
        <TodayCheckInCard
          today={today}
          loading={loading}
          previewHref={`/check-in/history${suffix}`}
          checkInHref={`/check-in${suffix}`}
        />
      </div>

      {error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <section className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-stone-900">7 ngày gần nhất</h2>
          <Link
            href={`/check-in/history${suffix}`}
            className="text-sm font-medium text-teal-800 hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="mt-3">
          <CheckInHistoryList items={history.slice(0, 7)} loading={loading} />
        </div>
      </section>

      <section className="mt-8 rounded-md border border-stone-200 bg-white p-4">
        <h2 className="text-base font-semibold text-stone-900">Sàng lọc</h2>
        <p className="mt-1 text-sm text-stone-600">
          4 bài PHQ-9, GAD-7, PSS-10, AUDIT. Làm từng câu, lưu nháp tự động.
        </p>
        <div className="mt-3">
          <Link href="/screening">
            <Button variant="secondary">Mở sàng lọc</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function PatientDashboardPage() {
  return (
    <Suspense
      fallback={
        <p className="p-6 text-sm text-stone-600" role="status">
          Đang tải trang chính...
        </p>
      }
    >
      <PatientDashboardInner />
    </Suspense>
  );
}
