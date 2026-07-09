export default function SettingsSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row w-full">
      
      {/* Mobile Top Bar Skeleton */}
      <div className="md:hidden w-full bg-[var(--color-trove-card-surface)] border-b border-[var(--color-trove-border)] p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="w-20 h-7 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
      </div>

      {/* Desktop Sidebar Skeleton */}
      <aside className="hidden md:flex w-[240px] bg-[var(--color-trove-card-surface)] border-r border-[var(--color-trove-border)] flex-col justify-between h-screen sticky top-0 shrink-0">
        <div>
          <div className="p-8">
            <div className="w-24 h-7 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
          </div>
          <div className="px-4 flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-11 w-full bg-[var(--color-trove-bg-default)] rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-[var(--color-trove-border)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--color-trove-border)] rounded-full shrink-0 animate-pulse"></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 w-24 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-12 w-full bg-[var(--color-trove-bg-default)] rounded-xl animate-pulse"></div>
        </div>
      </aside>

      {/* Main Settings Content */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        <div className="px-8 pb-12 pt-10 flex flex-col gap-8 max-w-4xl">
          
          {/* Page Header Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="w-48 h-8 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
            <div className="w-96 h-4 bg-[var(--color-trove-border)] rounded animate-pulse max-w-full"></div>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Section 1: Personal Information Skeleton */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[var(--color-trove-border)] flex items-center gap-3">
                <div className="w-5 h-5 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                <div className="h-5 w-40 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
              </div>
              <div className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-20 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-[var(--color-trove-bg-default)] rounded-lg animate-pulse"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-24 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-[var(--color-trove-bg-default)] rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <div className="h-10 w-32 bg-[var(--color-trove-border)] rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Section 2: Notifications Skeleton */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[var(--color-trove-border)] flex items-center gap-3">
                <div className="w-5 h-5 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                <div className="h-5 w-28 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[var(--color-trove-bg-default)] rounded-lg border border-[var(--color-trove-border)]">
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-32 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                      <div className="h-3 w-64 bg-[var(--color-trove-border)] rounded animate-pulse max-w-full"></div>
                    </div>
                    <div className="h-6 w-11 bg-[var(--color-trove-border)] rounded-full animate-pulse shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 & 4: Single Row Actions (Security & Logout) Skeleton */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden shadow-sm">
                <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--color-trove-border)] rounded-full animate-pulse shrink-0"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-32 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                      <div className="h-3 w-56 bg-[var(--color-trove-border)] rounded animate-pulse max-w-full"></div>
                    </div>
                  </div>
                  <div className="h-10 w-36 bg-[var(--color-trove-bg-default)] rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </main>
    </div>
  );
}