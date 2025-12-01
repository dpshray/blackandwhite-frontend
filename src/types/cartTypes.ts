export interface CartVariant {
  id: number;
  size: string;
  color: string;  
  quantity: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number
  discount_price: number | null;
  variant: CartVariant;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: CartProduct;
}

export interface CartResponse {
  message: string;
  data: {
    data: CartItem[];
    total_cart: number;
    delivery_charge: number;
    subtotal: number;
    total: number;
  };
  success: boolean;
}