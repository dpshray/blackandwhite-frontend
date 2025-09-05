"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Eye, Package, Palette, Ruler } from "lucide-react";
import Link from "next/link";
import { ProductVariant } from "@/types/productTypes";

interface VariantDetailsDialogProps {
  variants: ProductVariant[];
}

export default function VariantModal({ variants }: VariantDetailsDialogProps) {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "destructive" };
    if (stock < 10) return { label: "Low Stock", color: "secondary" };
    return { label: "In Stock", color: "default" };
  };

  const hasDiscount = (price: number, discountPrice?: number | null) => {
    return discountPrice !== null && discountPrice !== undefined && discountPrice < price;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-slate-50 transition-colors bg-transparent"
        >
          <Eye className="w-4 h-4" /> ({variants?.length || 0})
        </Button>
      </DialogTrigger>
        
        <DialogContent className="max-h-[90vh] overflow-hidden">
            <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                Product Variants
            </DialogTitle>
            <DialogDescription className="text-slate-600">
                Explore all available variants with detailed specifications and pricing
            </DialogDescription>
            </DialogHeader>

            <div className="overflow-y-auto pr-2 max-h-[calc(85vh-120px)] py-2">
            {variants?.length > 0 ? (
                <div className="space-y-6">
                {variants.map((variant, index) => {
                    const stockStatus = getStockStatus(variant.stock);
                    const discounted = hasDiscount(variant.price, variant.discount_price);

                    return (
                    <div
                        key={variant.id || index}
                        className="group bg-white border border-slate-200 rounded-2xl p-4 space-y-4 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                    >
                        {/* Header with Stock Status */}
                        <div className="flex justify-between items-start">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs font-medium">
                            Variant {index + 1}
                            </Badge>
                            <Badge variant={stockStatus.color as any} className="text-xs">
                            {stockStatus.label}
                            </Badge>
                        </div>
                        {discounted && variant.discount_percent && (
                            <Badge variant="secondary" className="flex items-center gap-1 text-green-700 bg-green-100 border-green-300">
                                {variant.discount_percent}% Off
                            </Badge>
                        )}
                        </div>

                        {/* Images Section */}
                        <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            Product Images
                        </h4>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {variant.images && variant.images.length > 0 ? (
                            variant.images.map((img, idx) => (
                                <Link
                                href={img || ""}
                                key={idx}
                                className="relative flex-shrink-0 aspect-[5/3]"
                                target="_blank"
                                >
                                <Image
                                    src={img || "/placeholder.svg"}
                                    alt={`Variant ${index + 1} - Image ${idx + 1}`}
                                    width={100}
                                    height={100}
                                    className="rounded-xl object-cover border-2 border-slate-100 hover:border-blue-300 transition-colors"
                                />
                                </Link>
                            ))
                            ) : (
                            <div className="w-[100px] h-[100px] bg-slate-50 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200">
                                <Package className="w-6 h-6 text-slate-400" />
                            </div>
                            )}
                        </div>
                        </div>

                        {/* Specifications Grid */}
                        <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">Specifications</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Ruler className="w-4 h-4 text-slate-500" />
                            <div>
                                <p className="text-xs text-slate-500">Size</p>
                                <p className="font-medium text-slate-900">{variant.size || "N/A"}</p>
                            </div>
                            </div>

                            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Palette className="w-4 h-4 text-slate-500" />
                            <div>
                                <p className="text-xs text-slate-500">Color</p>
                                <p className="font-medium text-slate-900">{variant.color || "N/A"}</p>
                            </div>
                            </div>

                            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Package className="w-4 h-4 text-slate-500" />
                            <div>
                                <p className="text-xs text-slate-500">Stock</p>
                                <p className="font-medium text-slate-900">
                                {variant.stock} units
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">Price</span>
                            </div>
                            <div className="text-right">
                            {discounted ? (
                                <div className="space-y-1">
                                <p className="text-lg font-bold text-green-600">
                                    Rs. {variant.discount_price}
                                </p>
                                <p className="text-sm text-slate-500 line-through">
                                    Rs. {variant.price}
                                </p>
                                </div>
                            ) : (
                                <p className="text-lg font-bold text-slate-900">
                                Rs. {variant.price}
                                </p>
                            )}
                            </div>
                        </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                    No Variants Available
                </h3>
                <p className="text-slate-500">
                    This product doesn&apos;t have any variants configured yet.
                </p>
                </div>
            )}
            </div>
        </DialogContent>
    </Dialog>
  );
}
