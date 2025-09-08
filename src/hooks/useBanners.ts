"use client";

import { bannerService } from "@/services/bannerServices";
import { BannerResponse } from "@/types/bannerTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useBanners = (
  page: number = 1,
  limit: number = 9
) => {
  const queryClient = useQueryClient();

  //  GET Banners
  const getBanners = useQuery<BannerResponse>({
    queryKey: ["banners", { page, limit }],
    queryFn: () => bannerService.getBanners({ page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  //  ADD Banner
  const addBanner = useMutation({
    mutationFn: (payload: FormData) => bannerService.addBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner added successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add banner");
    },
  });

  //  UPDATE Banner
  const updateBanner = useMutation({
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

  //  DELETE Banner
  const deleteBanner = useMutation({
    mutationFn: (id: number) => bannerService.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner deleted successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to delete banner");
    },
  });

  return {
    // query
    getBanners,

    // mutations
    addBanner,
    updateBanner,
    deleteBanner,
  };
};
