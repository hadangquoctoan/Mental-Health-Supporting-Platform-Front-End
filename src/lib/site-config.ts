export const SITE_NAME = "Equilibra";
export const LANDING_TITLE =
  "Equilibra | Hiểu cảm xúc, chăm sóc tinh thần mỗi ngày";
export const LANDING_DESCRIPTION =
  "Ghi lại tâm trạng, nhìn lại cảm xúc và tìm hiểu sức khỏe tinh thần qua các bài sàng lọc cùng Equilibra. Không thay thế chẩn đoán y khoa.";

export function getSiteUrl(): URL | null {
  const value = process.env.SITE_URL?.trim();
  if (!value) return null;

  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.hostname === "localhost" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("SITE_URL must be a public HTTPS origin without a path, credentials, query or fragment.");
  }
  return url;
}
