"use client";

import { useEffect, useState } from "react";
import { getPortfolioData } from "@/services/api";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header"; // Ensure this is imported
import NetWorthCard from "@/components/dashboard/NetWorthCard";
import HoldingsList from "@/components/holdings/HoldingsList";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import TransactionHistory from "@/components/holdings/TransactionHistory";
import PageSkeleton from "@/components/holdings/PageSkeleton";


export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const portfolioData = await getPortfolioData();
        setData(portfolioData);
      } catch (err) {
        console.error("Failed to load");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PageSkeleton />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row">
      <Sidebar user={data.user} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Properly integrated Header */}
        <Header />

        <div className="px-8 pb-12 flex flex-col gap-8">
          {/* Row 1: Net Worth & Asset Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
               <NetWorthCard netWorth={data.summary.calculatedNetWorth} percentageChange={data.summary.percentageChange} />
            </div>
            <div className="lg:col-span-1 bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6 flex flex-col justify-center">
              <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)] mb-4">Asset Allocation</h3>
              <AssetAllocation holdings={data.holdings} />
            </div>
          </div>

          {/* Row 2: Holdings & Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HoldingsList holdings={data.holdings} />
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)]">Recent Transactions</h3>
                <button className="text-[12px] font-medium text-[var(--color-trove-primary)]">View All</button>
              </div>
              <TransactionHistory transactions={data.transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}