import { moodLabel, stressLabel } from "@/lib/check-in-preview";
import { formatTimestampDisplay } from "@/lib/date";
import type { CheckIn } from "@/types/check-in";

type Props = {
  items: CheckIn[];
  loading?: boolean;
  emptyText?: string;
};

export function CheckInHistoryList({
  items,
  loading,
  emptyText = "Chưa có check-in.",
}: Props) {
  if (loading) {
    return (
      <div className="space-y-2" aria-busy="true" aria-label="Đang tải lịch sử">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-md border border-stone-200 bg-stone-100"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="rounded-md border border-stone-200 bg-white p-4 text-sm text-stone-600">
        {emptyText}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-stone-200 overflow-hidden rounded-md border border-stone-200 bg-white">
      {items.map((item) => (
        <li key={item.id} className="px-4 py-3">
          <p className="text-sm font-medium text-stone-900">
            {moodLabel(item.mood)} · {stressLabel(item.stress_level)}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            {formatTimestampDisplay(item.created_at)}
          </p>
          {item.note ? (
            <p className="mt-2 line-clamp-2 text-sm text-stone-700">{item.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
