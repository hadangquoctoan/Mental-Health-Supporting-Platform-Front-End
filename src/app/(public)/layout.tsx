export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 items-start justify-center overflow-visible px-4 py-10">
      <div className="w-full max-w-md overflow-visible rounded-lg border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-800">
          Hỗ trợ sức khỏe tâm thần
        </p>
        {children}
      </div>
    </div>
  );
}
