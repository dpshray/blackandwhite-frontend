"use client";

import { productService } from "@/services/productServices";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => productService.getProducts(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
  );
};
