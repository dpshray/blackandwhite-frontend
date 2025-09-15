export interface Banner {
  id: number
  title: string
  subtitle: string
  url: string
  image: string
}

export interface BannerResponse {
  message: string
  data: BannerData
  success: boolean
}

export interface BannerData {
  data: Banner[];
  meta: BannerMeta;
}

export interface BannerMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}