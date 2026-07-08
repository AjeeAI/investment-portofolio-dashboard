/**
 * Formats a raw number into standard US currency (e.g., 4250.5 -> $4,250.50)
 */
export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return "$0.00";
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Formats a raw number into a percentage string with a specific precision.
 * (e.g., 4.567 -> 4.57%)
 */
export const formatPercentage = (value: number | undefined, decimals: number = 2): string => {
  if (value === undefined || isNaN(value)) return "0.00%";
  
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formats a date string into the wireframe's specific format (e.g., "Oct 24, 2023")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Helper to strip rogue characters (like $ or commas) from strings 
 * before they hit the calculators.
 */
export const parseCurrencyString = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  return parseFloat(val.toString().replace(/[\$,\s]/g, ''));
};