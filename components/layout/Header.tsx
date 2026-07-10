"use client";

import { Search, Bell, HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 md:px-8 py-6 bg-[var(--color-trove-page-bg)] gap-4">
      
      {/* Search Bar - Responsive width, properly rounded! */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-trove-text-neutral)] w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search stocks, crypto..." 
          className="w-full pl-11 pr-4 py-3 bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-full text-[14px] focus:outline-none focus:border-[var(--color-trove-primary)] shadow-sm"
        />
      </div>
      
      {/* Notifications & Help */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button className="p-2.5 bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-full shadow-sm hover:bg-[var(--color-trove-bg-default)] transition-colors">
          <Bell className="w-5 h-5 text-[var(--color-trove-text-neutral)]" />
        </button>
        <button className="p-2.5 bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-full shadow-sm hover:bg-[var(--color-trove-bg-default)] transition-colors hidden sm:block">
          <HelpCircle className="w-5 h-5 text-[var(--color-trove-text-neutral)]" />
        </button>
      </div>
    </header>
  );
}