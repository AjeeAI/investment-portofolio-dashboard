import { AccountCategory } from "@/services/api";

interface AccountListProps {
  accounts: AccountCategory[];
}

export default function AccountList({ accounts }: AccountListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {accounts.map((account) => (
        <div 
          key={account.name} 
          className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] p-5 hover:shadow-sm transition-shadow"
        >
          <p className="text-[12px] font-medium text-[var(--color-trove-text-neutral)] mb-1">
            {account.name}
          </p>
          <p className="text-[18px] font-semibold text-[var(--color-trove-text-default)] mb-2">
            {/* Format as currency */}
            ${account.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-[var(--color-trove-text-neutral)]">
            {account.positions} {account.positions === 1 ? "Position" : "Positions"}
          </p>
        </div>
      ))}
    </div>
  );
}