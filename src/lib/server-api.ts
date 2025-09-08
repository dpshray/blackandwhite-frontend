import type { BannerResponse } from "@/types/bannerTypes";
import type { CategoriesResponse } from "@/types/categoryTypes";
import { ProductsResponse, SingleProductResponse } from "@/types/productTypes";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
export async function getProducts(
  page: number = 1,
  limit: number = 9,
  category?: string,
  size?: string,
  color?: string,
  sort?: string,
): Promise<ProductsResponse> {
  try {
    // Build dynamic query params
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (category) params.append("category", category)
    if (size) params.append("size", size)
    if (color) params.append("color", color)
    if (sort) params.append("sort", sort)

    return await fetchJSON<ProductsResponse>(`/product?${params.toString()}`)
  } catch {
    return {
      message: "Failed to fetch products",
      data: {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: limit,
          total: 0,
        },
      },
    };
  }
}

export async function getProductBySlug(slug: string): Promise<SingleProductResponse> {
  try {
    return await fetchJSON<SingleProductResponse>(`/product-detail/${slug}`);
  } catch {
    return { message: "Failed to fetch product", data: null};
  }
}


