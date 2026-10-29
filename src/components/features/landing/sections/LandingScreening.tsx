import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LandingVideo } from "@/components/features/landing/LandingVideo";

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

export function LandingScreening() {
  return (
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
            Sàng lọc là trả lời một bộ câu hỏi để nhận biết dấu hiệu cần chú ý.
            Chọn chủ đề bạn quan tâm và trả lời theo hướng dẫn của từng bài; kết
            quả là thông tin tham khảo để trao đổi với bác sĩ.
          </p>
          <Link href="/login" className="landing-text-link">
            Đăng nhập để sàng lọc{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <LandingVideo slot="screening" className="screening-media" />
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
        Sàng lọc giúp nhận biết dấu hiệu, không thay thế việc thăm khám và chẩn
        đoán của bác sĩ.
      </p>
    </section>
  );
}
