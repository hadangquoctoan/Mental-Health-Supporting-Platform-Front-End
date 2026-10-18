import Image from "next/image";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import { LandingLoading } from "@/components/features/landing/LandingLoading";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  HeartHandshake,
  History,
  NotebookPen,
} from "lucide-react";
import { LandingNav } from "@/components/features/landing/LandingNav";
import { LandingScrollEnhance } from "@/components/features/landing/LandingScrollEnhance";
import { SosBand } from "@/components/features/landing/SosBand";
import { TodayColumn } from "@/components/features/landing/TodayColumn";

const bodyFont = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-landing-body",
});

const displayFont = Lora({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-landing-display",
});

const SCREENS = [
  {
    code: "PHQ-9",
    name: "Nhận biết dấu hiệu trầm cảm",
    count: "9 câu hỏi",
    description:
      "Nhìn lại tâm trạng, giấc ngủ và những thay đổi trong sinh hoạt.",
  },
  {
    code: "GAD-7",
    name: "Hiểu mức độ lo âu",
    count: "7 câu hỏi",
    description:
      "Ghi nhận sự lo lắng và cảm giác bất an trong hai tuần gần đây.",
  },
  {
    code: "PSS-10",
    name: "Lắng nghe sự căng thẳng",
    count: "10 câu hỏi",
    description:
      "Tìm hiểu cách bạn cảm nhận và đối diện với áp lực trong cuộc sống.",
  },
  {
    code: "AUDIT",
    name: "Nhìn lại việc sử dụng rượu bia",
    count: "10 câu hỏi",
    description:
      "Nhận biết thói quen sử dụng rượu bia và ảnh hưởng đến sức khỏe.",
  },
];

const FAQS = [
  {
    question: "Tôi có cần được chẩn đoán trước khi sử dụng không?",
    answer:
      "Bạn có thể bắt đầu bằng việc ghi nhận tâm trạng và mức căng thẳng, dù đã từng đi khám hay chưa. Nếu các cảm xúc khó chịu kéo dài hoặc ảnh hưởng đến sinh hoạt, hãy trao đổi với bác sĩ hoặc chuyên gia sức khỏe tâm thần.",
  },
  {
    question: "Kết quả sàng lọc có phải là chẩn đoán không?",
    answer:
      "Không. Các bài sàng lọc giúp bạn nhận biết những dấu hiệu cần chú ý. Chẩn đoán và hướng điều trị cần được bác sĩ đánh giá dựa trên tình trạng cụ thể của bạn.",
  },
  {
    question: "Tôi bắt đầu theo dõi cảm xúc như thế nào?",
    answer:
      "Tạo tài khoản, đăng nhập và mở mục Check-in. Bạn có thể chọn tâm trạng, mức căng thẳng và ghi thêm điều mình muốn chia sẻ. Những lần ghi nhận sẽ xuất hiện trong lịch sử để bạn xem lại.",
  },
  {
    question: "Tôi có thể làm bài sàng lọc vào lúc khác không?",
    answer:
      "Có. Câu trả lời đang làm được lưu nháp trên trình duyệt để bạn tiếp tục khi sẵn sàng. Hãy dùng cùng thiết bị và trình duyệt; tránh xóa dữ liệu duyệt web nếu muốn giữ bản nháp.",
  },
];

export function LandingPage() {
  return (
    <div className={`landing-root ${bodyFont.variable} ${displayFont.variable}`}>
      <LandingLoading />
      <a className="landing-skip-link" href="#noi-dung">
        Đi đến nội dung chính
      </a>
      <LandingScrollEnhance />
      <LandingNav />
      <main id="noi-dung" tabIndex={-1}>
        <section
          className="landing-shell landing-hero"
          aria-labelledby="hero-heading"
        >
          <div className="landing-hero-content">
            <h1 id="hero-heading">Chăm sóc tinh thần, bắt đầu từ hôm nay.</h1>
            <p className="landing-hero-copy">
              Có những ngày, bạn chỉ cần một khoảng lặng để hiểu mình hơn. Ghi
              lại cảm xúc, nhận biết những thay đổi và từng bước chăm sóc sức
              khỏe tinh thần của bạn.
            </p>
            <div className="landing-hero-cta">
              <Link
                href="/register"
                className="landing-btn landing-btn-primary"
              >
                Bắt đầu cùng Equilibra{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <a href="#dong-hanh" className="landing-text-link">
                Tìm hiểu thêm <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <p className="landing-hero-note">
              Theo nhịp của bạn. Từng ngày một.
            </p>
            <div className="landing-hero-bottom">
              <HeartHandshake size={22} strokeWidth={1.5} aria-hidden="true" />
              <p>Chăm sóc tinh thần cũng là chăm sóc sức khỏe.</p>
            </div>
          </div>
          <div className="landing-hero-visual">
            <div className="landing-photo-wrap">
              <Image
                src="/images/landing-forest.webp"
                alt="Ánh nắng dịu xuyên qua những tán cây trong khu rừng xanh"
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 48vw, 560px"
                preload
                className="landing-hero-photo"
              />
              <p className="landing-photo-caption">
                Cho mình một chút thời gian.
              </p>
            </div>
            <TodayColumn />
          </div>
        </section>

        <section
          className="landing-companion"
          id="dong-hanh"
          aria-labelledby="companion-heading"
        >
          <div className="landing-shell companion-grid">
            <div className="companion-intro">
              <h2 id="companion-heading">Hiểu mình hơn, từ những điều nhỏ.</h2>
              <p className="landing-lede">
                Không phải lúc nào bạn cũng dễ gọi tên điều mình đang cảm thấy.
                Một vài phút nhìn lại mỗi ngày có thể là điểm bắt đầu.
              </p>
              <a href="#bat-dau" className="landing-text-link">
                Xem cách bắt đầu <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="companion-features">
              <article className="companion-feature">
                <NotebookPen size={27} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>Ghi lại điều bạn đang cảm thấy</h3>
                  <p>
                    Chọn tâm trạng, mức căng thẳng và viết vài dòng cho những
                    điều khó nói thành lời.
                  </p>
                </div>
              </article>
              <article className="companion-feature">
                <History size={27} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>Nhìn lại những ngày đã qua</h3>
                  <p>
                    Xem lịch sử cảm xúc để nhận ra thay đổi và có thêm thông tin
                    khi trao đổi với bác sĩ.
                  </p>
                </div>
              </article>
              <article className="companion-feature">
                <HeartHandshake
                  size={27}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3>Nhận biết khi bạn cần thêm hỗ trợ</h3>
                  <p>
                    Các bài sàng lọc giúp bạn chú ý đến những dấu hiệu của trầm
                    cảm, lo âu và căng thẳng.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="landing-shell landing-screen"
          id="sang-loc"
          aria-labelledby="screen-heading"
        >
          <div className="screen-intro">
            <h2 id="screen-heading">
              Một chút rõ ràng cho những cảm xúc khó gọi tên.
            </h2>
            <div>
              <p className="landing-lede">
                Bắt đầu với bài sàng lọc phù hợp với điều bạn đang quan tâm. Trả
                lời theo cảm nhận của mình, trong không gian và thời gian bạn
                thấy thoải mái.
              </p>
              <Link href="/login" className="landing-text-link">
                Đăng nhập để sàng lọc{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="screen-list">
            {SCREENS.map((screen) => (
              <Link
                key={screen.code}
                href="/login"
                className="screen-item"
                aria-label={`Đăng nhập để làm bài ${screen.code}: ${screen.name}`}
              >
                <div className="screen-code">
                  <span>{screen.code}</span>
                  <span>{screen.count}</span>
                </div>
                <h3>{screen.name}</h3>
                <p>{screen.description}</p>
                <ArrowUpRight
                  className="screen-arrow"
                  size={23}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
          <p className="screen-disclaimer">
            Sàng lọc giúp nhận biết dấu hiệu, không thay thế việc thăm khám và
            chẩn đoán của bác sĩ.
          </p>
        </section>

        <section
          className="landing-start"
          id="bat-dau"
          aria-labelledby="start-heading"
        >
          <div className="landing-shell start-grid">
            <div>
              <h2 id="start-heading">
                Bạn không cần biết hết mọi thứ để bắt đầu.
              </h2>
              <p className="landing-lede">
                Chỉ cần dành cho mình một chút thời gian. Equilibra giúp bạn ghi
                nhận từng ngày, theo cách đơn giản và dễ theo dõi.
              </p>
              <Link href="/register" className="landing-btn landing-btn-light">
                Tạo tài khoản <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <ol className="start-steps">
              <li>
                <span className="start-number" aria-hidden="true">
                  1
                </span>
                <div>
                  <h3>Tạo không gian của riêng bạn</h3>
                  <p>
                    Đăng ký tài khoản và thêm thông tin người thân có thể liên
                    hệ khi cần.
                  </p>
                </div>
              </li>
              <li>
                <span className="start-number" aria-hidden="true">
                  2
                </span>
                <div>
                  <h3>Dành một phút để nhìn lại</h3>
                  <p>
                    Ghi nhận tâm trạng và mức căng thẳng hôm nay. Viết thêm nếu
                    bạn muốn.
                  </p>
                </div>
              </li>
              <li>
                <span className="start-number" aria-hidden="true">
                  3
                </span>
                <div>
                  <h3>Tiếp tục khi bạn sẵn sàng</h3>
                  <p>
                    Xem lại lịch sử hoặc làm bài sàng lọc để hiểu thêm về điều
                    mình đang trải qua.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="landing-shell landing-faq"
          id="cau-hoi"
          aria-labelledby="faq-heading"
        >
          <div className="faq-intro">
            <h2 id="faq-heading">Có thể bạn đang băn khoăn.</h2>
            <p className="landing-lede">
              Một vài điều để bạn yên tâm trước khi bắt đầu.
            </p>
            <Link href="/terms" className="landing-text-link">
              Đọc điều khoản sử dụng{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="faq-list">
            {FAQS.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <SosBand />

        <section
          className="landing-shell landing-close"
          aria-labelledby="close-heading"
        >
          <div>
            <h2 id="close-heading">Dành cho mình một khoảng lặng.</h2>
            <p>Bắt đầu lắng nghe cảm xúc của bạn, hôm nay.</p>
          </div>
          <Link href="/register" className="landing-btn landing-btn-primary">
            Tạo tài khoản <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <footer className="landing-footer">
        <div className="landing-shell">
          <div className="landing-footer-top">
            <div>
              <Link href="/" className="landing-wordmark">
                Equilibra
                <span className="landing-brand-dot" aria-hidden="true" />
              </Link>
              <p>Cùng bạn chăm sóc sức khỏe tinh thần, từng ngày.</p>
            </div>
            <nav aria-label="Liên kết cuối trang">
              <Link href="/login">Đăng nhập</Link>
              <Link href="/register">Đăng ký</Link>
              <Link href="/terms">Điều khoản sử dụng</Link>
              <a href="tel:115">Cấp cứu 115</a>
            </nav>
          </div>
          <div className="landing-footer-bottom">
            <p>
              Nền tảng hỗ trợ theo dõi sức khỏe tâm thần. Không thay thế dịch vụ
              khám, chẩn đoán hoặc điều trị y khoa.
            </p>
            <p>Equilibra</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
