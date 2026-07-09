export default function MarketsSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row w-full">
      
      {/* 1. Mobile Top Bar Skeleton */}
      <div className="md:hidden w-full bg-[var(--color-trove-card-surface)] border-b border-[var(--color-trove-border)] p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="w-20 h-7 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
      </div>

      {/* 2. Desktop Sidebar Skeleton */}
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

      {/* 3. Main Markets Content Skeleton */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        
        <div className="px-8 pb-12 pt-10 flex flex-col gap-8">
          
          {/* Page Header Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="w-48 h-8 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
            <div className="w-72 h-4 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
          </div>

          {/* Section 1: Global Indices Grid Skeleton */}
          <div>
            <div className="w-32 h-5 bg-[var(--color-trove-border)] rounded animate-pulse mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-5">
                  <div className="h-3 w-16 bg-[var(--color-trove-border)] rounded animate-pulse mb-2.5"></div>
                  <div className="h-6 w-24 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-[var(--color-trove-border)] rounded animate-pulse mt-3.5"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Trending Assets List Skeleton */}
          <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="w-32 h-5 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-transparent">
                  
                  {/* Ticker & Name */}
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-trove-bg-default)] border border-[var(--color-trove-border)] shrink-0 animate-pulse"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-12 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                    </div>
                  </div>

                  {/* Volume (Hidden on mobile) */}
                  <div className="hidden sm:flex flex-col items-end gap-2 w-1/3 pr-8">
                    <div className="h-3 w-8 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                    <div className="h-4 w-14 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                  </div>

                  {/* Price & Change */}
                  <div className="flex flex-col items-end gap-2 w-1/3">
                    <div className="h-4 w-16 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                    <div className="h-3 w-10 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}