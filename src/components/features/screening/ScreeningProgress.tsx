export function ScreeningProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
        Câu {Math.min(current, total)}/{total} - {percent}%
      </p>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label="Tiến trình làm bài"
      >
        <div
          className="h-full bg-teal-800 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
