export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // This wrapper ensures all auth pages have a consistent background
    // and layout structure.
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-trove-page-bg)]">
      <main className="w-full max-w-md">
        {children}
      </main>
    </div>
  );
}