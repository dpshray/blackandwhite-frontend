import { Suspense } from "react"
import CheckoutPage from "./CheckoutPage"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  return (
    <Suspense fallback={
      <div className="container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-40 w-full rounded-md" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
        <div className="h-fit border p-6 rounded-md space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    }>
      <CheckoutPage />
    </Suspense>
  )
}