"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScreeningTypeGrid } from "@/components/features/screening/ScreeningTypeGrid";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api-error";
import { listScreeningTypes } from "@/lib/api/screening";
import type { ScreeningType } from "@/types/screening";

export default function ScreeningIndexPage() {
  const [types, setTypes] = useState<ScreeningType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    listScreeningTypes()
      .then((data) => {
        if (mounted) setTypes(data);
      })
      .catch((err: unknown) => {
        if (mounted) setError(getApiErrorMessage(err, "Không tải được danh sách bài."));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Sàng lọc</h1>
          <p className="mt-1 text-sm text-stone-600">
            4 bài PHQ-9, GAD-7, PSS-10, AUDIT. Làm từng câu, lưu nháp tự động.
          </p>
        </div>
        <Link href="/screening/history">
          <Button variant="secondary">Lịch sử</Button>
        </Link>
      </div>

      <div className="mt-6">
        <ScreeningTypeGrid types={types} loading={loading} error={error} />
      </div>

      <p className="mt-6 text-xs leading-5 text-stone-500">
        Lưu ý: điểm số do backend tính (deterministic). Kết quả hiển thị kèm disclaimer y khoa.
      </p>
    </main>
  );
}
