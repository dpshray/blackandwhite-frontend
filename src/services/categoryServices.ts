import axiosInstance from "@/lib/axios";
import { CategoriesResponse, Category } from "@/types/categoryTypes";

export const categoriesService = {
  // Get all categories (with pagination + search)
  getCategories: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CategoriesResponse> => {
    const response = await axiosInstance.get("/categories", { params });
    return response.data;
  },

  // Add new category
  addCategory: async (payload: FormData): Promise<Category> => {
    const response = await axiosInstance.post("/admin/add-categories", payload);
    return response.data;
  },

  // Update category 
  updateCategory: async (id: number, payload: FormData): Promise<Category> => {
    const response = await axiosInstance.post(`/admin/update-categories/${id}`, payload);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id: number): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/admin/delete-categories/${id}`);
    return response.data;
  },
};
