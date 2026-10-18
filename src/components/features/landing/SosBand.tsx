import { Phone, TriangleAlert } from "lucide-react";

export function SosBand() {
  return (
    <section className="sos-band" id="sos" aria-labelledby="sos-heading">
      <div className="landing-shell sos-inner">
        <TriangleAlert
          className="sos-icon"
          size={28}
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <div>
          <h2 id="sos-heading">Bạn cần hỗ trợ ngay lúc này?</h2>
          <p>
            Nếu bạn đang gặp nguy hiểm hoặc có ý định làm hại bản thân, hãy gọi
            115 hoặc đến cơ sở y tế gần nhất. Nhờ một người bạn tin tưởng ở bên
            bạn.
          </p>
        </div>
        <a href="tel:115" className="landing-btn landing-btn-sos">
          <Phone size={18} aria-hidden="true" /> Gọi cấp cứu 115
        </a>
      </div>
    </section>
  );
}
