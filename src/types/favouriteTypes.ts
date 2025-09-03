export interface FavouriteVariant {
  size: string;
  color: string;
  price: number;
  discount_price: number;
  stock: number;
  images: string[];
}

export interface FavouriteItem {
  id: number;
  product_id: number;
  title: string;
  variant_id: number;
  variant: FavouriteVariant;
}

export interface FavouritesData {
  total_favourites: number;
  favourites: FavouriteItem[];
}

export interface FavouritesResponse {
  message: string;
  data: FavouritesData;
  success: boolean;
}
