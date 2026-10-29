import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { LandingVideo } from "@/components/features/landing/LandingVideo";

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

export function LandingFaq() {
  return (
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
          Đọc điều khoản sử dụng <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <LandingVideo slot="faq" className="faq-media" />
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
  );
}
