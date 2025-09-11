import axiosInstance from "@/lib/axios";

export const checkoutService = {
  postCheckout: async (payload: {
    items: { product_id: number; variant_id: number; quantity: number }[];
  }) => {
    const { data } = await axiosInstance.post("/checkout", payload);
    return data;
  },

  getOrderItem: async (id: number) => {
    const { data } = await axiosInstance.get(`/order-item/${id}`);
    return data;
  },
};
