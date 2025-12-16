import axiosInstance from "@/lib/axios";
import {
  AllOrderResponse,
  AllWhatsAppOrderResponse,
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

  getAllWhatsAppOrders: async (
    page: number = 1,
    perPage: number = 10
  ): Promise<AllWhatsAppOrderResponse> => {
    const res = await axiosInstance.get(
      `/admin/all-whatsapp-order?page=${page}&limit=${perPage}`
    );
    console.log(res);
    return res.data;
  },

  addOrder: async ( addressId: number, buynow: number ) => {
    const res = await axiosInstance.post(`/order-item/${addressId}`, {
      buynow
    });
    return res.data;
  },

  deleteOrder: async (id: number) => {
    const res = await axiosInstance.post(`/order-edit/${id}`);
    return res.data;
  },

  updateOrderStatus: async (orderId: number, status: string) => {
    const res = await axiosInstance.post(`/admin/update-order/${orderId}`, { status }); 
    return res.data;
  },

  updateWhatsAppOrderStatus: async (id: number, status: string) => {
    const res = await axiosInstance.post(`/admin/update-whatsapp-order/${id}`, { status }); 
    return res.data;
  },

  addAdminOrder: async (data: any) => {
    const res = await axiosInstance.post(`/admin/add-admin-order`, data);
    return res.data;
  },
};
