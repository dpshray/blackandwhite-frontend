export interface OrderItem {
  product_name: string;
  variant_size: string;
  variant_color: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: number;
  total_amount: string;
  status: string;
  items: OrderItem[];
}

export interface OrderMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface OrderLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface OrderHistoryResponse {
  message: string;
  data: {
    orders: Order[];
    meta: OrderMeta;
    links: OrderLinks;
  };
  success: boolean;
}

// For creating an order
// export interface AddOrderItem {
//   product_id: number;
//   variant_id: number;
//   quantity: number;
// }

// export interface AddOrderPayload {
//   items: AddOrderItem[];
// }

// export interface AddOrderResponse {
//   success: boolean;
//   message: string;
//   data?: any; 
// }
