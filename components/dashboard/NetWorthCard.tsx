"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/utils/formatters";

interface NetWorthCardProps {
  netWorth?: number;
  percentageChange?: number;
}

export default function NetWorthCard({ netWorth = 0, percentageChange = 0 }: NetWorthCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  // Dynamically generate the chart data so the FINAL point matches your actual JSON balance
  const chartData = useMemo(() => {
    // Failsafe: return a flat line if netWorth hasn't loaded yet
    if (!netWorth) {
      return [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }];
    }
    
    return [
      { value: netWorth * 0.65 }, // Simulate historical dips and peaks based on current value
      { value: netWorth * 0.62 }, 
      { value: netWorth * 0.72 }, 
      { value: netWorth * 0.68 }, 
      { value: netWorth * 0.85 }, 
      { value: netWorth * 0.81 }, 
      { value: netWorth } // The real current balance is the final dot on the graph
    ];
  }, [netWorth]);

  const formattedNetWorth = formatCurrency(netWorth);

  // Determine positive/negative styling for the change indicator
  const safePercentage = percentageChange || 0;
  const isPositive = safePercentage >= 0;
  
  const changeColorClass = isPositive 
    ? "text-[var(--color-trove-success, #10AE17)]" 
    : "text-[var(--color-trove-negative, #BF221C)]";
    
  const changeSign = isPositive ? "+" : "";

  return (
    <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
      
      {/* Top Header & Timeframe Filters */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-medium text-[var(--color-trove-text-neutral)] flex items-center gap-2">
          Total Net Worth
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="focus:outline-none hover:opacity-70 transition-opacity"
            aria-label="Toggle balance visibility"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showBalance ? (
                <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>
              ) : (
                <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></>
              )}
            </svg>
          </button>
        </h2>
        
        <div className="flex gap-2 text-[11px] font-medium">
          <span className="px-2 py-1 bg-[var(--color-trove-primary-light, #E6EFEF)] text-[var(--color-trove-primary, #005C4B)] rounded">1D</span>
          <span className="px-2 py-1 text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)] rounded cursor-pointer transition-colors">1W</span>
          <span className="px-2 py-1 text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)] rounded cursor-pointer transition-colors">1M</span>
          <span className="px-2 py-1 text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)] rounded cursor-pointer transition-colors">ALL</span>
        </div>
      </div>

      {/* Values */}
      <div className="flex items-baseline gap-3">
        <span className="text-[26px] md:text-[32px] font-semibold text-[var(--color-trove-text-default)]">
          {showBalance ? formattedNetWorth : "*******"}
        </span>
        
        {showBalance && (
          <span className={`text-[14px] font-medium flex items-center ${changeColorClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mr-1 ${!isPositive && "rotate-180"}`}>
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
            {changeSign}{Math.abs(safePercentage).toFixed(1)}%
          </span>
        )}
      </div>

      {/* Recharts Area Chart for Trendline */}
      <div className="flex-1 w-full mt-6 -mx-2 h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-trove-primary, #005C4B)" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="var(--color-trove-primary, #005C4B)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-trove-primary, #005C4B)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}