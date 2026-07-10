"use client";

import { useState } from "react";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import { calculateGainLoss, calculatePercentageChange } from "@/utils/calculators";
import { SiApple, SiGoogle, SiTesla, SiNvidia, SiVisa } from "react-icons/si";
import { FaBriefcaseMedical, FaBuildingColumns, FaFilm, FaAmazon, FaPills } from "react-icons/fa6";

interface Holding {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

interface HoldingsListProps {
  holdings: Holding[];
}

/**
 * HoldingsList component renders a filterable list of user asset holdings.
 * Features include keyword-based search, sector filtering, and visual status 
 * indicators for gain/loss performance.
 */
export default function HoldingsList({ holdings }: HoldingsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSector, setActiveSector] = useState("All");

  // Derive unique sectors from data for the filter UI
  const sectors = ["All", ...Array.from(new Set(holdings.map((h) => h.sector)))];

  // Memoized filter logic based on text input and selected sector pill
  const filteredHoldings = holdings.filter((holding) => {
    const matchesSearch = 
      holding.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holding.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = activeSector === "All" || holding.sector === activeSector;

    return matchesSearch && matchesSector;
  });

  /**
   * Utility to map asset tickers to their respective brand icons.
   * Falls back to a text-based avatar if no specific icon is found.
   */
  const getIconForTicker = (ticker: string) => {
    switch (ticker) {
      case "AAPL":
        return <SiApple size={22} className="text-[var(--color-trove-primary)]" />;
      case "GOOGL":
        return <SiGoogle size={20} className="text-[var(--color-trove-text-default)]" />;
      case "TSLA":
        return <SiTesla size={20} className="text-[var(--color-trove-negative)]" />;
      case "NVDA":
        return <SiNvidia size={22} className="text-[var(--color-trove-success)]" />;
      case "AMZN":
        return <FaAmazon size={20} className="text-[var(--color-trove-text-default)]" />;
      case "V":
        return <SiVisa size={24} className="text-blue-700" />;
      case "PFE":
        return <FaPills size={22} className="text-blue-500" />;
      case "JNJ":
        return <FaBriefcaseMedical size={20} className="text-[var(--color-trove-primary)]" />;
      case "JPM":
        return <FaBuildingColumns size={20} className="text-[var(--color-trove-text-default)]" />;
      case "DIS":
        return <FaFilm size={20} className="text-purple-600" />;
      default:
        return <span className="text-[14px] font-semibold text-[var(--color-trove-text-neutral)]">{ticker.substring(0, 2)}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      
      {/* Header and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-[18px] font-bold text-[var(--color-trove-text-default)]">
          Holdings
        </h3>
        
        <div className="relative w-full sm:w-64">
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-trove-text-neutral)] w-4 h-4"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search stocks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-lg text-[14px] focus:outline-none focus:border-[var(--color-trove-primary)]"
          />
        </div>
      </div>

      {/* Sector Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setActiveSector(sector)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              activeSector === sector 
                ? "bg-[var(--color-trove-primary)] text-white" 
                : "bg-[var(--color-trove-bg-default)] text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-border)]"
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Holdings Listing */}
      <div className="flex flex-col gap-3 mt-2">
        {filteredHoldings.length > 0 ? (
          filteredHoldings.map((holding) => {
            // Calculate financial metrics for display
            const totalValue = holding.shares * holding.currentPrice;
            const gainLoss = calculateGainLoss(holding.currentPrice, holding.avgCost, holding.shares);
            const gainLossPercentage = calculatePercentageChange(holding.currentPrice, holding.avgCost);
            
            const isPositive = gainLoss >= 0;
            const colorClass = isPositive ? "text-[var(--color-trove-success)]" : "text-[var(--color-trove-negative)]";
            
            const formattedValue = formatCurrency(totalValue);
            const formattedGain = isPositive ? `+${formatCurrency(gainLoss)}` : formatCurrency(gainLoss);
            const formattedPercentage = isPositive ? `+${formatPercentage(gainLossPercentage)}` : formatPercentage(gainLossPercentage);

            // Handle edge case where market data is missing (currentPrice: 0)
            const isPriceUnavailable = holding.currentPrice === 0;

            return (
              <div key={holding.id} className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                
                <div className="flex items-center gap-4 w-1/3">
                  <div className="w-12 h-12 rounded-xl border border-[var(--color-trove-border)] flex items-center justify-center text-[var(--color-trove-text-neutral)] bg-white shadow-sm shrink-0">
                    {getIconForTicker(holding.ticker)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-[14px] font-bold text-[var(--color-trove-text-default)]">{holding.ticker}</h4>
                    <p className="text-[12px] text-[var(--color-trove-text-neutral)] truncate">{holding.name}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end w-1/3 pr-2 sm:pr-8">
                  <span className="text-[12px] text-[var(--color-trove-text-neutral)] mb-0.5">Shares</span>
                  <span className="text-[14px] font-bold text-[var(--color-trove-text-default)]">{holding.shares.toFixed(2)}</span>
                </div>

                <div className="flex flex-col items-end w-1/3">
                  {isPriceUnavailable ? (
                    <span className="text-[14px] font-medium text-[var(--color-trove-text-neutral)] italic">
                      Price unavailable
                    </span>
                  ) : (
                    <>
                      <span className="text-[14px] font-bold text-[var(--color-trove-text-default)] mb-0.5">
                        {formattedValue}
                      </span>
                      <span className={`text-[12px] font-bold tracking-tight ${colorClass}`}>
                        {formattedGain} ({formattedPercentage})
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-[14px] text-[var(--color-trove-text-neutral)] bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)]">
            No holdings found matching your criteria.
          </div>
        )}
      </div>

    </div>
  );
}