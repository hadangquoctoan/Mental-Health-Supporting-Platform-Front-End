"use client";

import Link from "next/link";
import type { ScreeningType } from "@/types/screening";

const META: Record<string, { purpose: string; range: string }> = {
  PHQ9: { purpose: "Trầm cảm", range: "9 câu, điểm 0-27" },
  GAD7: { purpose: "Lo âu", range: "7 câu, điểm 0-21" },
  PSS10: { purpose: "Stress", range: "10 câu, điểm 0-40" },
  AUDIT: { purpose: "Rượu bia", range: "10 câu, điểm 0-40" },
};

type Props = {
  types: ScreeningType[];
  loading?: boolean;
  error?: string | null;
};

export function ScreeningTypeGrid({ types, loading, error }: Props) {
  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2" aria-busy="true" aria-label="Đang tải danh sách bài sàng lọc">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-md border border-stone-200 bg-stone-100" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (types.length === 0) {
    return <p className="text-sm text-stone-600">Chưa có dữ liệu bài sàng lọc.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {types.map((item) => {
        const meta = META[item.code] ?? { purpose: item.code, range: `${item.total_questions} câu` };
        return (
          <Link
            key={item.id}
            href={`/screening/${item.code}`}
            className="rounded-md border border-stone-200 bg-white p-4 hover:border-teal-700 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            <h3 className="text-sm font-semibold text-stone-900">{item.name}</h3>
            <p className="mt-1 text-xs text-stone-600">
              {meta.purpose} - {meta.range}
            </p>
            {item.description ? (
              <p className="mt-2 line-clamp-2 text-sm text-stone-700">{item.description}</p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

export function ScreeningEmpty() {
  return (
    <div className="rounded-md border border-stone-200 bg-white p-6 text-center">
      <p className="text-sm text-stone-600">Chưa làm bài nào. Bắt đầu với một bài sàng lọc.</p>
    </div>
  );
}
