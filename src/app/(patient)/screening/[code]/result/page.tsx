"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ScreeningResultCard } from "@/components/features/screening/ScreeningResultCard";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api-error";
import { getScreeningResult, listScreeningTypes } from "@/lib/api/screening";
import type { ScreeningResult, ScreeningType } from "@/types/screening";

export default function ScreeningResultPage() {
  const params = useParams<{ code: string }>();
  const code = String(params.code).toUpperCase();
  const searchParams = useSearchParams();
  const resultId = Number(searchParams.get("id"));
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [typeName, setTypeName] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(
    !Number.isFinite(resultId) || resultId <= 0 ? "Thiếu mã kết quả." : null,
  );
  const [loading, setLoading] = useState(() =>
    Number.isFinite(resultId) && resultId > 0 ? true : false,
  );

  useEffect(() => {
    if (!Number.isFinite(resultId) || resultId <= 0) {
      return;
    }
    let mounted = true;
    async function load() {
      try {
        const fetched = await getScreeningResult(resultId);
        if (!mounted) return;
        setResult(fetched);
        try {
          const types = await listScreeningTypes();
          const found = types.find((item: ScreeningType) => item.code === code);
          if (found) setTypeName(found.name);
        } catch {
          // ignore type name
        }
      } catch (err: unknown) {
        if (mounted) setError(getApiErrorMessage(err, "Không tải được kết quả."));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [code, resultId]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6" aria-busy="true">
        <p className="text-sm text-stone-600">Đang tải kết quả...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <ScreeningResultCard
        score={result?.total_score ?? null}
        riskLevel={(result as ScreeningResult & { risk_level?: string })?.risk_level ?? null}
        typeName={typeName}
        attemptId={result?.attempt_id}
      />
      <div className="mt-4 flex gap-3">
        <Link href="/screening" className="flex-1">
          <Button variant="secondary" fullWidth>
            Danh sách bài
          </Button>
        </Link>
        <Link href="/screening/history" className="flex-1">
          <Button fullWidth>Lịch sử</Button>
        </Link>
      </div>
    </main>
  );
}
