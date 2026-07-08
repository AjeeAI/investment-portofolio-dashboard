"use client";

import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PieChart, 
  ArrowRightLeft, 
  TrendingUp, 
  Settings 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // Mapping items to match image_1ebeb0.png
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Portfolio", href: "/portfolio", icon: PieChart },
    { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
    { name: "Markets", href: "/markets", icon: TrendingUp },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-[240px] bg-[var(--color-trove-card-surface)] border-r border-[var(--color-trove-border)] flex flex-col justify-between h-screen sticky top-0 hidden md:flex">
      
      {/* Top Section */}
      <div>
        <div className="p-8">
          <h1 className="font-bold text-[20px] text-[var(--color-trove-primary)] tracking-tight">Trove</h1>
        </div>

        <nav className="px-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Matches wireframe active state logic
            const isActive = item.name === "Dashboard"; 
            
            return (
              <button
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[14px] transition-colors ${
                  isActive 
                    ? "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]" 
                    : "text-[var(--color-trove-text-neutral)] hover:bg-[var(--color-trove-bg-default)]"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Profile & Add Funds */}
      <div className="p-6 border-t border-[var(--color-trove-border)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[var(--color-trove-primary)] rounded-full overflow-hidden flex items-center justify-center text-white font-bold">
            {/* You can replace this with an <img> tag for the real profile pic */}
            AO
          </div>
          <div className="overflow-hidden">
            <p className="text-[14px] font-semibold text-[var(--color-trove-text-default)] truncate">Adaeze Okonkwo</p>
            <p className="text-[12px] text-[var(--color-trove-text-neutral)]">Premium Member</p>
          </div>
        </div>
        
        <button className="w-full py-3 bg-[var(--color-trove-primary)] text-white text-[14px] font-semibold rounded-xl hover:opacity-90 transition-opacity">
          Add Funds
        </button>
      </div>
    </aside>
  );
}