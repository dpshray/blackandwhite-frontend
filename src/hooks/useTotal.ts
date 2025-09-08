"use client"

import { totalService } from "@/services/totalServices"
import { useQuery } from "@tanstack/react-query"

interface TotalResponse {
  data: number
}

export const useTotal = () => {
    const getTotalRevenue = useQuery<TotalResponse>({
        queryKey: ["totalRevenue"],
        queryFn: () => totalService.getTotalRevenue(),
        staleTime: 5 * 60 * 1000,
    });

    const getTotalOrders = useQuery<TotalResponse>({
        queryKey: ["totalOrders"],
        queryFn: () => totalService.getTotalOrders(),
        staleTime: 5 * 60 * 1000,
    });

    const getTotalProducts = useQuery<TotalResponse>({
        queryKey: ["totalProducts"],
        queryFn: () => totalService.getTotalProducts(),
        staleTime: 5 * 60 * 1000,
    });

    const getTotalUsers = useQuery<TotalResponse>({
        queryKey: ["totalUsers"],
        queryFn: () => totalService.getTotalUsers(),
        staleTime: 5 * 60 * 1000,
    });

  return {
    getTotalRevenue,
    getTotalOrders,
    getTotalProducts,
    getTotalUsers
  }
}
