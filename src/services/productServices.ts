import axiosInstance from "@/lib/axios";
import { Product, ProductsResponse } from "@/types/productTypes";

export const productService = {
   getProducts: async (page: number = 1, limit: number = 10, search?: string) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (search) {
      params.append("search", search);
    }

    const { data } = await axiosInstance.get<ProductsResponse>(
      `/product?${params.toString()}`
    );

    return data;
  },

  getProductBySlug: async (slug: string) => {
    const { data } = await axiosInstance.get<{ message: string; data: Product }>(
      `/product-detail/${slug}`
    );
    return data;
  },

  addProduct: (payload: FormData) => axiosInstance.post("/admin/add-product", payload),

  updateProduct: (id: number, payload: FormData) => axiosInstance.post(`/admin/update-product/${id}`, payload),

  deleteProduct: (id: number) => axiosInstance.delete(`/admin/delete-product/${id}`),

};
