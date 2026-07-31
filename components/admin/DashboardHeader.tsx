interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {subtitle && (
        <p className="text-base-content/60 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}