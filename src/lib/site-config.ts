export const SITE_NAME = "Equilibra";
export const LANDING_TITLE = "Equilibra | Theo dõi cảm xúc & sàng lọc sức khỏe tâm thần";
export const LANDING_DESCRIPTION =
  "Ghi nhận tâm trạng, theo dõi căng thẳng và tìm hiểu các bài sàng lọc PHQ-9, GAD-7, PSS-10, AUDIT cùng Equilibra. Không thay thế chẩn đoán y khoa.";

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
