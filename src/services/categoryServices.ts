import axiosInstance from "@/lib/axios"
import { CategoriesResponse, Category } from "@/types/categoryTypes"

export const categoriesService = {
  // Get all categories
  getCategories: async (params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<CategoriesResponse> => {
    const response = await axiosInstance.get("/categories", { params })
    return response.data
  },

  // Get single category by ID
  getCategoryById: async (id: number): Promise<Category> => {
    const response = await axiosInstance.get(`/categories/${id}`)
    return response.data
  },

  // Get category by slug
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await axiosInstance.get(`/categories/slug/${slug}`)
    return response.data
  },
}