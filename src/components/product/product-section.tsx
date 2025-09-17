'use client'

import { Product } from "@/types/productTypes"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { useFavourites } from "@/hooks/useFavourite"
import Link from "next/link"

interface ProductSectionProps {
  title: string
  products: Product[]
  link?: string
}

export default function ProductSection({ title, products, link }: ProductSectionProps) {
  const { data: favourites } = useFavourites();
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      
      {
        link && (
          <Link href={link}>
            <Button size="lg" className="rounded-none mt-8 mx-auto block text-lg">
              View All
            </Button>
          </Link>
        )
      }
    </section>
  )
}
