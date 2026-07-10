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
 * Includes status-based styling and transaction type formatting (Buy/Sell logic).
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
            ? "Price unavailable" 
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
            <div key={transaction.id} className="flex items-center justify-between p-5 border-b border-[var(--color-trove-border)] last:border-b-0 hover:bg-[var(--color-trove-bg-default)] transition-colors">
              
              {/* Transaction metadata and visual type identifier */}
              <div className="flex items-center gap-5">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[20px] shrink-0 ${
                  isBuy ? "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]" : "bg-[var(--color-trove-bg-default)] text-[var(--color-trove-text-neutral)]"
                }`}>
                  {isBuy ? "+" : "-"}
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold text-[var(--color-trove-text-default)]">
                    {isBuy ? "Buy" : "Sell"} {transaction.name}
                  </span>
                  <span className="text-[13px] text-[var(--color-trove-text-neutral)]">
                    {formatDate(transaction.date)} • {transaction.shares.toFixed(2)} Shares
                  </span>
                </div>
              </div>

              {/* Financial result and status indicator */}
              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-[15px] font-bold ${
                  transaction.totalAmount === 0 
                    ? "text-[var(--color-trove-text-neutral)] italic text-[12px] font-medium" 
                    : "text-[var(--color-trove-text-default)]"
                }`}>
                  {displayAmount}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${statusStyles}`}>
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