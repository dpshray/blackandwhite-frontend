"use client";

import { useTotal } from "@/hooks/useTotal";
import { StatsCard, StatsSkeleton } from "./StatsCard";

export default function Stats() {
  const { getTotalRevenue, getTotalOrders, getTotalProducts, getTotalUsers } = useTotal();

  console.log("asasas",getTotalRevenue.data);

  const stats = [
    {
      title: "Total Revenue",
      data: getTotalRevenue.data ?? {} ,
      isLoading: getTotalRevenue.isLoading,
    },
    {
      title: "Total Orders",
      data: getTotalOrders.data ?? {} ,
      isLoading: getTotalOrders.isLoading,
    },
    {
      title: "Total Products",
      data: getTotalProducts.data ?? {} ,
      isLoading: getTotalProducts.isLoading,
    },
    {
      title: "Total Users",
      data: getTotalUsers.data ?? {} ,
      isLoading: getTotalUsers.isLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) =>
        stat.isLoading ? (
          <StatsSkeleton key={stat.title} />
        ) : (
          <StatsCard
            key={stat.title}
            title={stat.title}
            data={stat.data}
          />
        )
      )}
    </div>
  );
}
