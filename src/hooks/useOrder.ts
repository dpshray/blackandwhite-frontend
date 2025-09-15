"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
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

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (addressId: number) => orderService.addOrder(addressId),
    onSuccess: () => {
      toast.success("Order placed successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/checkout/thank-you");
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });
};