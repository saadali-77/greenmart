import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
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
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-base-content/60">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {value}
            </h2>
          </div>

          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${iconClassName}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}