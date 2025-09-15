"use client";

import { bannerService } from "@/services/bannerServices";
import { BannerResponse } from "@/types/bannerTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

//get
export const useGetBanners = (page: number = 1, limit: number = 9) => {
  return useQuery<BannerResponse>({
    queryKey: ["banners", page, limit],
    queryFn: () => bannerService.getBanners({ page, limit }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

//add
export const useAddBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => bannerService.addBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner added successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add banner");
    },
  });
};

//update
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FormData }) =>
      bannerService.updateBanner(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner updated successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to update banner");
    },
  });
};

//delete
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => bannerService.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner deleted successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to delete banner");
    },
  });
};
