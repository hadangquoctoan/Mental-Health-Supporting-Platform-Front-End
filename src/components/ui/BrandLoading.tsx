import { LoaderCircle } from "lucide-react";

export function BrandLoading({ onContinue }: { onContinue?: () => void }) {
  return (
    <div className="equilibra-loading">
      <div className="equilibra-loading-content">
        <p className="equilibra-loading-brand">Equilibra</p>
        <div
          role="status"
          aria-live="polite"
          className="equilibra-loading-status"
        >
          <LoaderCircle
            className="equilibra-loading-spinner"
            size={28}
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <p>Đang chuẩn bị không gian của bạn...</p>
        </div>
        {onContinue && (
          <button type="button" onClick={onContinue}>
            Vào trang ngay
          </button>
        )}
      </div>
    </div>
  );
}
