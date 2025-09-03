import { Skeleton } from "../ui/skeleton";

export default function CartSkeleton() {
    return (
        <div className="container max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-2xl font-semibold mb-6">Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between border-b py-6">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-8 w-8 rounded" />
                                <Skeleton className="h-20 w-20 rounded" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-16" />
                        </div>
                    ))}
                </div>

                <div className="h-fit border p-6 rounded-md space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
} 