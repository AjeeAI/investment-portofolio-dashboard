// services/api.ts

// Define the shape of our new derived data
export interface AccountCategory {
  name: string;
  positions: number;
  totalValue: number;
}

// The grouping function
export function groupHoldingsBySector(holdings: any[]): AccountCategory[] {
  // 1. Use reduce to build a dictionary object keyed by sector name
  const groupedData = holdings.reduce((acc, holding) => {
    const sector = holding.sector;
    // Remember to handle the NVDA $0 quirk here too!
    const holdingValue = holding.shares * holding.currentPrice;

    // If we haven't seen this sector yet, initialize it
    if (!acc[sector]) {
      acc[sector] = {
        name: sector,
        positions: 0,
        totalValue: 0,
      };
    }

    // Add the current holding's data to the sector totals
    acc[sector].positions += 1;
    acc[sector].totalValue += holdingValue;

    return acc;
  }, {} as Record<string, AccountCategory>);

  // 2. Convert the dictionary object back into a flat array for React to map over
  // We explicitly cast it as AccountCategory[] to satisfy TypeScript strict mode
  return (Object.values(groupedData) as AccountCategory[]).sort((a, b) => b.totalValue - a.totalValue);
}

export async function getPortfolioData() {
  // Simulate network latency for the assessment requirement
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const response = await fetch('/portfolio_data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio data');
    }
    
    const rawData = await response.json();

    // 1. FILTER QUIRK: Remove any holdings with 0 shares (e.g., DIS)
    const activeHoldings = rawData.holdings.filter((holding: any) => holding.shares > 0);

    // 2. NEW: Call your grouping function here!
    const accountCategories = groupHoldingsBySector(activeHoldings);

    // 3. MATH QUIRK: Calculate Net Worth safely (handles NVDA's 0 price)
    const calculatedNetWorth = activeHoldings.reduce((sum: number, holding: any) => {
      const itemValue = holding.shares * holding.currentPrice;
      return sum + itemValue;
    }, 0);

    const totalInvested = rawData.summary.totalInvested;
    
    // Calculate percentage change based on invested amount vs current calculated worth
    const percentageChange = totalInvested > 0 
      ? ((calculatedNetWorth - totalInvested) / totalInvested) * 100 
      : 0;

    return {
      user: rawData.user,
      summary: {
        ...rawData.summary,
        calculatedNetWorth, 
        percentageChange,
      },
      holdings: activeHoldings,
      accounts: accountCategories, // 4. NEW: Add it to your return payload!
      transactions: rawData.transactions, 
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}