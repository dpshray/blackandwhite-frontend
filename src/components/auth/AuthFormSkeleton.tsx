"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AuthFormSkeleton() {
  return (
    <div className="flex px-4 py-8 max-w-7xl mx-auto gap-8">
      {/* Left Image */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Skeleton className="h-[600px] w-[600px] rounded-lg" />
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-1/2 mx-auto rounded" />

          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-12 w-full rounded" />
          ))}

          <Skeleton className="h-12 w-full rounded" />

          <Skeleton className="h-4 w-3/4 mx-auto rounded" />
        </div>
      </div>
    </div>
  );
}
