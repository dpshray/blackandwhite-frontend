import axiosInstance from "@/lib/axios";

export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  price: string;
  discount_price: string | null;
  discount_percent: number | null;
  stock: number;
  images: string[];
}

export interface ProductCategory {
  categories_id: number;
  categories_title: string;
  categories_slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  discount_price: string | null;
  discount_percent: number | null;
  pattern: string;
  fabric: string;
  material: string;
  image: string;
  categories: ProductCategory[];
  variants: ProductVariant[];
}

export interface ProductsResponse {
  data: {
    data: Product[];
  };
  message: string;
}

export const productService = {
  getProducts: (page: number = 1, size: number = 10) =>
    axiosInstance
      .get<ProductsResponse>(`/products?page=${page}&size=${size}`)
      .then((res) => res.data),
};
