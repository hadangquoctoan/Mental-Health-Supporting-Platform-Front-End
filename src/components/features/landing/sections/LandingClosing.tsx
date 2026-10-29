import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LandingVideo } from "@/components/features/landing/LandingVideo";

export function LandingClosing() {
  return (
    <section className="landing-close" aria-labelledby="close-heading">
      <LandingVideo slot="closing" variant="background" />
      <div className="landing-close-overlay" aria-hidden="true" />
      <div className="landing-shell landing-close-content">
        <div>
          <h2 id="close-heading">Bắt đầu từ cảm xúc hôm nay.</h2>
          <p>Tạo tài khoản để ghi nhận tâm trạng và xem lại khi cần.</p>
        </div>
        <Link href="/register" className="landing-btn landing-btn-primary">
          Tạo tài khoản <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
