import { favouriteService } from "@/services/favouriteServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
};

export const useRemoveFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favouriteService.removeFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
};
