import { Clock3 } from "lucide-react";

export default function DoctorPendingApprovalPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center p-6">
      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <Clock3 className="h-6 w-6 text-teal-800" aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-semibold text-stone-900">
          Chờ phê duyệt
        </h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Tài khoản đã được tạo. Quản trị viên sẽ xác minh chứng chỉ hành nghề
          trước khi bạn vào bảng điều khiển.
        </p>
        <p className="mt-4 text-sm text-stone-800">
          Trạng thái: PENDING
        </p>
      </div>
    </main>
  );
}
