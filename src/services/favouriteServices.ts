import axiosInstance from "@/lib/axios";

export const favouriteService = {
  getFavourites: async () => {
    const { data } = await axiosInstance.get("/favourites");
    return data;
  },

  addFavourite: async (product_id: number) => {
    const { data } = await axiosInstance.post("/favourites", { product_id });
    return data;
  },

  removeFavourite: async (product_id: number) => {
    const { data } = await axiosInstance.delete(`/favourites/${product_id}`);
    return data;
  },
};
