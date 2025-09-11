"use client";

import { productService } from "@/services/productServices";
import { ProductsResponse } from "@/types/productTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useProducts = (page: number = 1, limit: number = 10, search?: string) => {
  const queryClient = useQueryClient();

  // get
  const getProducts = useQuery<ProductsResponse>({
  queryKey: ["products", { page, limit, search }],
  queryFn: async () => {
    try {
      return await productService.getProducts(page, limit, search);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Return a fake response with empty products instead of throwing
        return {
          data: {
            data: [],
            meta: {
              current_page: page,
              last_page: 1,
              per_page: limit,
              total: 0,
            },
          },
          message: "No products found",
        } as ProductsResponse;
      }
      throw error; 
    }
  },
  staleTime: 5 * 60 * 1000,
  retry: false, 
});


  // add
  const addProduct = useMutation({
    mutationFn: (payload: FormData) => productService.addProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add product");
    },
  });

  // update
  const updateProduct = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FormData }) =>
      productService.updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  });

  // delete
  const deleteProduct = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to delete product");
    },
  });

  return {
    // query
    getProducts,

    // mutations
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
