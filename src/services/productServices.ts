import axiosInstance from "@/lib/axios";
import { ProductsResponse } from "@/types/productTypes";

export const productService = {
  getProducts: async (page: number = 1, limit: number = 10) => {
    const { data } = await axiosInstance.get<ProductsResponse>(
      `/product?page=${page}&limit=${limit}`
    );
    return data;
  },

  addProduct: (payload: FormData) => axiosInstance.post("/product", payload),

  deleteProduct: (id: number) => axiosInstance.delete(`/product/${id}`),

  updateProduct: (id: number, payload: FormData) => axiosInstance.put(`/product/${id}`, payload),
};
