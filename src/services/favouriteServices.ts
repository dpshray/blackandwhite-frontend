import axiosInstance from "@/lib/axios";
import { FavouritesResponse } from "@/types/favouriteTypes";

export const favouriteService = {
  getFavourites: async () => {
    const { data } = await axiosInstance.get<FavouritesResponse>("/view-favourites");
    return data.data;
  },

  addFavourite: async (product_id: number) => {
    const { data } = await axiosInstance.post("/add-favourites", { product_id });
    return data;
  },

  removeFavourite: async (product_id: number) => {
    const { data } = await axiosInstance.delete(`/remove-favourite/${product_id}`);
    return data;
  },
};
