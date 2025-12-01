export interface FavouriteVariant {
  size: string;
  color: string;
  stock: number;
}

export interface FavouriteCategory {
  id: number;
  slug: string;
  name: string;
}

export interface FavouriteItem {
  id: number;
  product_id: number;
  title: string;
  images: string[];
  price: number;
  discount_price: number;
  discount_percent: number;
  categories: FavouriteCategory[];
  slug: string;
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
