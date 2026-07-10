"use client";

import { useEffect, useState } from "react";
import { getPortfolioData } from "@/services/api";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import NetWorthCard from "@/components/dashboard/NetWorthCard";
import HoldingsList from "@/components/holdings/HoldingsList";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import TransactionHistory from "@/components/holdings/TransactionHistory";
import PageSkeleton from "@/components/holdings/PageSkeleton";
import AccountList from "@/components/dashboard/AccountList"; 

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 2. Add state to manage the active tab
  const [activeTab, setActiveTab] = useState<"stocks" | "orders">("stocks");

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
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row">
      <Sidebar user={data.user} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        <Header />

        <div className="px-8 pb-12 pt-6 flex flex-col gap-8">
          
          {/* Row 1: Net Worth & Asset Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
               <NetWorthCard 
                 netWorth={data.summary.calculatedNetWorth} 
                 percentageChange={data.summary.percentageChange} 
               />
            </div>
            <div className="lg:col-span-1 bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6 flex flex-col justify-center">
              <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)] mb-4">Asset Allocation</h3>
              <AssetAllocation holdings={data.holdings} />
            </div>
          </div>

          {/* Row 2: The Derived Account List */}
          <div>
             {/* Passes the grouped sector data to the middle row */}
            <AccountList accounts={data.accounts} />
          </div>

          {/* Row 3: Holdings & Transactions (Tabbed UI) */}
          <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden shadow-sm">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-[var(--color-trove-border)]">
              <button 
                onClick={() => setActiveTab("stocks")}
                className={`flex-1 py-4 text-[14px] font-semibold transition-colors ${
                  activeTab === "stocks" 
                    ? "text-[var(--color-trove-primary)] border-b-2 border-[var(--color-trove-primary)] bg-[var(--color-trove-primary-light)]/20" 
                    : "text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)]"
                }`}
              >
                Stocks
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex-1 py-4 text-[14px] font-semibold transition-colors ${
                  activeTab === "orders" 
                    ? "text-[var(--color-trove-primary)] border-b-2 border-[var(--color-trove-primary)] bg-[var(--color-trove-primary-light)]/20" 
                    : "text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)]"
                }`}
              >
                Orders
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="p-6">
              {activeTab === "stocks" ? (
                <HoldingsList holdings={data.holdings} />
              ) : (
                <TransactionHistory transactions={data.transactions} />
              )}
            </div>
            
          </div>
          
        </div>
      </main>
    </div>
  );
}