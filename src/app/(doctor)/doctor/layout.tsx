import { RoleGuard } from "@/components/features/auth/RoleGuard";

export const instant = false;

export default function DoctorSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allow={["DOCTOR"]}>{children}</RoleGuard>;
}
