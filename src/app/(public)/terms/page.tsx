import Link from "next/link";

export default function TermsPage() {
  return (
    <article className="mt-4 flex flex-col gap-4 text-sm leading-6 text-stone-700">
      <h1 className="text-2xl font-semibold text-stone-900">Điều khoản sử dụng</h1>
      <p>
        Nền tảng hỗ trợ theo dõi kế hoạch điều trị, sàng lọc và liên hệ khẩn cấp.
        Kết quả trên hệ thống không thay thế chẩn đoán y khoa.
      </p>
      <p>
        Người dùng đồng ý cung cấp thông tin trung thực, bảo mật tài khoản, và
        cho phép hệ thống liên hệ người thân khi có sự kiện khẩn cấp.
      </p>
      <p>
        Dữ liệu sức khỏe được xử lý theo chính sách bảo mật. Người dùng có quyền
        yêu cầu xóa dữ liệu theo quy định pháp luật.
      </p>
      <Link href="/register" className="font-medium text-teal-800 hover:underline">
        Quay lại đăng ký
      </Link>
    </article>
  );
}
