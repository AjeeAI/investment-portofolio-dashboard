"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PieChart, 
  ArrowRightLeft, 
  TrendingUp, 
  Settings,
  Menu,
  X
} from "lucide-react";

interface User {
  name: string;
}

interface SidebarProps {
  user: User;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Automatically close the mobile sidebar when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Portfolio", href: "/portfolio", icon: PieChart },
    { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
    { name: "Markets", href: "/markets", icon: TrendingUp },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      {/* 1. Mobile Top Navigation Bar (Hidden on Desktop) */}
      <div className="md:hidden w-full bg-[var(--color-trove-card-surface)] border-b border-[var(--color-trove-border)] p-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="font-bold text-[20px] text-[var(--color-trove-primary)] tracking-tight">Trove</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-[var(--color-trove-text-default)] hover:text-[var(--color-trove-primary)] transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 2. Dark Backdrop Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. The Sidebar Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[240px] bg-[var(--color-trove-card-surface)] border-r border-[var(--color-trove-border)] flex flex-col justify-between h-screen transition-transform duration-300 ease-in-out
        md:sticky md:top-0 md:translate-x-0 md:flex
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* Top Section */}
        <div>
          <div className="p-8 flex items-center justify-between">
            <h1 className="font-bold text-[20px] text-[var(--color-trove-primary)] tracking-tight">Trove</h1>
            {/* Close Button (Mobile Only) */}
            <button onClick={() => setIsOpen(false)} className="md:hidden text-[var(--color-trove-text-neutral)] hover:text-[var(--color-trove-primary)]">
              <X size={20} />
            </button>
          </div>

          <nav className="px-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href; 
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[14px] transition-colors ${
                    isActive 
                      ? "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]" 
                      : "text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)]"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile & Add Funds */}
        <div className="p-6 border-t border-[var(--color-trove-border)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--color-trove-primary)] rounded-full overflow-hidden flex items-center justify-center text-white font-bold shrink-0">
              {userInitial}
            </div>
            <div className="overflow-hidden">
              <p className="text-[14px] font-semibold text-[var(--color-trove-text-default)] truncate">
                {user?.name || "Loading..."}
              </p>
              <p className="text-[12px] text-[var(--color-trove-text-neutral)]">Premium Member</p>
            </div>
          </div>
          
          <button className="w-full py-3 bg-[var(--color-trove-primary)] text-white text-[14px] font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Add Funds
          </button>
        </div>
      </aside>
    </>
  );
}