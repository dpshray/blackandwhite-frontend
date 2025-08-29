import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  image: string
  title: string
  originalPrice: number
  salePrice: number
  discount: number
}

interface ProductSectionProps {
  title: string
  products: Product[]
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      <Button size="lg" className="rounded-none mt-8 mx-auto block text-lg">
        View All
      </Button>
    </section>
  )
}
