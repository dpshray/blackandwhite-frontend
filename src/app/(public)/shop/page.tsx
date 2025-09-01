import ProductGrid from "@/components/product/ProductGrid"
import { getProducts } from "@/lib/server-api"

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const currentPage = Number.parseInt(params.page || "1", 9)

  const productResponse = await getProducts(currentPage, 9)
  const products = productResponse.data.data
  const totalPages = productResponse.data.meta.last_page

  return (
    <div className="min-h-screen bg-background">
      <ProductGrid products={products} totalPages={totalPages} currentPage={currentPage} />
    </div>
  )
}
