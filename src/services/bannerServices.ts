import axiosInstance from "@/lib/axios"
import { Banner, BannerResponse } from "@/types/bannerTypes"

// Banner service functions
export const bannerService = {
  // Get all banners
  getBanners: async (): Promise<BannerResponse> => {
    const response = await axiosInstance.get("/banner")
    return response.data
  },

  // Get single banner by ID
  getBannerById: async (id: number): Promise<Banner> => {
    const response = await axiosInstance.get(`/banner/${id}`)
    return response.data
  },
}
