"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ProductCard from "@/components/product/product-card"
import type { Product } from "@/types/productTypes"
import { Button } from "@/components/ui/button"
import Pagination from "../Pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface ProductGridProps {
  products: Product[]
  totalPages: number
  currentPage: number
  category?: string
}

export default function ProductGrid({ products, totalPages, currentPage, category }: ProductGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState("best")

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="max-w-7xl mx-auto flex sm:flex-row flex-col gap-8 px-4 py-8">
      {/* Sidebar */}
      <aside className="w-full sm:w-56 space-y-6">
        {/* Sizes */}
        <div>
          <h3 className="font-semibold mb-2">SIZE</h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="font-semibold mb-2">COLOR</h3>
          <div className="flex gap-3">
            {["black", "white"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border ${selectedColor === color ? "ring-2 ring-black" : ""}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop</h2>
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold">SORT BY:</h3>
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best Seller</SelectItem>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              discount_price={product.discount_price ?? product.price}
              discount_percent={product.discount_percent}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />}
      </main>
    </div>
  )
}
