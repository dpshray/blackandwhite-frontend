export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  stock: number | string;
}

export interface UpdateProductVariant {
  id: number;
  size: string;
  color: string;
  stock: string;
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
  image: string[];
  categories: ProductCategory[];
  size_detail: string | null;
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

export interface BuyNowItem {
  product_id: number;
  variant_id: number;
  title: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

