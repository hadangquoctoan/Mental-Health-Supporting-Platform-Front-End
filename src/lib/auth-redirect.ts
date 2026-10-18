export function getPostLoginPath(user: {
  role: string;
  doctor_profile?: { approval_status?: string } | null;
}): string {
  if (user.role === "ADMIN") return "/admin";
  if (user.role === "DOCTOR") {
    const status = user.doctor_profile?.approval_status ?? "PENDING";
    if (status === "APPROVED") return "/doctor/dashboard";
    if (status === "REJECTED") return "/doctor/rejected";
    return "/doctor/pending-approval";
  }
  return "/dashboard";
}
