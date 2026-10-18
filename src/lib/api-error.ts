import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
    if (error.response?.status === 409) {
      return "Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.";
    }
    if (error.code === "ECONNABORTED") {
      return "Hết thời gian chờ. Vui lòng thử lại.";
    }
    if (!error.response) {
      return "Không kết nối được máy chủ. Vui lòng thử lại.";
    }
  }
  return fallback;
}
