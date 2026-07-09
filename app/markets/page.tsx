"use client";

import { useEffect, useState } from "react";
import { getPortfolioData } from "@/services/api";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import PageSkeleton from "@/components/holdings/PageSkeleton";
import MarketsSkeleton from "./MarketsSkeleton";

// Mock data to show off UI skills without modifying the assessment JSON
const marketIndices = [
  { name: "S&P 500", value: "5,432.10", change: "+1.24%", isPositive: true },
  { name: "NASDAQ", value: "17,890.50", change: "+1.56%", isPositive: true },
  { name: "Dow Jones", value: "38,765.40", change: "-0.32%", isPositive: false },
  { name: "Bitcoin (BTC)", value: "$64,230.00", change: "+2.10%", isPositive: true },
];

const trendingAssets = [
  { ticker: "NVDA", name: "NVIDIA Corp.", price: "$130.50", change: "+4.20%", isPositive: true, volume: "145.2M" },
  { ticker: "AAPL", name: "Apple Inc.", price: "$214.20", change: "+1.80%", isPositive: true, volume: "62.4M" },
  { ticker: "TSLA", name: "Tesla Inc.", price: "$182.40", change: "-2.10%", isPositive: false, volume: "88.1M" },
  { ticker: "AMD", name: "Advanced Micro Devices", price: "$158.90", change: "+3.50%", isPositive: true, volume: "54.7M" },
  { ticker: "AMZN", name: "Amazon.com Inc.", price: "$189.05", change: "-0.50%", isPositive: false, volume: "31.2M" },
];

export default function MarketsPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // We still fetch portfolio data just to grab the user object for the Sidebar
        const data = await getPortfolioData();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <MarketsSkeleton/>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row">
      {/* Fallback to an empty string if user fails to load, preventing crashes */}
      <Sidebar user={user || { name: "" }} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
       

        <div className="px-8 pb-12 pt-10 flex flex-col gap-8">
          
          {/* Page Header */}
          <div>
            <h1 className="text-[24px] font-bold text-[var(--color-trove-text-default)]">Market Overview</h1>
            <p className="text-[14px] text-[var(--color-trove-text-neutral)] mt-1">
              Track global indices, trending stocks, and market movements.
            </p>
          </div>

          {/* Section 1: Global Indices Grid */}
          <div>
            <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)] mb-4 flex items-center gap-2">
              <Activity size={18} className="text-[var(--color-trove-primary)]" />
              Global Indices
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketIndices.map((index) => (
                <div key={index.name} className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-5 hover:shadow-sm transition-shadow">
                  <p className="text-[12px] text-[var(--color-trove-text-neutral)] mb-1">{index.name}</p>
                  <p className="text-[18px] font-semibold text-[var(--color-trove-text-default)]">{index.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-[12px] font-medium ${index.isPositive ? 'text-[var(--color-trove-success)]' : 'text-[var(--color-trove-negative)]'}`}>
                    {index.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {index.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Trending Assets List */}
          <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)]">Trending Assets</h3>
              <button className="text-[12px] font-medium text-[var(--color-trove-primary)] hover:opacity-80 transition-opacity">
                View All Markets
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {trendingAssets.map((asset) => (
                <div key={asset.ticker} className="flex items-center justify-between p-3 hover:bg-[var(--color-trove-bg-default)] rounded-lg transition-colors border border-transparent hover:border-[var(--color-trove-border)] group">
                  
                  {/* Ticker & Name */}
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-trove-bg-default)] border border-[var(--color-trove-border)] flex items-center justify-center text-[var(--color-trove-text-default)] font-semibold text-[12px] group-hover:bg-white transition-colors">
                      {asset.ticker.substring(0, 2)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-[14px] font-bold text-[var(--color-trove-text-default)]">{asset.ticker}</h4>
                      <p className="text-[12px] text-[var(--color-trove-text-neutral)] truncate">{asset.name}</p>
                    </div>
                  </div>

                  {/* Volume (Hidden on mobile for cleaner UI) */}
                  <div className="hidden sm:flex flex-col items-end w-1/3 pr-8">
                    <span className="text-[12px] text-[var(--color-trove-text-neutral)] mb-0.5">Vol</span>
                    <span className="text-[14px] font-medium text-[var(--color-trove-text-default)]">{asset.volume}</span>
                  </div>

                  {/* Price & Change */}
                  <div className="flex flex-col items-end w-1/3">
                    <span className="text-[14px] font-bold text-[var(--color-trove-text-default)] mb-0.5">
                      {asset.price}
                    </span>
                    <span className={`text-[12px] font-bold flex items-center gap-1 ${asset.isPositive ? 'text-[var(--color-trove-success)]' : 'text-[var(--color-trove-negative)]'}`}>
                      {asset.change}
                    </span>
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