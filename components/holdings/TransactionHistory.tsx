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

export default function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  
  return (
    // Single outer container for the list
    <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] flex flex-col overflow-hidden shadow-sm">
      {transactions?.length > 0 ? (
        transactions.map((transaction) => {
          const isBuy = transaction.type === "BUY";
          
          const baseAmountFormatted = formatCurrency(Math.abs(transaction.totalAmount));
          
          const displayAmount = transaction.totalAmount === 0 
            ? "Price unavailable" 
            : `${isBuy ? "-" : "+"}${baseAmountFormatted}`;

          // Status Pill Styling mapping to your variables
          let statusStyles = "";
          switch (transaction.status) {
            case "COMPLETED":
              statusStyles = "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]";
              break;
            case "PENDING":
              // Kept these distinct as yellow/orange isn't in the provided Trove palette explicitly, 
              // but often defaults are needed for statuses missing from a basic palette
              statusStyles = "bg-[#FEF0C7] text-[#B54708]"; 
              break;
            case "FAILED":
              // You can map this to negative-light if you add it to your globals, or use a manual fallback
              statusStyles = "bg-[#FEE4E2] text-[var(--color-trove-negative)]"; 
              break;
          }

          return (
            // Inner borders only
            <div key={transaction.id} className="flex items-center justify-between p-4 border-b border-[var(--color-trove-border)] last:border-b-0 hover:bg-[var(--color-trove-bg-canvas)] transition-colors">
              
              {/* Left Side: Icon & Details */}
              <div className="flex items-center gap-4">
                {/* Action Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[20px] shrink-0 ${
                  isBuy ? "bg-[var(--color-trove-primary-light)] text-[var(--color-trove-primary)]" : "bg-[var(--color-trove-bg-default)] text-[var(--color-trove-text-neutral)]"
                }`}>
                  {isBuy ? "+" : "-"}
                </div>
                
                {/* Company & Meta */}
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[var(--color-trove-text-default)]">
                    {isBuy ? "Buy" : "Sell"} {transaction.name}
                  </span>
                  <span className="text-[12px] text-[var(--color-trove-text-neutral)] mt-0.5">
                    {formatDate(transaction.date)} • {transaction.shares.toFixed(2)} Shares
                  </span>
                </div>
              </div>

              {/* Right Side: Amount & Status */}
              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-[14px] font-bold ${
                  transaction.totalAmount === 0 
                    ? "text-[var(--color-trove-text-neutral)] italic text-[12px] font-medium" 
                    : "text-[var(--color-trove-text-default)]"
                }`}>
                  {displayAmount}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${statusStyles}`}>
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