"use client";

import { categoriesService } from "@/services/categoryServices";
import { CategoriesResponse } from "@/types/categoryTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useCategories = (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  const queryClient = useQueryClient();

  //  GET Categories
  const getCategories = useQuery<CategoriesResponse>({
    queryKey: ["categories", { page, limit, search }],
    queryFn: () => categoriesService.getCategories({ page, limit, search }),
    staleTime: 5 * 60 * 1000,
  });

  //  ADD Category
  const addCategory = useMutation({
    mutationFn: (payload: FormData) => categoriesService.addCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category added successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add category");
    },
  });

  //  UPDATE Category
  const updateCategory = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FormData }) =>
      categoriesService.updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to update category");
    },
  });

  //  DELETE Category
  const deleteCategory = useMutation({
    mutationFn: (id: number) => categoriesService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to delete category");
    },
  });

  return {
    // query
    getCategories,

    // mutations
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
