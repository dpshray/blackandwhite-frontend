import axiosInstance from "@/lib/axios";
import { CartResponse } from "@/types/cartTypes";

export const cartService = {
  getCart: async () => {
    const { data } = await axiosInstance.get<CartResponse>("/view-cart");
    return data;
  },

  addToCart: async (payload: { product_id: number; variant_id?: number; quantity: number }) => {
    const { data } = await axiosInstance.post("/add-to-cart", payload);
    return data;
  },

  updateCartItem: async (id: number, payload: { quantity: number }) => {
    const { data } = await axiosInstance.post(`/update-cart/${id}`, payload);
    return data;
  },

  removeCartItem: async (id: number) => {
    const { data } = await axiosInstance.delete(`/delete-cart/${id}`);
    return data;
  },
};
