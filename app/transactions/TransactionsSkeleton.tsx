export default function TransactionsSkeleton() {
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

      {/* 3. Main Transactions Content Skeleton */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        
        {/* Header Skeleton */}
        <div className="h-[80px] px-8 border-b border-[var(--color-trove-border)] flex items-center justify-between">
           <div className="w-64 h-10 bg-[var(--color-trove-bg-default)] rounded-xl animate-pulse hidden md:block"></div>
           <div className="w-10 h-10 bg-[var(--color-trove-border)] rounded-full animate-pulse ml-auto"></div>
        </div>

        <div className="px-8 pb-12 pt-8 flex flex-col gap-6">
          
          {/* Page Header Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="w-56 h-8 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
            <div className="w-96 h-4 bg-[var(--color-trove-border)] rounded animate-pulse max-w-full"></div>
          </div>

          {/* Transactions Container Skeleton */}
          <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6 shadow-sm">
            <div className="flex flex-col">
              
              {/* Simulated Tabs/Filters */}
              <div className="flex gap-4 mb-6 border-b border-[var(--color-trove-border)] pb-4">
                <div className="h-6 w-16 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
              </div>

              {/* Transaction List Rows */}
              <div className="flex flex-col">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-[var(--color-trove-border)] last:border-0">
                    
                    {/* Left: Icon & Description */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-trove-bg-default)] shrink-0 animate-pulse"></div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                        <div className="h-3 w-20 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                      </div>
                    </div>

                    {/* Right: Amount & Status */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="h-4 w-24 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                      <div className="h-3 w-16 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}