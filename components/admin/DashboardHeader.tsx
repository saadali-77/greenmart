import { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  // Optional actions (e.g. an "Add" button) shown on the right.
  children?: ReactNode;
}

export default function DashboardHeader({
  title,
  subtitle,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-base-content/60">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex shrink-0 items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}
