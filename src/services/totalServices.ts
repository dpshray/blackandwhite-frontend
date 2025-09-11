import axiosInstance from "@/lib/axios";

export const totalService = {
  // Get total revenue
  getTotalRevenue: async () => {
    return await axiosInstance.get("/admin/total-revenue");
  },

  // Get total orders
  getTotalOrders: async () => {
    return await axiosInstance.get("/admin/total-order");
  },
  
  // Get total products
  getTotalProducts: async () => {
    return await axiosInstance.get("/admin/total-product");
  },
  
  // Get total users
  getTotalUsers: async () => {
    return await axiosInstance.get("/admin/total-user");
  },
};