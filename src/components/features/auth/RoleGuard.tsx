"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import type { UserRole } from "@/types/user";

type RoleGuardProps = {
  children: ReactNode;
  allow: UserRole[];
  requireApprovedDoctor?: boolean;
};

function RoleGuardInner({
  children,
  allow,
  requireApprovedDoctor = false,
}: RoleGuardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preview = searchParams.get("preview") === "1";
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (preview) return;
    if (!isHydrated) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!allow.includes(user.role)) {
      router.replace("/login");
      return;
    }
    if (user.role === "DOCTOR") {
      const status = user.doctor_profile?.approval_status ?? "PENDING";
      if (requireApprovedDoctor && status !== "APPROVED") {
        router.replace(
          status === "REJECTED" ? "/doctor/rejected" : "/doctor/pending-approval",
        );
      }
    }
  }, [allow, isHydrated, preview, requireApprovedDoctor, router, user]);

  if (preview) {
    return <>{children}</>;
  }

  if (!isHydrated || !user) {
    return (
      <p className="p-6 text-sm text-stone-600" role="status">
        Đang tải phiên làm việc...
      </p>
    );
  }

  return <>{children}</>;
}

export function RoleGuard(props: RoleGuardProps) {
  return (
    <Suspense
      fallback={
        <p className="p-6 text-sm text-stone-600" role="status">
          Đang tải phiên làm việc...
        </p>
      }
    >
      <RoleGuardInner {...props} />
    </Suspense>
  );
}
