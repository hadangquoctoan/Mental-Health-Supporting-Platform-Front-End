"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckInHistoryList } from "@/components/features/check-in/CheckInHistoryList";
import { Button } from "@/components/ui/Button";
import { useCheckInStore } from "@/store/check-in-store";

function CheckInHistoryInner() {
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview") === "1";
  const load = useCheckInStore((state) => state.load);
  const history = useCheckInStore((state) => state.history);
  const loading = useCheckInStore((state) => state.loading);
  const error = useCheckInStore((state) => state.error);

  useEffect(() => {
    void load(preview);
  }, [load, preview]);

  const suffix = preview ? "?preview=1" : "";

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-stone-900">Lịch sử check-in</h1>
        <Link href={`/check-in${suffix}`}>
          <Button variant="secondary">Check-in hôm nay</Button>
        </Link>
      </div>
      {error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-4">
        <CheckInHistoryList items={history} loading={loading} />
      </div>
      <p className="mt-6">
        <Link href={`/dashboard${suffix}`} className="text-sm font-medium text-teal-800 hover:underline">
          Quay về trang chính
        </Link>
      </p>
    </main>
  );
}

export default function CheckInHistoryPage() {
  return (
    <Suspense
      fallback={
        <p className="p-6 text-sm text-stone-600" role="status">
          Đang tải lịch sử...
        </p>
      }
    >
      <CheckInHistoryInner />
    </Suspense>
  );
}
