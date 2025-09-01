"use client";

import { productService } from "@/services/productServices";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (page: number = 1, size: number = 10) => {
  return useQuery({
    queryKey: ["products", page, size],
    queryFn: () => productService.getProducts(page, size),
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
  );
};
