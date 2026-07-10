"use client";

import { useEffect, useState } from "react";
import { getPortfolioData } from "@/services/api";
import Sidebar from "@/components/layout/Sidebar";
import MarketsSkeleton from "./MarketsSkeleton";
import ComingSoon from "@/components/dashboard/ComingSoon";
// Import your Coming Soon component (adjust the path if yours is located elsewhere)


export default function MarketsPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // We still fetch portfolio data to grab the user object for the Sidebar
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
      <MarketsSkeleton />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row">
      {/* Fallback to an empty string if user fails to load, preventing crashes */}
      <Sidebar user={user || { name: "" }} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        <div className="px-8 pb-12 pt-10 flex flex-col h-full justify-center items-center flex-1">
          
          {/* Renders your custom Coming Soon component right in the center of the page */}
          <ComingSoon pageName={""} />

        </div>
      </main>
    </div>
  );
}