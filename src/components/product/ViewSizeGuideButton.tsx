"use client";

import { useState } from "react";
import ProductImageModal from "../admin/product/ProductImageModal";
import { Button } from "../ui/button";

export default function ViewSizeGuideButton({ image }: { image: string }) {
    const [open, setOpen] = useState(false);

    const photos = [image]; 

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                >
                Size Details
            </Button>

            <ProductImageModal
                open={open}
                onClose={() => setOpen(false)}
                photos={photos}
                title="Size Detail Image"
            />
        </>
    );
}
