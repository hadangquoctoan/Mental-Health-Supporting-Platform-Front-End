import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { moodLabel, stressLabel } from "@/lib/check-in-preview";
import { formatTimestampDisplay } from "@/lib/date";
import type { CheckIn } from "@/types/check-in";

type Props = {
  today: CheckIn | null;
  loading?: boolean;
  previewHref: string;
  checkInHref: string;
};

export function TodayCheckInCard({
  today,
  loading,
  previewHref,
  checkInHref,
}: Props) {
  if (loading) {
    return (
      <div
        className="h-36 animate-pulse rounded-md border border-stone-200 bg-stone-100"
        aria-busy="true"
        aria-label="Đang tải check-in hôm nay"
      />
    );
  }

  return (
    <section className="rounded-md border border-stone-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-stone-900">
            <ClipboardCheck className="h-4 w-4 text-teal-800" aria-hidden />
            Check-in hôm nay
          </h2>
          {today ? (
            <p className="mt-2 text-sm text-stone-700">
              Tâm trạng: {moodLabel(today.mood)} · Stress:{" "}
              {stressLabel(today.stress_level)}
            </p>
          ) : (
            <p className="mt-2 text-sm text-stone-600">
              Chưa ghi nhận hôm nay. Một lần ngắn giúp bác sĩ theo dõi diễn biến.
            </p>
          )}
          {today ? (
            <p className="mt-1 text-xs text-stone-500">
              {formatTimestampDisplay(today.created_at)}
            </p>
          ) : null}
        </div>
        <Link href={today ? previewHref : checkInHref}>
          <Button variant={today ? "secondary" : "primary"}>
            {today ? "Xem lịch sử" : "Check-in"}
          </Button>
        </Link>
      </div>
    </section>
  );
}
