"use client";

import { FilterTabsProps, DashboardRange } from "@/types/dashboard";

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  const items: DashboardRange[] = ["day", "week", "month"];

  return (
    <div className="flex gap-3 mb-8">
      {items.map((item) => {
        const active = value === item;
        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`
              px-5 py-2 rounded-xl text-sm font-medium
              backdrop-blur-xl
              transition-all
              ${active
                ? "bg-blue-500/30 text-blue-100 shadow-lg border border-blue-300/30"
                : "bg-white/10 dark:bg-white/5 text-gray-500 dark:text-gray-300"
              }
            `}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
