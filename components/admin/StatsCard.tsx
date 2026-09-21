import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  iconClassName?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  iconClassName = "bg-primary/10 text-primary",
}: StatsCardProps) {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md">
      <div className="card-body flex-row items-center justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-sm text-base-content/60">{title}</p>

          <h2 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
