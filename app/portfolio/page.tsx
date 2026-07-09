"use client";

import { useEffect, useState } from "react";
import { getPortfolioData } from "@/services/api";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import HoldingsList from "@/components/holdings/HoldingsList";
import PageSkeleton from "@/components/holdings/PageSkeleton";
import PortfolioSkeleton from "./PortfolioSkeleton";

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const portfolioData = await getPortfolioData();
        setData(portfolioData);
      } catch (err) {
        console.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PortfolioSkeleton/>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row">
      <Sidebar user={data.user} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        <Header />

        <div className="px-8 pb-12 flex flex-col gap-6">
          
          {/* Page Header */}
          <div>
            <h1 className="text-[24px] font-bold text-[var(--color-trove-text-default)]">Portfolio Management</h1>
            <p className="text-[14px] text-[var(--color-trove-text-neutral)] mt-1">
              Review your current asset allocations, positions, and performance.
            </p>
          </div>

          {/* Holdings Container */}
          <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-6">
            <HoldingsList holdings={data.holdings} />
          </div>

        </div>
      </main>
    </div>
  );
}