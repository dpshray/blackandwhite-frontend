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

//All Orders
export interface OrderItem {
  product_name: string;
  variant_size: string;
  variant_color: string;
  quantity: number;
  price: number;
  image: string;
}

export interface BillingInformation {
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  city: string;
  address: string;
  contact_number: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AllOrder {
  id: number;
  total_amount: string;
  status: string;
  created_at: string;
  user: User;
  billing_information: BillingInformation;
  items: OrderItem[];
}

export interface OrderMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface AllOrderData {
  data: AllOrder[];
  meta: OrderMeta;
  links: OrderLinks;
}

export interface AllOrderResponse {
  message: string;
  data: AllOrderData;
  success: boolean;
}