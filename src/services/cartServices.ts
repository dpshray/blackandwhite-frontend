import axiosInstance from "@/lib/axios";

export const cartService = {
  getCart: async () => {
    const { data } = await axiosInstance.get("/cart");
    return data;
  },

  addToCart: async (payload: { product_id: number; variant_id?: number; quantity: number }) => {
    const { data } = await axiosInstance.post("/cart", payload);
    return data;
  },

  updateCartItem: async (id: number, payload: { quantity: number }) => {
    const { data } = await axiosInstance.put(`/cart/${id}`, payload);
    return data;
  },

  removeCartItem: async (id: number) => {
    const { data } = await axiosInstance.delete(`/cart/${id}`);
    return data;
  },
};
