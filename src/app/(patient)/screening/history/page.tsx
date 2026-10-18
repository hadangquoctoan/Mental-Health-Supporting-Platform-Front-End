"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { getApiErrorMessage } from "@/lib/api-error";
import { listScreeningHistory, listScreeningTypes } from "@/lib/api/screening";
import type { ScreeningCode, ScreeningResult, ScreeningType } from "@/types/screening";

export default function ScreeningHistoryPage() {
  const [results, setResults] = useState<ScreeningResult[]>([]);
  const [types, setTypes] = useState<ScreeningType[]>([]);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const typeLabel = useMemo(() => {
    const map = new Map(types.map((item) => [item.code, item.name] as const));
    return map;
  }, [types]);

  useEffect(() => {
    let mounted = true;
    async function loadTypes() {
      try {
        const fetched = await listScreeningTypes();
        if (mounted) setTypes(fetched);
      } catch {
        // ignore
      }
    }
    void loadTypes();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await listScreeningHistory(code ? { code } : undefined);
        if (mounted) setResults(data);
      } catch (err: unknown) {
        if (mounted) setError(getApiErrorMessage(err, "Không tải được lịch sử."));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [code]);

  return (
    <main className="mx-auto w-full max-w-4xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-stone-900">Lịch sử sàng lọc</h1>
        <Link href="/screening">
          <Button variant="secondary">Danh sách bài</Button>
        </Link>
      </div>

      <div className="mt-4 max-w-xs">
        <SelectField
          label="Lọc theo bài"
          placeholder="Tất cả"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          options={types.map((item) => ({ value: item.code, label: item.name }))}
        />
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-stone-600" role="status">
          Đang tải lịch sử...
        </p>
      ) : null}
      {error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-4 overflow-x-auto rounded-md border border-stone-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-4 py-2">Bài</th>
              <th className="px-4 py-2">Điểm</th>
              <th className="px-4 py-2">Ngày</th>
              <th className="px-4 py-2">Xem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {results.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-stone-600">
                  Chưa có lịch sử.
                </td>
              </tr>
            ) : (
              results.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 text-stone-900">
                    {typeLabel.get(
                      types.find((type) => type.id === item.screening_type_id)
                        ?.code as ScreeningCode,
                    ) ?? String(item.screening_type_id)}
                  </td>
                  <td className="px-4 py-2">{item.total_score ?? "--"}</td>
                  <td className="px-4 py-2 text-stone-600">
                    {new Date(item.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/screening/${types.find((type) => type.id === item.screening_type_id)?.code ?? "PHQ9"}/result?id=${item.id}`}
                      className="font-medium text-teal-800 hover:underline"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
