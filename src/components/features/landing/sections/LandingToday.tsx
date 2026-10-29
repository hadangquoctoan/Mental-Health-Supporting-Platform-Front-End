import { TodayColumn } from "@/components/features/landing/TodayColumn";

export function LandingToday() {
  return (
    <section className="landing-today" aria-label="Bản thử ghi nhận cảm xúc">
      <div className="landing-shell">
        <TodayColumn />
      </div>
    </section>
  );
}
