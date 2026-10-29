import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LandingVideo } from "@/components/features/landing/LandingVideo";

export function LandingStart() {
  return (
    <section
      className="landing-start"
      id="bat-dau"
      aria-labelledby="start-heading"
    >
      <div className="landing-shell start-grid">
        <div className="start-intro">
          <h2 id="start-heading">Bắt đầu theo dõi trong 3 bước.</h2>
          <p className="landing-lede">
            Bạn có thể bắt đầu bằng việc ghi nhận cảm xúc hôm nay. Không cần làm
            tất cả bài sàng lọc trong một lần.
          </p>
          <Link href="/register" className="landing-btn landing-btn-light">
            Tạo tài khoản <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <LandingVideo slot="getting-started" className="start-media" />
        <ol className="start-steps">
          <li>
            <span className="start-number" aria-hidden="true">
              1
            </span>
            <div>
              <h3>Tạo tài khoản bệnh nhân</h3>
              <p>
                Điền thông tin đăng ký và thêm người thân có thể liên hệ khi cần.
                Sau đó đăng nhập để sử dụng.
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
                Mở mục Check-in để chọn tâm trạng, mức căng thẳng và thêm ghi
                chú. Kiểm tra thông báo gửi thành công.
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
                Mở lịch sử để xem những lần ghi nhận trước. Khi sẵn sàng, chọn
                bài sàng lọc phù hợp với điều bạn đang quan tâm.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
