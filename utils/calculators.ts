// Define a basic holding interface for the calculators to expect
interface CalculatorHolding {
  shares: number;
  currentPrice: number;
  avgCost: number;
}

/**
 * Calculates the total net worth of an array of holdings.
 * Safely handles the quirk where a stock (like NVDA) might have a currentPrice of 0.
 */
export const calculateTotalNetWorth = (holdings: CalculatorHolding[]): number => {
  if (!holdings || holdings.length === 0) return 0;

  return holdings.reduce((sum, holding) => {
    // If currentPrice is 0, itemValue is 0, preventing NaN errors
    const itemValue = holding.shares * holding.currentPrice;
    return sum + itemValue;
  }, 0);
};

/**
 * Calculates the total monetary gain or loss for a single holding.
 */
export const calculateGainLoss = (currentPrice: number, avgCost: number, shares: number): number => {
  const totalValue = shares * currentPrice;
  const totalCost = shares * avgCost;
  return totalValue - totalCost;
};

/**
 * Calculates the percentage change between a new value and an original value.
 * Protects against division by zero.
 */
export const calculatePercentageChange = (currentValue: number, originalValue: number): number => {
  if (originalValue === 0) return 0;
  return ((currentValue - originalValue) / originalValue) * 100;
};