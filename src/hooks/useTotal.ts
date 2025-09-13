"use client"

import { totalService } from "@/services/totalServices"
import { useQuery } from "@tanstack/react-query"

interface TotalResponse {
  data: number
}

export const useTotal = () => {
    const getTotalRevenue = useQuery<TotalResponse>({
        queryKey: ["totalRevenue"],
        queryFn: async () => {
          const res = await totalService.getTotalRevenue()
          return res.data.data
        },
        staleTime: 5 * 60 * 1000,
    });

    const getTotalOrders = useQuery<TotalResponse>({
      queryKey: ["totalOrders"],
      queryFn: async () => {
        const res = await totalService.getTotalOrders()
        return res.data.data
      },        
      staleTime: 5 * 60 * 1000,
    });

    const getTotalProducts = useQuery<TotalResponse>({
        queryKey: ["totalProducts"],
        queryFn: async () => {
          const res = await totalService.getTotalProducts()
          return res.data.data
        },        
        staleTime: 5 * 60 * 1000,
    });

    const getTotalUsers = useQuery<TotalResponse>({
        queryKey: ["totalUsers"],
        queryFn: async () => {
          const res = await totalService.getTotalUsers()
          return res.data.data
        },       
        staleTime: 5 * 60 * 1000,
    });

  return {
    getTotalRevenue,
    getTotalOrders,
    getTotalProducts,
    getTotalUsers
  }
}
