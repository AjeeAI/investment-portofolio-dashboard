"use client";

const allocationData = [
  { name: "Technology", value: 45, color: "var(--color-trove-primary, #005C4B)" }, 
  { name: "Automotive", value: 25, color: "#2E90FA" }, 
  { name: "Healthcare", value: 15, color: "#98A2B3" }, 
  { name: "Finance", value: 15, color: "#475467" },    
];

export default function AssetAllocation() {
  return (
    // Removed h-full and justify-between. Added mt-6 for breathing room.
    <div className="flex flex-col w-full gap-8 mt-6">
      
      {/* CSS-Only Stacked Bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden">
        {allocationData.map((item) => (
          <div 
            key={item.name} 
            style={{ width: `${item.value}%`, backgroundColor: item.color }}
            title={`${item.name}: ${item.value}%`} 
          />
        ))}
      </div>

      {/* Custom 2x2 Legend */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-2">
        {allocationData.map((item) => (
          <div key={item.name} className="flex items-start gap-2 min-w-0">
            <span 
              className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-[var(--color-trove-text-neutral)] truncate w-full mb-0.5">
                {item.name}
              </span>
              <span className="text-[14px] font-semibold text-[var(--color-trove-text-default)]">
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}