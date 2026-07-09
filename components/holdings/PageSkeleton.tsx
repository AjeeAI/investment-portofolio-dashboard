export default function PageSkeleton() {
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

      {/* 3. Main Dashboard Content Skeleton */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        
        {/* Header Skeleton */}
        <div className="h-[80px] px-8 border-b border-[var(--color-trove-border)] flex items-center justify-between">
           <div className="w-64 h-10 bg-[var(--color-trove-bg-default)] rounded-xl animate-pulse hidden md:block"></div>
           <div className="w-10 h-10 bg-[var(--color-trove-border)] rounded-full animate-pulse ml-auto"></div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-8 flex flex-col gap-8 w-full">
          
          {/* Top Row: Net Worth & Asset Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Net Worth Card Skeleton */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6 min-h-[300px] flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-28 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-6 w-8 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <div className="h-10 w-48 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
              </div>
              <div className="flex-1 w-full mt-6 -mx-2 h-[120px] bg-[var(--color-trove-bg-default)] rounded-lg animate-pulse"></div>
            </div>

            {/* Asset Allocation Skeleton */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6 min-h-[300px] flex flex-col shadow-sm">
              <div className="h-5 w-32 bg-[var(--color-trove-border)] rounded animate-pulse mb-8 mt-1"></div>
              <div className="flex flex-col w-full gap-8 mt-6">
                {/* Bar */}
                <div className="w-full h-3 rounded-full bg-[var(--color-trove-bg-default)] animate-pulse"></div>
                {/* 2x2 Legend */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-trove-border)] mt-1 shrink-0 animate-pulse"></div>
                      <div className="flex flex-col gap-2 min-w-0 w-full">
                        <div className="h-3 w-20 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                        <div className="h-4 w-12 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Holdings List Skeleton */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Title & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="h-6 w-24 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
              <div className="h-10 w-full sm:w-64 bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-lg animate-pulse"></div>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-16 bg-[var(--color-trove-bg-default)] rounded-full animate-pulse"></div>
              ))}
            </div>

            {/* List Rows */}
            <div className="flex flex-col gap-3 mt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-4 flex items-center justify-between shadow-sm">
                  
                  {/* Left: Icon & Ticker */}
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-trove-bg-default)] shrink-0 animate-pulse"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-14 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                    </div>
                  </div>

                  {/* Middle: Shares */}
                  <div className="flex flex-col items-end gap-2 w-1/3 pr-2 sm:pr-8">
                    <div className="h-3 w-10 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                  </div>

                  {/* Right: Price & Gain */}
                  <div className="flex flex-col items-end gap-2 w-1/3">
                    <div className="h-4 w-20 bg-[var(--color-trove-border)] rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-[var(--color-trove-bg-default)] rounded animate-pulse"></div>
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