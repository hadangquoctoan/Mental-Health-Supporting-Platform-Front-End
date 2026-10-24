import type { Metadata } from "next";
import { AuthHydrator } from "@/components/features/auth/AuthHydrator";
import "./globals.css";

export const metadata: Metadata = {
  title: "Equilibra | Chăm sóc sức khỏe tinh thần",
  robots: { index: false, follow: false },
  description:
    "Theo dõi cảm xúc và sàng lọc sức khỏe tâm thần cùng Equilibra. Kết quả sàng lọc không thay thế chẩn đoán y khoa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col text-stone-900">
        <AuthHydrator />
        {children}
      </body>
    </html>
  );
}
