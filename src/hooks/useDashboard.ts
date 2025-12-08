"use client"

import { getDailySales, getDeliveryCharge, getNotifications, notificatonStatus, setDeliveryCharge } from "@/services/dashboardServices"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { toast } from "sonner"

export const useGetDailySales = () => {
  return useQuery({
    queryKey: ["dailySales"],
    queryFn: getDailySales,
  })
}

export const useNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getNotifications(pageParam, 10),   
    getNextPageParam: (lastPage: any) => {
      const { current_page, last_page } = lastPage.meta;
      if (current_page < last_page) return current_page + 1;
      return undefined;
    }
  });
};

export const useNotificationStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notification_id: number) => notificatonStatus(notification_id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    }
  })
}

export const useSetDeliveryCharge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: any) => setDeliveryCharge(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveryCharge"] });
      toast.success("Delivery charge added successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add delivery charge");
    },
  })
}

export const useGetDeliveryCharge = () => {
  return useQuery({
    queryKey: ["deliveryCharge"],
    queryFn: getDeliveryCharge,
  })
}


