import ProductGrid from "@/components/product/ProductGrid"
import { getProducts } from "@/lib/server-api"

interface CategoryPageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params
  const query = await searchParams

  const currentPage = Number.parseInt(query.page || "1", 10)

  // Fetch products filtered by category
  const productResponse = await getProducts(currentPage, 9, category)
  const products = productResponse.data.data
  const totalPages = productResponse.data.meta.last_page

  return (
    <div className="min-h-screen bg-background">
      <ProductGrid
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        category={category} 
      />
    </div>
  )
}
