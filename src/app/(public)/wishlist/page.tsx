'use client';

import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavourites } from "@/hooks/useFavourite";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WistlistPage() {
    const { data, isLoading } = useFavourites();
    const favourites = data?.favourites || [];

    return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">WISHLIST</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-96" />
          ))}
        </div>
      ) : favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-600 text-lg space-y-2">
            <div className="flex items-center space-x-2">
                <span>No favourites yet!</span> <Heart className="fill-red-500"/>
            </div>
            <Link href="/shop">
                <Button>
                    Shop Now
                </Button>
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favourites.map((fav: any) => {
            const variant = fav.variant || {};
            return (
              <ProductCard
                key={fav.id}
                id={Number(fav.id)}
                image={variant.images?.[0] || "/placeholder.png"}
                title={fav.title}
                price={variant.price || 0}
                discount_price={variant.discount_price || 0}
                discount_percent={variant.discount_percent || 0}
                slug={fav.title.toLowerCase().replace(/\s+/g, "-")}
                category={`${variant.color || ""} ${variant.size ? `(${variant.size})` : ""}`}
                isFavourite={true} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}