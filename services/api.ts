// services/api.ts

/** * Represents the aggregated financial data for a specific asset sector.
 */
export interface AccountCategory {
  name: string;
  positions: number;
  totalValue: number;
}

/**
 * Aggregates individual asset holdings by sector and computes total valuation.
 * Returns an array of account categories sorted by total value in descending order.
 */
export function groupHoldingsBySector(holdings: any[]): AccountCategory[] {
  // Aggregate holdings into a sector-indexed map for efficient computation
  const groupedData = holdings.reduce((acc, holding) => {
    const sector = holding.sector;
    const holdingValue = holding.shares * holding.currentPrice;

    // Initialize sector entry if not previously encountered
    if (!acc[sector]) {
      acc[sector] = {
        name: sector,
        positions: 0,
        totalValue: 0,
      };
    }

    // Accumulate position count and market value for the specific sector
    acc[sector].positions += 1;
    acc[sector].totalValue += holdingValue;

    return acc;
  }, {} as Record<string, AccountCategory>);

  // Transform aggregated dictionary to an array and sort by total value (descending)
  return (Object.values(groupedData) as AccountCategory[]).sort((a, b) => b.totalValue - a.totalValue);
}

/**
 * Fetches and normalizes portfolio data from the source.
 * Performs data cleaning, sector aggregation, and financial calculations 
 * (including net worth and percentage change metrics).
 */
export async function getPortfolioData() {
  // Simulate asynchronous API latency for front-end loading state demonstration
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const response = await fetch('/portfolio_data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio data');
    }
    
    const rawData = await response.json();

    // Data cleaning: filter out holdings with zero shares to ensure accurate reporting
    const activeHoldings = rawData.holdings.filter((holding: any) => holding.shares > 0);

    // Normalize data by grouping holdings into sector-based account categories
    const accountCategories = groupHoldingsBySector(activeHoldings);

    // Compute total net worth based on current market values
    const calculatedNetWorth = activeHoldings.reduce((sum: number, holding: any) => {
      const itemValue = holding.shares * holding.currentPrice;
      return sum + itemValue;
    }, 0);

    const totalInvested = rawData.summary.totalInvested;
    
    // Calculate relative percentage change from initial investment
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
      accounts: accountCategories,
      transactions: rawData.transactions, 
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}