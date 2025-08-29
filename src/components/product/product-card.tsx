import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  image: string
  title: string
  originalPrice: number
  salePrice: number
  discount: number
}

export default function ProductCard({ image, title, originalPrice, salePrice, discount }: ProductCardProps) {
  return (
    <Card className="relative overflow-hidden group py-0">
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium">{discount}% OFF</div>
        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Button variant={"ghost"} size="icon" aria-label="Wishlist"><Heart className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 line-through">Rs.{originalPrice}</span>
          <span className="text-sm font-medium">Rs.{salePrice}</span>
        </div>
        <Button className="w-full bg-white text-black border border-gray-300 hover:bg-gray-50">Add to cart</Button>
      </div>
    </Card>
  )
}
