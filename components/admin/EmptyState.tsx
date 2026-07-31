interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body text-center py-12">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-base-content/60 mt-2">
          {message}
        </p>
      </div>
    </div>
  );
}