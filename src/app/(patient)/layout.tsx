import { RoleGuard } from "@/components/features/auth/RoleGuard";

export const instant = false;

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allow={["PATIENT"]}>{children}</RoleGuard>;
}
