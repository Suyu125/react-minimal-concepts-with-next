/**
 * FallbackLoading - Reusable loading component for Suspense boundaries
 */
export default function FallbackLoading() {
  return (
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
