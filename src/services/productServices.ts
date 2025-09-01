import axiosInstance from "@/lib/axios";
import { ProductsResponse } from "@/types/productTypes";

export const productService = {
  getProducts: (page: number = 1, size: number = 10) =>
    axiosInstance
      .get<ProductsResponse>(`/products?page=${page}&size=${size}`)
      .then((res) => res.data),
};
