export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  price: number | string;
  discount_price: number | string | null;
  discount_percent: number | null;
  stock: number | string;
  images: string[];
}

export interface UpdateProductVariant {
  id: number;
  size: string;
  color: string;
  price: string;
  discount_price: string | null;
  discount_percent: number | null;
  stock: string;
  images: string[];
}

export interface ProductCategory {
  categories_id: number;
  categories_title: string;
  categories_slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number | string;
  discount_price: number | string | null;
  discount_percent: number;
  pattern: string;
  fabric: string;
  material: string;
  image: string;
  categories: ProductCategory[];
  variants: ProductVariant[];
  isFavourite?: boolean;
}

export interface UpdateProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  discount_price: string | null;
  discount_percent: number;
  pattern: string;
  fabric: string;
  material: string;
  image: string;
  categories: ProductCategory[];
  variants: UpdateProductVariant[];
  isFavourite?: boolean;
}

export interface ProductsResponse {
  data: {
    data: Product[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    }
  };
  message: string;
}

export interface SingleProductResponse {
  data: Product | null;
  message: string;
}
