"use client"

import { totalService } from "@/services/totalServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { toast } from "sonner"

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

export const useAddDeliveryCharge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => totalService.addDeliveryCharge(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveryCharges"] });
      toast.success("Delivery charge added successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add delivery charge");
    },
  })
}
