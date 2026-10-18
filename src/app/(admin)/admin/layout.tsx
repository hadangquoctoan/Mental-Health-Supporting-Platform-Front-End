import { RoleGuard } from "@/components/features/auth/RoleGuard";

export const instant = false;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allow={["ADMIN"]}>{children}</RoleGuard>;
}
