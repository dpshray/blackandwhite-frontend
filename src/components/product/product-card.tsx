'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAddToCart } from "@/hooks/useCart"
import { useAddFavourite, useRemoveFavourite } from "@/hooks/useFavourite"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: number
  image: string
  title: string
  price: number
  discount_price: number | null
  discount_percent: number
  category: string
  slug: string
  isFavourite?: boolean;
}

export default function ProductCard({ id, image, title, price, discount_price, discount_percent, category, slug, isFavourite }: ProductCardProps) {
  const addToFavMutation = useAddFavourite();
  const removeFromFavMutation = useRemoveFavourite();
  const addToCartMutation = useAddToCart();

  const handleFavourite = () => {
    if (isFavourite) {
      removeFromFavMutation.mutate(id);
    } else {
      addToFavMutation.mutate(id);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: id },
    );
  };

  return (
    <Card className="relative overflow-hidden group py-0">
      <div className="relative aspect-square">
        <Link href={`/shop/${category}/${slug}`}>
          <Image
            src={image || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount_percent > 0 && (
            <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium rounded">
              {discount_percent}% OFF
            </div>
          )}
        </Link>

        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          {/* Favourite Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            onClick={handleFavourite}
            disabled={addToFavMutation.isPending || removeFromFavMutation.isPending}
            className="absolute w-9 h-9 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavourite ? "fill-black" : "text-gray-600"
            }`}
          />
        </Button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 line-through">Rs.{price}</span>
          <span className="text-sm font-medium">Rs.{discount_price}</span>
        </div>
        <Button
          className="w-full bg-white text-black border border-gray-300 hover:bg-gray-50"
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending}
        >
          {addToCartMutation.isPending ? "Adding..." : "Add to cart"}
        </Button>      
      </div>
    </Card>
  )
}
