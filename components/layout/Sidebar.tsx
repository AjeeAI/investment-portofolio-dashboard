"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  PieChart, 
  ArrowRightLeft, 
  TrendingUp, 
  Settings,
  Menu,
  X,
  LogOut,
  ChevronUp
} from "lucide-react";

interface User {
  name: string;
}

interface SidebarProps {
  user: User;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleLogout = () => {
    router.push("/");
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <div className="md:hidden w-full bg-[var(--color-trove-card-surface)] border-b border-[var(--color-trove-border)] p-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="font-bold text-[20px] text-[var(--color-trove-primary)] tracking-tight">Trove</h1>
        <button onClick={() => setIsOpen(true)}><Menu size={24} /></button>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[240px] bg-[var(--color-trove-card-surface)] border-r border-[var(--color-trove-border)] flex flex-col justify-between h-screen transition-transform duration-300 ease-in-out
        md:sticky md:top-0 md:translate-x-0 md:flex
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        <div>
          <div className="p-8 flex items-center justify-between">
            <h1 className="font-bold text-[20px] text-[var(--color-trove-primary)] tracking-tight">Trove</h1>
            <button onClick={() => setIsOpen(false)} className="md:hidden"><X size={20} /></button>
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
                    isActive ? "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]" : "text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)]"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-[var(--color-trove-border)] relative">
          
          {/* Dropdown Menu (Positioned to appear above the trigger) */}
          {isDropdownOpen && (
            <div className="absolute bottom-32 left-6 right-6 bg-[var(--color-trove-card-surface)] rounded-xl shadow-lg border border-[var(--color-trove-border)] p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-[14px] text-[var(--color-trove-negative)] hover:bg-[var(--color-trove-negative)]/5 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4">
            
            {/* Profile Trigger (Top) */}
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-[var(--color-trove-bg-default)] transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-[var(--color-trove-primary)] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {userInitial}
                </div>
                <div className="overflow-hidden text-left">
                  <p className="text-[14px] font-semibold text-[var(--color-trove-text-default)] truncate">{user?.name || "User"}</p>
                  <p className="text-[12px] text-[var(--color-trove-text-neutral)]">Premium Member</p>
                </div>
              </div>
              <ChevronUp size={16} className={`text-[var(--color-trove-text-neutral)] transition-transform ${isDropdownOpen ? '' : 'rotate-180'}`} />
            </button>

            {/* Add Funds (Bottom) */}
            <button className="w-full py-3 bg-[var(--color-trove-primary)] text-white text-[14px] font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Add Funds
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}