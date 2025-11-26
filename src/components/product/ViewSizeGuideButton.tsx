"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import ProductImageModal from "../admin/product/ProductImageModal";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ViewSizeGuideButton({ image }: { image: string }) {
    const [open, setOpen] = useState(false);

    const photos = [image]; 

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(true)}
                        >
                        <Eye className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>View Size Guide Image</p>
                </TooltipContent>
            </Tooltip>

            <ProductImageModal
                open={open}
                onClose={() => setOpen(false)}
                photos={photos}
                title="Size Detail Image"
            />
        </>
    );
}
