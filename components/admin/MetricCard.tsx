import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: "green" | "amber" | "red";
};

const ACCENT_CLASSES: Record<MetricCardProps["accent"], string> = {
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
};

export default function MetricCard({ label, value, icon: Icon, accent }: MetricCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${ACCENT_CLASSES[accent]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm text-slate-500">{label}</p>
        <p className="text-xl font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
