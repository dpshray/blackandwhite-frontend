export interface Banner {
  id: number
  title: string
  subtitle: string
  url: string
  image: string
}

export interface BannerResponse {
  message: string
  data: Banner[]
  success: boolean
}
