"use client";

import { useMemo } from "react";

// 1. Define the expected shape of the data
interface Holding {
  sector: string;
  shares: number;
  currentPrice: number;
}

interface AssetAllocationProps {
  holdings: Holding[];
}

// 2. Map specific sectors to the Trove color palette
const SECTOR_COLORS: Record<string, string> = {
  "Technology": "var(--color-trove-primary)", // Primary Green
  "Automotive": "#2E90FA", // Blue
  "Healthcare": "#98A2B3", // Light Gray
  "Finance": "#475467",    // Dark Gray
  "Other": "#E4E7EC",      // Fallback
};

export default function AssetAllocation({ holdings = [] }: AssetAllocationProps) {
  
  // 3. Dynamically calculate the allocations whenever holdings change
  const allocationData = useMemo(() => {
    if (!holdings || holdings.length === 0) return [];

    let totalValue = 0;
    const sectorMap: Record<string, number> = {};

    // Group holdings by sector and calculate their total dollar value
    holdings.forEach((holding) => {
      const holdingValue = holding.shares * holding.currentPrice;
      totalValue += holdingValue;
      
      if (sectorMap[holding.sector]) {
        sectorMap[holding.sector] += holdingValue;
      } else {
        sectorMap[holding.sector] = holdingValue;
      }
    });

    // Convert the dollar values into percentages
    const result = Object.keys(sectorMap).map((sector) => {
      const value = sectorMap[sector];
      const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
      
      return {
        name: sector,
        // Round to 1 decimal place to keep the UI clean
        value: Number(percentage.toFixed(1)), 
        // Assign the strict color, or fallback to 'Other'
        color: SECTOR_COLORS[sector] || SECTOR_COLORS["Other"] 
      };
    });

    // Sort so the largest sectors appear first in the bar and legend
    return result.sort((a, b) => b.value - a.value);
  }, [holdings]);

  if (allocationData.length === 0) {
    return <div className="text-[12px] text-[var(--color-trove-text-neutral)] mt-6">No allocation data available.</div>;
  }

  return (
    <div className="flex flex-col w-full gap-8 mt-6">
      
      {/* CSS-Only Stacked Bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden bg-[var(--color-trove-bg-default)]">
        {allocationData.map((item) => (
          <div 
            key={item.name} 
            style={{ width: `${item.value}%`, backgroundColor: item.color }}
            title={`${item.name}: ${item.value}%`} 
          />
        ))}
      </div>

      {/* Custom 2x2 Legend */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-2">
        {allocationData.map((item) => (
          <div key={item.name} className="flex items-start gap-2 min-w-0">
            <span 
              className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-[var(--color-trove-text-neutral)] truncate w-full mb-0.5">
                {item.name}
              </span>
              <span className="text-[14px] font-semibold text-[var(--color-trove-text-default)]">
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}