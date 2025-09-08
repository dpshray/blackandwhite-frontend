import axiosInstance from "@/lib/axios";
import { ProductsResponse } from "@/types/productTypes";

export const productService = {
  getProducts: async (page: number = 1, limit: number = 10, search?: string) => {
    const { data } = await axiosInstance.get<ProductsResponse>(
      `/product?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  addProduct: (payload: FormData) => axiosInstance.post("/admin/add-product", payload),

  updateProduct: (id: number, payload: FormData) => axiosInstance.post(`/admin/update-product/${id}`, payload),

  deleteProduct: (id: number) => axiosInstance.delete(`/admin/delete-product/${id}`),

};
