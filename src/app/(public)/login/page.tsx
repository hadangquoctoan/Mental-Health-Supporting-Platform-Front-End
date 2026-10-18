import { LoginForm } from "@/components/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="mt-4 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Đăng nhập</h1>
        <p className="mt-1 text-sm text-stone-600">
          Dùng số điện thoại và mật khẩu đã đăng ký.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
