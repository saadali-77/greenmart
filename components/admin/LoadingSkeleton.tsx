export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-10 w-48"></div>

      <div className="grid grid-cols-4 gap-4">
        <div className="skeleton h-32"></div>
        <div className="skeleton h-32"></div>
        <div className="skeleton h-32"></div>
        <div className="skeleton h-32"></div>
      </div>

      <div className="skeleton h-72"></div>
    </div>
  );
}