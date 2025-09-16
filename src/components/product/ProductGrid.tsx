"use client"

import { useRouter, useSearchParams } from "next/navigation"
import ProductCard from "@/components/product/product-card"
import type { Product } from "@/types/productTypes"
import { Button } from "@/components/ui/button"
import Pagination from "../Pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ShopBreadCrumb } from "../ShopBreadCrumb"
import { Home, SearchX } from "lucide-react"
import { useFavourites } from "@/hooks/useFavourite"
import Link from "next/link"
import { useTransition } from "react"
import { Skeleton } from "../ui/skeleton"

interface ProductGridProps {
  products: Product[]
  totalPages: number
  currentPage: number
  category?: string
}

export default function ProductGrid({ products, totalPages, currentPage, category }: ProductGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const { data: favourites } = useFavourites();
  const selectedSize = searchParams.get("size")
  const selectedColor = searchParams.get("color")
  const sortOption = searchParams.get("sort") ?? "";

  const breadcrumbs = [
    { label: < Home />, href: '/' },
    { label: 'Shop', href: '/shop' },
  ];

  if (category) {
    breadcrumbs.push({
      label: category?.toString() ?? 'Category',
      href: `/shop/${category}`,
    });
  }

  const updateFilters = (newFilters: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filters change
    params.set("page", "1")

    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  const handleSizeChange = (size: string) => {
    updateFilters({ size: selectedSize === size ? null : size })
  }

  const handleColorChange = (color: string) => {
    updateFilters({ color: selectedColor === color ? null : color })
  }

  const handleSortChange = (sort: string) => {
    updateFilters({ sort })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4">
          <ShopBreadCrumb items={breadcrumbs}/>
      </div>

      <div className="flex sm:flex-row flex-col gap-8">
        {/* Sidebar */}
        <aside className="w-full sm:w-56 space-y-6 sm:sticky sm:top-24 sm:self-start">
          {/* Sizes */}
          <div>
            <h3 className="font-semibold mb-2">SIZE</h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSizeChange(size)}
                  className="min-w-[40px]"
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
              {[
                { name: "black", value: "black" },
                { name: "white", value: "white" },
              ].map((color) => (
                <Button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  className={`rounded-full border-2 transition-all ${
                    selectedColor === color.value
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:ring-1 hover:ring-primary/50"
                  }`}
                  style={{
                    backgroundColor: color.value,
                    borderColor: color.value === "white" ? "#e5e7eb" : color.value,
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Sort */}
          <div className="flex items-center justify-end space-x-4 mb-6">
            <h3 className="font-semibold">SORT BY:</h3>
            <Select value={sortOption} onValueChange={(value) => handleSortChange(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best_seller">Best Seller</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high ">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <SearchX className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-xl sm:text-3xl font-semibold">No Products Found</h2>
              <p className="text-gray-500 mt-2 ">
                We couldn&apos;t find any products matching your filters. Try adjusting them or browse our full
                collection.
              </p>
              <div className="mt-6 flex gap-4">
                <Link href="/"><Button>Go Home</Button></Link>
                <Link href="/shop">
                  <Button variant="outline">Browse Shop</Button>
                </Link>
              </div>
            </div>
          ) : (
            isPending ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-72"
                  />
                ))}
              </div>
          ) : 
            <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const favObj = favourites?.favourites?.find((fav: any) => String(fav.product_id) === String(product.id));
              const isFav = !!favObj; 
              const favId = favObj?.id;

              return (  
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  image={product.image[0]}
                  title={product.title}
                  price={Number(product.price)}
                  discount_price={Number(product.discount_price)}
                  discount_percent={product.discount_percent}
                  slug={product.slug} 
                  category={product.categories?.map(c => c.categories_title).join(", ") || "Uncategorized"}
                  isFavourite={isFav}
                  favouriteId={favId}
                />
              )
            })}
          </div>
          </>
          )}

          {/* Pagination */}
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />}
        </main>
      </div>
    </div>
  )
}
