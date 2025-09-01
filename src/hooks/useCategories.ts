import { categoriesService } from "@/services/categoryServices"
import { CategoriesResponse, Category } from "@/types/categoryTypes"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

// Query keys for categories
export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: (params?: any) => [...categoriesKeys.lists(), params] as const,
  details: () => [...categoriesKeys.all, "detail"] as const,
  detail: (id: number) => [...categoriesKeys.details(), id] as const, // Updated id type to number
  slug: (slug: string) => [...categoriesKeys.all, "slug", slug] as const,
}

// Get all categories
export const useCategories = (
  params?: {
    page?: number
    limit?: number
    search?: string
  }, 
  options?: Omit<UseQueryOptions<CategoriesResponse>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: categoriesKeys.list(params),
    queryFn: () => categoriesService.getCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

// Helper hook to extract categories data from nested response
export const useCategoriesData = (
  params?: {
    page?: number
    limit?: number
    search?: string
  },
  options?: Omit<UseQueryOptions<CategoriesResponse>, "queryKey" | "queryFn">,
) => {
  const query = useCategories(params, options)
  return {
    ...query,
    data: query.data?.data.data, // Extract categories array from nested response
    meta: query.data?.data.meta, // Extract pagination meta
    links: query.data?.data.links, // Extract pagination links
  }
}

// Get single category by ID
export const useCategory = (id: number, options?: Omit<UseQueryOptions<Category>, "queryKey" | "queryFn">) => {
  // Updated id type to number
  return useQuery({
    queryKey: categoriesKeys.detail(id),
    queryFn: () => categoriesService.getCategoryById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

// Get category by slug
export const useCategoryBySlug = (slug: string, options?: Omit<UseQueryOptions<Category>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: categoriesKeys.slug(slug),
    queryFn: () => categoriesService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}
