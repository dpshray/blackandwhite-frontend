import { cartService } from "@/services/cartServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: (res) => {
        toast.success(res.data.message || "Product added to cart");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      cartService.updateCartItem(id, { quantity }),
    onSuccess: (res) => {
        toast.success(res.data.message || "Cart updated");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to update cart");
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.removeCartItem,
    onSuccess: (res) => {
        toast.success(res.data.message || "Item removed from cart");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to remove item");
    },
  });
};
