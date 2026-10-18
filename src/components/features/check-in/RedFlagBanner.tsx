import { Phone } from "lucide-react";

export function RedFlagBanner() {
  return (
    <div
      role="alert"
      className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900"
    >
      <p className="font-medium">
        Nếu bạn đang gặp khủng hoảng, hãy gọi hỗ trợ ngay. Đây không phải chẩn đoán.
      </p>
      <a
        href="tel:115"
        className="mt-2 inline-flex min-h-11 items-center gap-2 font-medium text-red-800 underline"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Gọi 115
      </a>
    </div>
  );
}
