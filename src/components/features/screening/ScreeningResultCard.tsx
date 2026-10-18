import Link from "next/link";

type Props = {
  score: number | null;
  riskLevel?: string | null;
  typeName?: string;
  attemptId?: number;
};

const LEVEL_LABEL: Record<string, string> = {
  LOW: "Thấp",
  MODERATE: "Trung bình",
  HIGH: "Cao",
  CRITICAL: "Khẩn cấp",
};

export function ScreeningResultCard({ score, riskLevel, typeName, attemptId }: Props) {
  const label = riskLevel ? LEVEL_LABEL[riskLevel] ?? riskLevel : null;
  const critical = riskLevel === "CRITICAL";

  return (
    <div className="rounded-md border border-stone-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-stone-900">
        Kết quả {typeName ?? "sàng lọc"}
      </h2>
      <p className="mt-2 text-sm text-stone-600">
        Tổng điểm:{" "}
        <span className="font-medium text-stone-900">{score ?? "--"}</span>
        {attemptId ? <span className="text-stone-500"> (lần #{attemptId})</span> : null}
      </p>
      {label ? (
        <p className="mt-3 rounded-md bg-stone-50 px-3 py-2 text-sm text-stone-800">
          Mức độ:{" "}
          <span className={critical ? "font-semibold text-red-700" : "font-medium"}>
            {label}
          </span>
        </p>
      ) : null}
      {critical ? (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm font-medium text-red-800">
            Cảnh báo: mức độ khẩn cấp. Vui lòng liên hệ bác sĩ hoặc 115 nếu cần hỗ trợ ngay.
          </p>
          <Link href="/dashboard" className="mt-2 inline-block text-sm font-medium text-red-800 underline">
            Quay về trang chính
          </Link>
        </div>
      ) : null}
      <p className="mt-4 text-xs leading-5 text-stone-500">
        Lưu ý: kết quả không thay thế chẩn đoán y khoa. Vui lòng tham khảo bác sĩ để được tư vấn.
      </p>
    </div>
  );
}
