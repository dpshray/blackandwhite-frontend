"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShopBreadCrumb } from "@/components/ShopBreadCrumb";
import { useAddToCart, useBuyNow } from "@/hooks/useCart";
import { useAddFavourite, useFavourites } from "@/hooks/useFavourite";
import { ProductVariant } from "@/types/productTypes";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, Share2 } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import LoginModal from "../auth/LoginModal";
import { useRouter } from "next/navigation";
import ViewSizeGuideButton from "./ViewSizeGuideButton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "../ui/badge";

interface ProductDetailsProps {
  product: any;
  breadcrumbs: Array<{ label: React.ReactNode; href: string }>;
}

export default function ProductDetails({
  product,
  breadcrumbs,
}: ProductDetailsProps) {
  const buyNow = useBuyNow();
  const router = useRouter();
  const addToCart = useAddToCart();
  const addFavourite = useAddFavourite();
  const { data: favourites } = useFavourites();
  console.log("ppppp", product)

  const { user } = useAuth();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(product.image[0] );
  const [quantity, setQuantity] = useState<number>(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
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
      toast.warning("Please select a color and size");
      return;
    }
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    addToCart.mutate({
      product_id: product.id,
      variant_id: selectedVariant.id,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      toast.warning("Please select a color and size");
      return;
    }
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

  // Save Buy Now item into localStorage
    const buyNowItem = {
      product_id: product.id,
      variant_id: selectedVariant.id,
      title: product.title,
      image: selectedImage,
      color: selectedVariant.color,
      size: selectedVariant.size,
      quantity,
      price: product.discount_price || product.price,
    };

    localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));

    // Call API only if backend needs it
    buyNow.mutate(
      {
        product_id: product.id,
        variant_id: selectedVariant.id,
        quantity,
      },
      {
        onSuccess: () => {
          router.push("/checkout?mode=buy-now");
        },
      }
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: product.description || "Check out this product!",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // fallback - copy link
      navigator.clipboard.writeText(shareData.url);
      toast("Link copied to clipboard!");
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <ShopBreadCrumb items={breadcrumbs} />
      </div>

      {/* Product Details */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Images */}
        <div className="flex sm:flex-row flex-col gap-6">
          {/* Thumbnails */}
          <div className="flex sm:flex-col flex-row gap-2 sm:order-1 order-2">
            {product.image && product.image.length > 4 ? (
              <Carousel orientation="vertical" className="sm:w-[120px] w-full hidden sm:block relative mt-6">
                <CarouselContent className="h-[460px]">
                  {product.image.map((img: string, i: number) => (
                    <CarouselItem key={i} className="basis-1/4 pl-2">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Product variant ${i}`}
                        width={90}
                        height={90}
                        onClick={() => setSelectedImage(img)}
                        className={`rounded-lg object-cover border cursor-pointer transition ${
                          selectedImage === img ? "border-black " : "border-gray-200"
                        }`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="top-0 left-1/2 -translate-x-1/2 -translate-y-8" />
                <CarouselNext className="bottom-0 left-1/2 -translate-x-1/2 translate-y-8" />
              </Carousel>
            ) : null}

            {/* Horizontal carousel for mobile only */}
            {product.image && product.image.length > 4 ? (
              <Carousel orientation="horizontal" className="sm:hidden w-full block relative">
                <CarouselContent>
                  {product.image.map((img: string, i: number) => (
                    <CarouselItem key={i} className="basis-1/3 pl-2">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Product variant ${i}`}
                        width={90}
                        height={90}
                        onClick={() => setSelectedImage(img)}
                        className={`rounded-lg object-cover border cursor-pointer transition flex-shrink-0 ${
                          selectedImage === img ? "border-black scale-105" : "border-gray-200"
                        }`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-2" />
                <CarouselNext className="-right-2" />
              </Carousel>
            ) : (
              <div className="flex flex-row gap-2 w-full overflow-x-hidden pb-2 sm:flex-col sm:w-full">
                {product.image &&
                  product.image.map((img: string, i: number) => (
                    <Image
                      key={i}
                      src={img || "/placeholder.svg"}
                      alt={`Product variant ${i}`}
                      width={90}
                      height={90}
                      onClick={() => setSelectedImage(img)}
                      className={`rounded-lg object-cover border cursor-pointer transition flex-shrink-0 ${
                        selectedImage === img ? "border-black" : "border-gray-200"
                      }`}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* Big Image */}
          <div className="relative w-full h-[450px] sm:order-2 order-1">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>


        {/* Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-balance leading-tight">{product.title}</h1>
            <Badge className="rounded-none">{product.categories[0].categories_title}</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center justify-between">
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
              {/* <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.8) • 127 reviews</span> */}
              <Button onClick={handleShare} aria-label="Share product" variant="ghost">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

          </div>

          {/* Attributes */}
          <ul className="space-y-2 text-sm py-2">
            {product.product_code && (
              <li className="flex gap-4 pb-1">
                <span className="text-muted-foreground">Product ID:</span>
                <span className="capitalize font-medium">{product.product_code}</span>
              </li>
            )
            }
            {product.pattern && (
              <li className="flex gap-4 pb-1">
                <span className="text-muted-foreground">Pattern:</span>
                <span className="capitalize font-medium">{product.pattern}</span>
              </li>
            )}
            {product.fabric && (
              <li className="flex gap-4 pb-1">
                <span className="text-muted-foreground">Fabric:</span>
                <span className="capitalize font-medium">{product.fabric}</span>
              </li>
            )}
            {product.material && (
              <li className="flex gap-4 pb-1">
                <span className="text-muted-foreground">Material:</span>
                <span className="capitalize font-medium">{product.material}</span>
              </li>
            )}
          </ul>


          {/* Colors and Sizes */}
          <div className="flex md:flex-row flex-col md:gap-14 gap-6">
            <div className="min-w-[150px]">
              <b>Color:</b>
              <div className="flex gap-2 mt-2">
                {availableColors.map((color: string) => {
                  const isSelected = selectedColor === color;
                  const isDisabled = !product.variants.some(
                    (v: ProductVariant) =>
                      v.color === color && (!selectedSize || v.size === selectedSize)
                  );

                   return (
                    <Button
                      key={color}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      disabled={isDisabled}
                      onClick={() => setSelectedColor(isSelected ? null : color)}
                      className="capitalize rounded-none"
                    >
                      {color}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="min-w-[150px]">
              <b>Size:</b>
              <div className="flex gap-2 mt-2">
                {availableSizes.map((size: string) => {
                  const isSelected = selectedSize === size;
                  const isDisabled = !product.variants.some(
                    (v: ProductVariant) =>
                      v.size === size && (!selectedColor || v.color === selectedColor)
                  );

                  return (
                    <Button
                      key={size}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      disabled={isDisabled}
                      onClick={() => setSelectedSize(isSelected ? null : size)}
                      className="capitalize rounded-none"
                    >
                      {size}
                    </Button>
                  );
                })}
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
                className="rounded-none"
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                onClick={() => setQuantity(quantity + 1)}
                size="sm"
                variant="outline"
                className="rounded-none"
              >
                +
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleBuyNow}
              disabled={buyNow.isPending}
              className="rounded-none"
            >
              {buyNow.isPending ? "PROCESSING..." : "BUY NOW"}
            </Button>

            <Button
                variant={"outline"}
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
                aria-label="Add to cart"
                className="rounded-none"
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
            {product.size_detail && (
              <ViewSizeGuideButton image={product.size_detail} />
            )}
          </div>
        </div>
      </div>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
}