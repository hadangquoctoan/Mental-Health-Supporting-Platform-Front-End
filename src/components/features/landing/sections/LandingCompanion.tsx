import { ArrowRight } from "lucide-react";
import { LandingAnimatedIcon } from "@/components/features/landing/LandingAnimatedIcon";
import { LandingVideo } from "@/components/features/landing/LandingVideo";

export function LandingCompanion() {
  return (
    <section
      className="landing-companion"
      id="dong-hanh"
      aria-labelledby="companion-heading"
    >
      <div className="landing-shell companion-grid">
        <div className="companion-intro">
          <h2 id="companion-heading">
            Theo dõi cảm xúc mỗi ngày có thể bắt đầu đơn giản.
          </h2>
          <p className="landing-lede">
            Khi buồn bã, lo lắng hoặc căng thẳng, bạn có thể khó nhớ mình đã cảm
            thấy thế nào trong những ngày trước. Việc ghi nhận giúp bạn có điều
            cụ thể để nhìn lại.
          </p>
          <a href="#bat-dau" className="landing-text-link">
            Xem cách bắt đầu <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <LandingVideo slot="companion" className="companion-media" />
        <div className="companion-features">
          <article className="companion-feature">
            <LandingAnimatedIcon name="notebook" animation="draw" />
            <div>
              <h3>Ghi nhận tâm trạng và mức căng thẳng</h3>
              <p>
                Chọn cảm xúc phù hợp với hôm nay, đánh giá mức căng thẳng và thêm
                ghi chú nếu bạn muốn. Không cần viết dài.
              </p>
            </div>
          </article>
          <article className="companion-feature">
            <LandingAnimatedIcon name="history" animation="draw" />
            <div>
              <h3>Xem lại lịch sử cảm xúc</h3>
              <p>
                Đọc lại những lần ghi nhận để theo dõi thay đổi theo thời gian.
                Bạn có thể dùng thông tin này khi trao đổi với bác sĩ.
              </p>
            </div>
          </article>
          <article className="companion-feature">
            <LandingAnimatedIcon name="heart" animation="float" />
            <div>
              <h3>Tìm hiểu các dấu hiệu cần chú ý</h3>
              <p>
                Các bộ câu hỏi về trầm cảm, lo âu, căng thẳng và sử dụng rượu bia
                giúp bạn có thêm thông tin về tình trạng của mình.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
