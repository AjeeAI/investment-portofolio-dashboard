"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";

export default function ComingSoon({ pageName }: { pageName: string }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)] flex items-center justify-center rounded-2xl mb-6 shadow-sm">
        <Wrench size={32} />
      </div>
      
      <h2 className="text-[24px] font-bold text-[var(--color-trove-text-default)] mb-2">
        {pageName}
      </h2>
      
      <p className="text-[14px] text-[var(--color-trove-text-neutral)] max-w-md mb-8 leading-relaxed">
        We are currently building out the {pageName} module. This feature will be available in an upcoming release.
      </p>

      <Link 
        href="/dashboard" 
        className="px-6 py-2.5 bg-[var(--color-trove-bg-default)] text-[var(--color-trove-text-default)] text-[14px] font-medium rounded-lg hover:bg-[var(--color-trove-border)] transition-colors border border-[var(--color-trove-border)]"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}