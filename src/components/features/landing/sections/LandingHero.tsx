import Link from "next/link";
import { ArrowRight, ArrowUpRight, HeartHandshake } from "lucide-react";
import { LandingVideo } from "@/components/features/landing/LandingVideo";

export function LandingHero() {
  return (
    <section className="landing-hero" aria-labelledby="hero-heading">
      <LandingVideo slot="hero" variant="hero" />
      <div className="landing-hero-overlay" aria-hidden="true" />
      <div className="landing-shell landing-hero-content">
        <h1 id="hero-heading">Hiểu cảm xúc, chăm sóc tinh thần mỗi ngày.</h1>
        <p className="landing-hero-copy">
          Equilibra giúp bạn ghi lại tâm trạng, nhìn lại cảm xúc và tìm hiểu sức
          khỏe tinh thần qua các bài sàng lọc.
        </p>
        <div className="landing-hero-cta">
          <Link href="/register" className="landing-btn landing-btn-primary">
            Tạo tài khoản <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
          <a href="#dong-hanh" className="landing-text-link">
            Xem cách sử dụng <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <p className="landing-hero-note">
          Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
        </p>
        <div className="landing-hero-bottom">
          <HeartHandshake size={22} strokeWidth={1.5} aria-hidden="true" />
          <p>Sàng lọc không thay thế chẩn đoán hoặc điều trị của bác sĩ.</p>
        </div>
      </div>
    </section>
  );
}
