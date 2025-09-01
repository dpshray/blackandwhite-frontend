import { BannerResponse } from "@/types/bannerTypes"
import { CategoriesResponse } from "@/types/categoryTypes"

export async function getCategories(): Promise<CategoriesResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api"

  try {
    const response = await fetch(`${apiUrl}/categories`, {
      cache: "no-store", // fresh data on every request
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    // Return empty response structure on error
    return {
      message: "Failed to fetch categories",
      data: {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0,
        },
        links: {
          first: "",
          last: "",
          prev: null,
          next: null,
        },
      },
      success: false,
    }
  }
}

export async function getBanners(): Promise<BannerResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL

  try {

    const response = await fetch(`${apiUrl}/banner`, {
      cache: "no-store", // fresh data on every request
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API Error ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch {
    return {
      message: "Failed to fetch banners",
      data: [],
      success: false,
    }
  }
}
