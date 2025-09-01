'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
  image: string
  title: string
  price: number
  discount_price: number | null
  discount_percent: number
}

export default function ProductCard({ image, title, price, discount_price, discount_percent }: ProductCardProps) {
  const [favourite, setFavourite] = useState(false)
  return (
    <Card className="relative overflow-hidden group py-0">
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount_percent > 0 && (
          <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium rounded">
            {discount_percent}% OFF
          </div>
        )}

        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          {/* Favourite Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            onClick={() => setFavourite(!favourite)}
            className="absolute w-9 h-9 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
          <Heart
            className={`h-5 w-5 transition-colors ${
              favourite ? "fill-red-500 text-red-500" : "text-gray-600"
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
        <Button className="w-full bg-white text-black border border-gray-300 hover:bg-gray-50">Add to cart</Button>
      </div>
    </Card>
  )
}
