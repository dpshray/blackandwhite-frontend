import axiosInstance from "@/lib/axios"
import { Banner, BannerResponse } from "@/types/bannerTypes"

// Banner service functions
export const bannerService = {
  // Get all banners
  getBanners: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<BannerResponse> => {
    const response = await axiosInstance.get("/banner", {params})
    return response.data
  },

  // Add new banner
  addBanner: async (payload: FormData): Promise<Banner> => {
    const response = await axiosInstance.post("/admin/add-banner", payload);
    return response.data;
  },

  // Update banner 
  updateBanner: async (id: number, payload: FormData): Promise<Banner> => {
    const response = await axiosInstance.post(`/admin/update-banner/${id}`, payload);
    return response.data;
  },

  // Delete banner
  deleteBanner: async (id: number): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/admin/delete-banner/${id}`);
    return response.data;
  },
}
