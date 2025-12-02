"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AllOrderResponse,
  OrderHistoryResponse,
} from "@/types/orderTypes";
import { toast } from "sonner";
import { orderService } from "@/services/orderServices";
import { useRouter } from "next/navigation";

export const useOrders = (page: number = 1, perPage: number = 10) => {
  return useQuery<OrderHistoryResponse>({
    queryKey: ["orders", page, perPage],
    queryFn: () => orderService.getOrders(page, perPage),
  });
};

export const useAllOrders = (page: number = 1, perPage: number = 10) => {
  return useQuery<AllOrderResponse>({
    queryKey: ["all-orders", page, perPage],
    queryFn: () => orderService.getAllOrders(page, perPage),
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({addressId, buynow}: {addressId: number, buynow: number}) => orderService.addOrder(addressId, buynow),
    onSuccess: () => {
      toast.success("Order placed successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/thank-you");
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => orderService.deleteOrder(id),
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to cancel order");
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: string }) =>
      orderService.updateOrderStatus(orderId, status),
    onSuccess: (_, { orderId, status }) => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["revenue"] });
      toast.success(`Order ${orderId} status updated to ${status}`);
    },
    onError: (error) => {
      toast.error("Failed to update order status");
      console.error("Failed to update order status:", error);
    },
  });
};