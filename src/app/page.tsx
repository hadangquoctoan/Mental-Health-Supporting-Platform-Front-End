import type { Metadata } from "next";
import { LandingPage } from "@/components/features/landing/LandingPage";
import "./landing.css";

export const metadata: Metadata = {
  title: "Equilibra | Chăm sóc sức khỏe tinh thần mỗi ngày",
  description:
    "Dành một chút thời gian để hiểu cảm xúc, ghi nhận tâm trạng và sàng lọc sức khỏe tinh thần cùng Equilibra. Kết quả sàng lọc không thay thế chẩn đoán y khoa.",
};

export default function Home() {
  return <LandingPage />;
}
