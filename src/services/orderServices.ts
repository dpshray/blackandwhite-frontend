import axiosInstance from "@/lib/axios";
import {
  AllOrderResponse,
  OrderHistoryResponse,
} from "@/types/orderTypes";

export const orderService = {
  getOrders: async (
    page: number = 1,
    perPage: number = 10
  ): Promise<OrderHistoryResponse> => {
    const res = await axiosInstance.get(
      `/order-history?page=${page}&limit=${perPage}`
    );
    return res.data;
  },

  getAllOrders: async (
    page: number = 1,
    perPage: number = 10
  ): Promise<AllOrderResponse> => {
    const res = await axiosInstance.get(
      `/admin/all-order?page=${page}&limit=${perPage}`
    );
    return res.data;
  },

  addOrder: async ( addressId: number ) => {
    const res = await axiosInstance.post(`/order-item/${addressId}`);
    return res.data;
  },

  deleteOrder: async (id: number) => {
    const res = await axiosInstance.post(`/order-edit/${id}`);
    return res.data;
  },
};
