// services/api.ts

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

    // 2. MATH QUIRK: Calculate Net Worth safely (handles NVDA's 0 price)
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
        calculatedNetWorth, // We pass our safe calculation to the UI
        percentageChange,
      },
      holdings: activeHoldings,
      transactions: rawData.transactions, // Data is already clean!
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}