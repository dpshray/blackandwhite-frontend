"use client";

import { productService } from "@/services/productServices";
import { ProductsResponse } from "@/types/productTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = (page: number = 1, limit: number = 10) => {
  const queryClient = useQueryClient();

  // get
  const getProducts = useQuery<ProductsResponse>({
    queryKey: ["products", { page, limit }],
    queryFn: () => productService.getProducts(page, limit),
    staleTime: 5 * 60 * 1000,
  });

  // add
  const addProduct = useMutation({
    mutationFn: (payload: FormData) => productService.addProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // refresh list
    },
  });

  // update
  const updateProduct = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FormData }) =>
      productService.updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // delete
  const deleteProduct = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
