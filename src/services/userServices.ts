import axiosInstance from "@/lib/axios";
import { UserResponse } from "@/types/userTypes";

export const userService = {
  // Get all Users
  getUsers: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<UserResponse> => {
    const response = await axiosInstance.get("/admin/view-user", { params });
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/admin/delete-user/${id}`);
    return response.data;
  },
};
