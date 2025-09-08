export interface User {
  id: number;
  name: string;
  mobile_number: string;
  email: string;
  is_admin: number;
  email_verified_at: string | null;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface UserResponse {
  message: string;
  data: {
    data: User[];
    meta: Meta;
    links: Links;
  };
  success: boolean;
}
