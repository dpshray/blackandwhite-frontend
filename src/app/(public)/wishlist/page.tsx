import ProductSection from "@/components/product/product-section";
import { useFavourites } from "@/hooks/useFavourite";

export default function WistlistPage() {
    const favourites = useFavourites();
    const products = favourites.data?.favourites || [];

    return (
        <div>
            <h1>Wistlist</h1>
            <ProductSection title="NEW ARRIVALS" products={products as any} />
        </div>
    );
}