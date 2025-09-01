export interface Category {
  id: number
  title: string
  slug: string
}

export interface CategoriesMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CategoriesLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface CategoriesData {
  data: Category[]
  meta: CategoriesMeta
  links: CategoriesLinks
}

export interface CategoriesResponse {
  message: string
  data: CategoriesData
  success: boolean
}