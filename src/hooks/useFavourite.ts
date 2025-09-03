import { favouriteService } from "@/services/favouriteServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useFavourites = () => {
  return useQuery({
    queryKey: ["favourites"],
    queryFn: favouriteService.getFavourites,
  });
};

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favouriteService.addFavourite,
    onSuccess: (res) => {
      toast.success(res.message || "Product added to favourites successfully");
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to add to favourites");
    },
  });
};

export const useRemoveFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favouriteService.removeFavourite,
    onSuccess: (res) => {
      toast.success(res.message || "Item removed from favourites");
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to remove item");
    },
  });
};
