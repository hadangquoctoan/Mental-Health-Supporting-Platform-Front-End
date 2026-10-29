import Link from "next/link";

export function LandingFooter() {
  return (
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
  );
}
