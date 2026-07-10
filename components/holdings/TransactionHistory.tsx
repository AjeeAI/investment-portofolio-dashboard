"use client";

import { formatDate, formatCurrency } from "@/utils/formatters";

interface Transaction {
  id: string;
  type: "BUY" | "SELL";
  ticker: string;
  name: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  date: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
}

/**
 * TransactionHistory component renders a chronological list of asset transactions.
 * Includes status-based styling and responsive design for mobile devices.
 */
export default function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  
  return (
    <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] flex flex-col shadow-sm w-full">
      {transactions?.length > 0 ? (
        transactions.map((transaction) => {
          const isBuy = transaction.type === "BUY";
          
          const baseAmountFormatted = formatCurrency(Math.abs(transaction.totalAmount));
          
          // Handle zero-value edge cases for financial display
          const displayAmount = transaction.totalAmount === 0 
            ? "N/A" 
            : `${isBuy ? "-" : "+"}${baseAmountFormatted}`;

          // Map transactional status enum to design system color tokens
          let statusStyles = "";
          switch (transaction.status) {
            case "COMPLETED":
              statusStyles = "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]";
              break;
            case "PENDING":
              statusStyles = "bg-[#FEF0C7] text-[#B54708]"; 
              break;
            case "FAILED":
              statusStyles = "bg-[#FEE4E2] text-[var(--color-trove-negative)]"; 
              break;
          }

          return (
            <div key={transaction.id} className="flex items-center justify-between p-4 md:p-5 border-b border-[var(--color-trove-border)] last:border-b-0 hover:bg-[var(--color-trove-bg-default)] transition-colors gap-3">
              
              {/* Left Side: Icon & Details - flex-1 min-w-0 ensures proper truncation */}
              <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
                <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-bold text-[18px] md:text-[20px] shrink-0 ${
                  isBuy ? "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]" : "bg-[var(--color-trove-bg-default)] text-[var(--color-trove-text-neutral)]"
                }`}>
                  {isBuy ? "+" : "-"}
                </div>
                
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[14px] md:text-[15px] font-bold text-[var(--color-trove-text-default)] truncate">
                    {isBuy ? "Buy" : "Sell"} {transaction.name}
                  </span>
                  <span className="text-[12px] md:text-[13px] text-[var(--color-trove-text-neutral)] truncate">
                    {formatDate(transaction.date)} • {transaction.shares.toFixed(2)} Shares
                  </span>
                </div>
              </div>

              {/* Right Side: Amount & Status - shrink-0 prevents price from being squashed */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-[14px] md:text-[15px] font-bold ${
                  transaction.totalAmount === 0 
                    ? "text-[var(--color-trove-text-neutral)] italic text-[12px] font-medium" 
                    : "text-[var(--color-trove-text-default)]"
                }`}>
                  {displayAmount}
                </span>
                <span className={`px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider uppercase ${statusStyles}`}>
                  {transaction.status}
                </span>
              </div>

            </div>
          );
        })
      ) : (
        <div className="py-8 text-center text-[14px] text-[var(--color-trove-text-neutral)]">
          No recent transactions.
        </div>
      )}
    </div>
  );
}