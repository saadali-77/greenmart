const STATUS_STYLES: Record<string, string> = {
  PENDING: "badge-warning",
  PROCESSING: "badge-info",
  SHIPPED: "badge-primary",
  DELIVERED: "badge-success",
  CANCELLED: "badge-error",
};

function label(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={`badge badge-soft whitespace-nowrap font-medium ${
        STATUS_STYLES[status.toUpperCase()] ?? "badge-neutral"
      }`}
    >
      {label(status)}
    </span>
  );
}
