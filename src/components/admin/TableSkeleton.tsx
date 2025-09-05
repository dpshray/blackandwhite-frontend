import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  const columns = 6;
  const rows = 6;

  return (
    <div className="border rounded-md overflow-hidden w-full">
      <div className="grid grid-cols-6 bg-muted text-muted-foreground text-sm font-medium p-3">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="px-2 py-1"> 
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-6 items-center border-t px-3 py-4"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="px-2 py-1">
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
