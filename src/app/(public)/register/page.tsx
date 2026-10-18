import { RegisterStepper } from "@/components/features/auth/RegisterStepper";

export default function RegisterPage() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-stone-900">Đăng ký</h1>
      <RegisterStepper />
    </div>
  );
}
