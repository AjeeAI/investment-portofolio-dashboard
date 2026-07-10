"use client";

import { useMemo } from "react";

interface Holding {
  sector: string;
  shares: number;
  currentPrice: number;
}

interface AssetAllocationProps {
  holdings: Holding[];
}

/**
 * Mapping of sector identifiers to Trove design system color tokens.
 */
const SECTOR_COLORS: Record<string, string> = {
  "Technology": "var(--color-trove-primary)",
  "Automotive": "#2E90FA",
  "Healthcare": "#98A2B3",
  "Finance": "#475467",
  "Other": "#E4E7EC",
};

/**
 * Renders a horizontal stacked bar chart and legend for portfolio sector allocation.
 * Uses useMemo to derive percentage distribution from raw holding data.
 */
export default function AssetAllocation({ holdings = [] }: AssetAllocationProps) {
  
  const allocationData = useMemo(() => {
    if (!holdings || holdings.length === 0) return [];

    let totalValue = 0;
    const sectorMap: Record<string, number> = {};

    // Aggregate values by sector and compute total portfolio value
    holdings.forEach((holding) => {
      const holdingValue = holding.shares * holding.currentPrice;
      totalValue += holdingValue;
      
      if (sectorMap[holding.sector]) {
        sectorMap[holding.sector] += holdingValue;
      } else {
        sectorMap[holding.sector] = holdingValue;
      }
    });

    // Normalize sector totals to percentage-based format for UI rendering
    const result = Object.keys(sectorMap).map((sector) => {
      const value = sectorMap[sector];
      const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
      
      return {
        name: sector,
        value: Number(percentage.toFixed(1)), 
        color: SECTOR_COLORS[sector] || SECTOR_COLORS["Other"] 
      };
    });

    // Sort by value descending to prioritize visual prominence of largest holdings
    return result.sort((a, b) => b.value - a.value);
  }, [holdings]);

  if (allocationData.length === 0) {
    return <div className="text-[12px] text-[var(--color-trove-text-neutral)] mt-6">No allocation data available.</div>;
  }

  return (
    <div className="flex flex-col w-full gap-8 mt-6">
      
      {/* Visual representation of allocation distribution */}
      <div className="flex w-full h-3 rounded-full overflow-hidden bg-[var(--color-trove-bg-default)]">
        {allocationData.map((item) => (
          <div 
            key={item.name} 
            style={{ width: `${item.value}%`, backgroundColor: item.color }}
            title={`${item.name}: ${item.value}%`} 
          />
        ))}
      </div>

      {/* Legend identifying sector colors and relative percentages */}
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