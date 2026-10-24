import Image from "next/image";
import { Be_Vietnam_Pro } from "next/font/google";
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

const SCREENS = [
  {
    code: "PHQ-9",
    name: "Nhận biết dấu hiệu trầm cảm",
    count: "9 câu hỏi",
    description:
      "Nhìn lại tâm trạng, sự hứng thú, giấc ngủ và những thay đổi trong sinh hoạt trong 2 tuần qua.",
  },
  {
    code: "GAD-7",
    name: "Hiểu mức độ lo âu",
    count: "7 câu hỏi",
    description:
      "Ghi nhận tần suất lo lắng, bất an và khó thư giãn trong 2 tuần qua.",
  },
  {
    code: "PSS-10",
    name: "Đánh giá mức căng thẳng cảm nhận",
    count: "10 câu hỏi",
    description:
      "Nhìn lại cảm giác áp lực và khả năng kiểm soát những việc xảy ra trong tháng qua.",
  },
  {
    code: "AUDIT",
    name: "Nhìn lại việc sử dụng rượu bia",
    count: "10 câu hỏi",
    description:
      "Tìm hiểu mức sử dụng rượu bia và những ảnh hưởng có thể gặp đối với sức khỏe, sinh hoạt.",
  },
];

const FAQS = [
  {
    question: "Tôi chưa từng đi khám, có thể sử dụng không?",
    answer:
      "Có. Bạn có thể ghi nhận tâm trạng dù đã từng đi khám hay chưa. Nếu đang điều trị, hãy tiếp tục làm theo hướng dẫn của bác sĩ; Equilibra là công cụ hỗ trợ theo dõi.",
  },
  {
    question: "Kết quả sàng lọc có phải là chẩn đoán không?",
    answer:
      "Không. Điểm số giúp nhận biết dấu hiệu cần chú ý, không xác định bạn có bệnh hay không. Nếu triệu chứng kéo dài, nặng hơn hoặc ảnh hưởng đến sinh hoạt, hãy gặp bác sĩ, kể cả khi điểm sàng lọc thấp.",
  },
  {
    question: "Tôi bắt đầu theo dõi cảm xúc như thế nào?",
    answer:
      "Tạo tài khoản bệnh nhân, đăng nhập và mở mục Check-in. Chọn tâm trạng, mức căng thẳng và thêm ghi chú nếu muốn. Sau khi gửi thành công, bạn có thể xem lại trong lịch sử.",
  },
  {
    question: "Tôi có thể làm bài sàng lọc vào lúc khác không?",
    answer:
      "Có. Bài đang làm có thể lưu nháp trên trình duyệt để bạn tiếp tục. Hãy dùng cùng thiết bị, trình duyệt và tài khoản. Xóa dữ liệu duyệt web hoặc dùng chế độ riêng tư có thể làm mất bản nháp.",
  },
  {
    question: "Khi nào tôi nên tìm hỗ trợ trực tiếp?",
    answer:
      "Nếu cảm xúc khó chịu kéo dài hoặc ảnh hưởng đến ngủ, ăn uống, công việc và các mối quan hệ, hãy sắp xếp gặp bác sĩ hoặc chuyên gia sức khỏe tâm thần. Khi có nguy hiểm tức thời hoặc ý định làm hại bản thân, gọi cấp cứu 115 hoặc đến cơ sở y tế gần nhất và nhờ người bạn tin tưởng ở bên. Đừng chờ kết quả sàng lọc.",
  },
];

export function LandingPage() {
  return (
    <div className={`landing-root ${bodyFont.variable}`}>
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
            <h1 id="hero-heading">Hiểu cảm xúc, chăm sóc sức khỏe tinh thần.</h1>
            <p className="landing-hero-copy">
              Equilibra giúp bạn ghi lại tâm trạng, theo dõi mức căng thẳng và
              thực hiện các bài sàng lọc sức khỏe tâm thần. Có thêm thông tin
              để hiểu mình và trao đổi với bác sĩ khi cần.
            </p>
            <div className="landing-hero-cta">
              <Link
                href="/register"
                className="landing-btn landing-btn-primary"
              >
                Tạo tài khoản để bắt đầu{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
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
          <div className="landing-hero-visual">
            <div className="landing-photo-wrap">
              <Image
                src="/images/landing-forest.webp"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, (max-width: 1200px) 48vw, 560px"
                preload
                className="landing-hero-photo"
              />
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
              <h2 id="companion-heading">Theo dõi cảm xúc mỗi ngày có thể bắt đầu đơn giản.</h2>
              <p className="landing-lede">
                Khi buồn bã, lo lắng hoặc căng thẳng, bạn có thể khó nhớ mình
                đã cảm thấy thế nào trong những ngày trước. Việc ghi nhận giúp
                bạn có điều cụ thể để nhìn lại.
              </p>
              <a href="#bat-dau" className="landing-text-link">
                Xem cách bắt đầu <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="companion-features">
              <article className="companion-feature">
                <NotebookPen size={27} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>Ghi nhận tâm trạng và mức căng thẳng</h3>
                  <p>
                    Chọn cảm xúc phù hợp với hôm nay, đánh giá mức căng thẳng
                    và thêm ghi chú nếu bạn muốn. Không cần viết dài.
                  </p>
                </div>
              </article>
              <article className="companion-feature">
                <History size={27} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>Xem lại lịch sử cảm xúc</h3>
                  <p>
                    Đọc lại những lần ghi nhận để theo dõi thay đổi theo thời
                    gian. Bạn có thể dùng thông tin này khi trao đổi với bác sĩ.
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
                  <h3>Tìm hiểu các dấu hiệu cần chú ý</h3>
                  <p>
                    Các bộ câu hỏi về trầm cảm, lo âu, căng thẳng và sử dụng
                    rượu bia giúp bạn có thêm thông tin về tình trạng của mình.
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
              Sàng lọc sức khỏe tâm thần: hiểu kết quả, biết giới hạn.
            </h2>
            <div>
              <p className="landing-lede">
                Sàng lọc là trả lời một bộ câu hỏi để nhận biết dấu hiệu cần
                chú ý. Chọn chủ đề bạn quan tâm và trả lời theo hướng dẫn của
                từng bài; kết quả là thông tin tham khảo để trao đổi với bác sĩ.
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
                Bắt đầu theo dõi trong 3 bước.
              </h2>
              <p className="landing-lede">
                Bạn có thể bắt đầu bằng việc ghi nhận cảm xúc hôm nay.
                Không cần làm tất cả bài sàng lọc trong một lần.
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
                  <h3>Tạo tài khoản bệnh nhân</h3>
                  <p>
                    Điền thông tin đăng ký và thêm người thân có thể liên hệ
                    khi cần. Sau đó đăng nhập để sử dụng.
                  </p>
                </div>
              </li>
              <li>
                <span className="start-number" aria-hidden="true">
                  2
                </span>
                <div>
                  <h3>Ghi nhận cảm xúc hôm nay</h3>
                  <p>
                    Mở mục Check-in để chọn tâm trạng, mức căng thẳng và
                    thêm ghi chú. Kiểm tra thông báo gửi thành công.
                  </p>
                </div>
              </li>
              <li>
                <span className="start-number" aria-hidden="true">
                  3
                </span>
                <div>
                  <h3>Xem lại và tiếp tục theo dõi</h3>
                  <p>
                    Mở lịch sử để xem những lần ghi nhận trước. Khi sẵn sàng,
                    chọn bài sàng lọc phù hợp với điều bạn đang quan tâm.
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
            <h2 id="faq-heading">Câu hỏi thường gặp về Equilibra.</h2>
            <p className="landing-lede">
              Cách sử dụng, ý nghĩa kết quả và khi nào nên tìm hỗ trợ.
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
            <h2 id="close-heading">Bắt đầu từ cảm xúc hôm nay.</h2>
            <p>Tạo tài khoản để ghi nhận tâm trạng và xem lại khi cần.</p>
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
