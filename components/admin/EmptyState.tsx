interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body items-center py-12 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="mt-2 text-base-content/60">{message}</p>
      </div>
    </div>
  );
}
