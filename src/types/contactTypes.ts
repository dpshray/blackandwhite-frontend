export interface ContactResponse {
  message: string;
  data: ContactData;
  success: boolean;
}

export interface ContactData {
  data: ContactInfo[];
  meta: ContactMeta;
  links: ContactLinks;
}

export interface ContactMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ContactLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ContactInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
}