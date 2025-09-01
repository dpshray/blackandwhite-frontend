import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { bannerService } from "@/services/bannerServices"
import type { BannerResponse, Banner } from "@/types/bannerTypes"

// Query keys for banner-related queries
export const bannerKeys = {
  all: ["banners"] as const,
  lists: () => [...bannerKeys.all, "list"] as const,
  list: (filters: string) => [...bannerKeys.lists(), { filters }] as const,
  details: () => [...bannerKeys.all, "detail"] as const,
  detail: (id: number) => [...bannerKeys.details(), id] as const,
}

// Hook to get all banners
export const useBanners = (): UseQueryResult<BannerResponse, Error> => {
  return useQuery({
    queryKey: bannerKeys.lists(),
    queryFn: () => bannerService.getBanners(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook to get single banner by ID
export const useBanner = (id: number): UseQueryResult<Banner, Error> => {
  return useQuery({
    queryKey: bannerKeys.detail(id),
    queryFn: () => bannerService.getBannerById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Helper hook to get just the banners array
export const useBannersData = () => {
  const { data, ...rest } = useBanners()
  return {
    banners: data?.data || [],
    ...rest,
  }
}
