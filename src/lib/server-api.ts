import type { BannerResponse } from "@/types/bannerTypes";
import type { CategoriesResponse } from "@/types/categoryTypes";
import { ProductsResponse } from "@/types/productTypes";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api";

async function fetchJSON<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${apiUrl}${endpoint}`, { cache: "no-store", ...options });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    throw err;
  }
}

// Categories
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    return await fetchJSON<CategoriesResponse>("/categories");
  } catch {
    return {
      message: "Failed to fetch categories",
      data: {
        data: [],
        meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 },
        links: { first: "", last: "", prev: null, next: null },
      },
      success: false,
    };
  }
}

// Banners
export async function getBanners(): Promise<BannerResponse> {
  try {
    return await fetchJSON<BannerResponse>("/banner");
  } catch {
    return { message: "Failed to fetch banners", data: [], success: false };
  }
}

// Products
export async function getProducts(page: number = 1, perPage: number = 10): Promise<ProductsResponse> {
  try {
    return await fetchJSON<ProductsResponse>(`/product?page=${page}&limit=${perPage}`);
  } catch {
    return {
      message: "Failed to fetch products",
      data: { data: [], meta: { current_page: 1, last_page: 1, per_page: perPage, total: 0 } },
    };
  }
}
