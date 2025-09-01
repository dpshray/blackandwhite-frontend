// app/shop/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product/product-card"

interface Product {
  id: number
  image: string
  title: string
  originalPrice: number
  salePrice: number
  discount: number
}

const products: Product[] = [
  {
    id: 1,
    title: "Minimalistic Black Hoodie",
    image: "/hoodie-black.jpg",
    originalPrice: 2800,
    salePrice: 2600,
    discount: 11,
  },
  {
    id: 2,
    title: "Minimalistic White Hoodie",
    image: "/hoodie-white.jpg",
    originalPrice: 2900,
    salePrice: 2600,
    discount: 10,
  },
  {
    id: 3,
    title: "Streetwear Hoodie",
    image: "/hoodie-street.jpg",
    originalPrice: 3000,
    salePrice: 2700,
    discount: 10,
  },
  {
    id: 4,
    title: "Classic Black Hoodie",
    image: "/hoodie-classic.jpg",
    originalPrice: 2800,
    salePrice: 2500,
    discount: 12,
  },
]

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  return (
    <div className="flex gap-8 p-6">
      {/* Sidebar */}
      <aside className="w-56 space-y-6">
        {/* Sort */}
        <div>
          <h3 className="font-semibold mb-2">SORT BY:</h3>
          <select className="w-full border rounded-md p-2">
            <option value="best">Best Seller</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

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
            <button
              onClick={() => setSelectedColor("black")}
              className={`w-8 h-8 rounded-full border ${
                selectedColor === "black" ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: "black" }}
            />
            <button
              onClick={() => setSelectedColor("white")}
              className={`w-8 h-8 rounded-full border ${
                selectedColor === "white" ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              originalPrice={product.originalPrice}
              salePrice={product.salePrice}
              discount={product.discount}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="sm">
            {"<"}
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            {">"}
          </Button>
        </div>
      </main>
    </div>
  )
}
