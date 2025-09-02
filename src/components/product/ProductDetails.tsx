"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShopBreadCrumb } from "@/components/ShopBreadCrumb";
import { useAddToCart } from "@/hooks/useCart";
import { useAddFavourite } from "@/hooks/useFavourite";
import { ProductVariant } from "@/types/productTypes";

interface ProductDetailsProps {
  product: any;
  breadcrumbs: Array<{ label: React.ReactNode; href: string }>;
}


export default function ProductDetails({ product, breadcrumbs }: ProductDetailsProps) {
    const addToCart = useAddToCart();
    const addFavourite = useAddFavourite();
    const colors = Array.from(new Set(product.variants.map((v: ProductVariant) => v.color)));
    const sizes = Array.from(new Set(product.variants.map((v: ProductVariant) => v.size)));
    const allVariantImages = product.variants.flatMap((v: ProductVariant) => v.images);
    return (
        <div className="container max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="mb-4">
                <ShopBreadCrumb items={breadcrumbs}/>
            </div>


            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-10">
                {/* Images */}
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="flex flex-row md:flex-col items-center justify-center sm:justify-start gap-2">
                        {allVariantImages.map((img: string, i: number) => (
                            <Image
                                key={i}
                                src={img}
                                alt={`variant ${i}`}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover border"
                            />
                            ))}
                    </div>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={500}
                        className="rounded-xl object-cover"
                    />
                </div>

            {/* Info */}
                <div className="space-y-4">

                    <h1 className="text-3xl font-normal uppercase">{product.title}</h1>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4 text-3xl">
                        {product.discount_price ? (
                        <>
                            <span className="line-through text-gray-400">Rs. {product.price}</span>
                            <span>Rs. {product.discount_price}</span>
                        </>
                        ) : (
                        <span>Rs. {product.price}</span>
                        )}
                    </div>

                    {/* Attributes */}
                    <ul className="text-xl space-y-2">
                        {product.pattern && <li>Pattern: <span className="capitalize ml-2 text-muted-foreground">{product.pattern}</span></li>}
                        {product.fabric && <li>Fabric: <span className="capitalize ml-2 text-muted-foreground">{product.fabric}</span></li>}
                        {product.material && <li>Material: <span className="capitalize ml-2 text-muted-foreground">{product.material}</span></li>}
                    </ul>

                    {/* Colors and Sizes*/}
                    <div className="flex md:flex-row flex-col md:gap-14">
                        <div>
                            <b>Color:</b>
                            <div className="flex gap-2 mt-2">
                            {colors.map((color: any) => (
                                <span key={color} className="px-3 py-1 border rounded">{color}</span>
                            ))}
                            </div>
                        </div>

                       <div>
                            <b>Size:</b>
                            <div className="flex gap-2 mt-2">
                            {sizes.map((size: any) => (
                                <span key={size} className="px-3 py-1 border rounded">{size}</span>
                            ))}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button
                            className="bg-black text-white"
                            onClick={() => addToCart.mutate({ product_id: product.id, quantity: 1 })}
                        >
                            ADD TO CART
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => addFavourite.mutate(product.id)}
                        >
                            ADD TO FAVOURITE
                        </Button>
                    </div>
                </div>
            </div>

        {/* Related Products */}
        {/* <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item: any) => (
                <ProductCard
                key={item.id}
                image={item.image}
                title={item.title}
                originalPrice={item.price}
                salePrice={item.discount_price}
                discount={item.discount_percent}
                />
            ))}
            </div>
        </section> */}
        </div>
    );
}
