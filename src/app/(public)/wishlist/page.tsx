'use client';

import ProductSection from "@/components/product/product-section";
import { useFavourites } from "@/hooks/useFavourite";

export default function WistlistPage() {
    const favourites = useFavourites();
    const products = favourites.data?.favourites || [];

    return (
        <div className="py-10">
            <ProductSection title="WHISTLIST" products={products as any} />
        </div>
    );
}