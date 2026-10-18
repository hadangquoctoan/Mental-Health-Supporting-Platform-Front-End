export default function DoctorRejectedPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center p-6">
      <div className="rounded-lg border border-red-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-stone-900">
          Hồ sơ chưa được duyệt
        </h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Chứng chỉ hành nghề chưa được chấp nhận. Vui lòng liên hệ quản trị
          viên để được hướng dẫn bổ sung hồ sơ.
        </p>
      </div>
    </main>
  );
}
