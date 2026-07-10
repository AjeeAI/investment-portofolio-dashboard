"use client";

import { useEffect, useState } from "react";
import { getPortfolioData } from "@/services/api";
import Sidebar from "@/components/layout/Sidebar";
import ComingSoon from "@/components/dashboard/ComingSoon"; // Reuse your existing component

export default function SettingsPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to load user data");
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row">
      <Sidebar user={user || { name: "" }} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        <div className="px-8 pb-12 pt-10 flex flex-col h-full justify-center items-center flex-1">
          
          <ComingSoon pageName="Account Settings" />

        </div>
      </main>
    </div>
  );
}