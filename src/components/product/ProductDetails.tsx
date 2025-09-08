"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShopBreadCrumb } from "@/components/ShopBreadCrumb";
import { useAddToCart } from "@/hooks/useCart";
import { useAddFavourite, useFavourites } from "@/hooks/useFavourite";
import { ProductVariant } from "@/types/productTypes";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, Star } from "lucide-react";

interface ProductDetailsProps {
  product: any;
  breadcrumbs: Array<{ label: React.ReactNode; href: string }>;
}

export default function ProductDetails({
  product,
  breadcrumbs,
}: ProductDetailsProps) {
  const addToCart = useAddToCart();
  const addFavourite = useAddFavourite();
  const { data: favourites } = useFavourites();

  const allVariantImages = product.variants.flatMap(
    (v: ProductVariant) => v.images
  );

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(
    allVariantImages[0] || product.image
    );
  const [quantity, setQuantity] = useState<number>(1);
  const isFavourite = favourites?.favourites.some((fav: any) => fav.product_id === product.id);

  const availableColors: string[] = selectedSize
    ? Array.from(
        new Set(
          product.variants
            .filter((v: ProductVariant) => v.size === selectedSize)
            .map((v: ProductVariant) => v.color)
        )
      )
    : Array.from(new Set(product.variants.map((v: ProductVariant) => v.color)));

    const availableSizes: string[] = selectedColor
        ? Array.from(
            new Set(
            product.variants
                .filter((v: ProductVariant) => v.color === selectedColor)
                .map((v: ProductVariant) => v.size)
            )
        )
        : Array.from(new Set(product.variants.map((v: ProductVariant) => v.size)));

    const selectedVariant = product.variants.find(
        (v: ProductVariant) => v.color === selectedColor && v.size === selectedSize
    );

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast("Please select a color and size");
      return;
    }
    addToCart.mutate({
      product_id: product.id,
      variant_id: selectedVariant.id,
      quantity,
    });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <ShopBreadCrumb items={breadcrumbs} />
      </div>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Images */}
        <div className="flex md:flex-row flex-col gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col items-center justify-center sm:justify-start gap-2">
                {allVariantImages.map((img: string, i: number) => (
                <Image
                    key={i}
                    src={img}
                    alt={`variant ${i}`}
                    width={90}
                    height={90}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-lg object-cover border cursor-pointer transition 
                    ${selectedImage === img ? "border-black scale-105" : "border-gray-200"}`}
                />
                ))}
            </div>

            {/* Big Image */}
            <Image
                src={selectedImage}
                alt={product.title}
                width={400}
                height={400}
                className="rounded-xl object-cover transition-all duration-300"
            />
        </div>


        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-balance leading-tight">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4 text-3xl text-primary font-bold">
            {product.discount_price ? (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  Rs. {product.price}
                </span>
                <span>Rs. {product.discount_price}</span>
              </>
            ) : (
              <span>Rs. {product.price}</span>
            )}
          </div>

          {/* Rating placeholder */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.8) • 127 reviews</span>
            </div>

          {/* Attributes */}
          <ul className="flex text-xl space-x-10">
            {product.pattern && (
              <li>
                <span className="text-sm text-muted-foreground">Pattern:{" "}</span>
                <span className="capitalize ml-2 font-medium">
                  {product.pattern}
                </span>
              </li>
            )}
            {product.fabric && (
              <li>
                <span className="text-sm text-muted-foreground">Fabric:{" "}</span>
                <span className="capitalize ml-2 font-medium">
                  {product.fabric}
                </span>
              </li>
            )}
            {product.material && (
              <li>
                <span className="text-sm text-muted-foreground">Material:{" "}</span>
                <span className="capitalize ml-2 font-medium">
                  {product.material}
                </span>
              </li>
            )}
          </ul>

          {/* Colors and Sizes */}
          <div className="flex md:flex-row flex-col md:gap-14 gap-6">
            <div className="min-w-[150px]">
              <b>Color:</b>
              <div className="flex gap-2 mt-2">
                {availableColors.map((color: string) => (
                  <span
                    key={color}
                    className={`px-3 py-1 border rounded cursor-pointer transition-colors ${
                      selectedColor === color
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-200"
                    } ${
                      !product.variants.some(
                        (v: ProductVariant) =>
                          v.color === color &&
                          (!selectedSize || v.size === selectedSize)
                      )
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="min-w-[150px]">
              <b>Size:</b>
              <div className="flex gap-2 mt-2">
                {availableSizes.map((size: string) => (
                  <span
                    key={size}
                    className={`px-3 py-1 border rounded cursor-pointer transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-200"
                    } ${
                      !product.variants.some(
                        (v: ProductVariant) =>
                          v.size === size &&
                          (!selectedColor || v.color === selectedColor)
                      )
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <b>Quantity:</b>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                size="sm"
                variant="outline"
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                onClick={() => setQuantity(quantity + 1)}
                size="sm"
                variant="outline"
              >
                +
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
                // onClick={handleAddToCheckout}
                // disabled={addToCheckout.isPending}
                disabled
            >
              {/* {addToCheckout.isPending ? "ADDING..." : "ADD TO Checkout"} */}
              BUY NOW
            </Button>
            <Button
                variant={"outline"}
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
                aria-label="Add to cart"
            >
              {addToCart.isPending ? "ADDING..." : "ADD TO CART"}
            </Button>

            <Button
              variant="ghost"
              onClick={() => addFavourite.mutate(product.id)}
              disabled={addFavourite.isPending}
            >
              <Heart
                size={20}
                className={isFavourite ? "fill-black" : "stroke-gray-500"}
                />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}