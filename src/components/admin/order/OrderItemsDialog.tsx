"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface VariantItem {
    product_id: string | number;
    product_name: string | null;
    variant_size: string | null;
    variant_color: string | null;
    quantity: number;
    price: number;
}

interface OrderItemsDialogProps {
    items: VariantItem[];
}

export const OrderItemsDialog: React.FC<OrderItemsDialogProps> = ({ items }) => {
    const totalItems = items.length;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    View Items
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Order Items</DialogTitle>
                    <DialogDescription>
                        Detailed information about {totalItems} item{totalItems !== 1 ? "s" : ""}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                            {/* Header with Product Name + ID */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        {item.product_name ?? "N/A"}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Product Code: {item.product_id}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-black">
                                    Rs {item.price?.toLocaleString("en-NP") ?? "0"}
                                </p>
                            </div>
                        </div>

                        {/* Variant Details */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {item.variant_size && (
                                <Badge  className="gap-1.5">
                                    Size: {item.variant_size}
                                </Badge>
                            )}
                            {item.variant_color && (
                                <Badge  className="gap-1.5">
                                    Color: {item.variant_color}
                                </Badge>
                            )}
                        </div>

                        {/* Quantity and Subtotal */}
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Quantity</p>
                                <p className="text-sm font-semibold text-gray-900">{item.quantity}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    Rs {(item.price / item.quantity)?.toLocaleString("en-NP", { maximumFractionDigits: 2 }) ?? "0"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    Rs {item.price?.toLocaleString("en-NP") ?? "0"}
                                </p>
                            </div>
                        </div>
                        </div>
                    ))}

                    {/* Order Summary */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total Items</p>
                                <p className="text-xl font-bold text-gray-900">{totalItems}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
