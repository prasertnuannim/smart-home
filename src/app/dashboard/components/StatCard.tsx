import { StatCardProps } from "@/types/dashboard";

export function StatCard({ title, value, color, delay }: StatCardProps) {
  const map = {
    red: "text-[#FF6B6B]",
    orange: "text-[#FFB74D]",
    blue: "text-[#4FC3F7]"
  };

  return (
    <div
      className="backdrop-blur-xl bg-white/10 dark:bg-white/5
                 border border-white/20 dark:border-white/10
                 rounded-2xl p-5 shadow-lg fade-in"
      style={{ animationDelay: delay }}
    >
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className={`text-3xl font-semibold ${map[color]}`}>{value}</p>
    </div>
  );
}
