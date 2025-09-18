'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/productTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import VariantModal from "../modal/VariantModel";
import { BaseModal } from "../../modal/deleteModel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import PhotoCell from "./PhotoCell";

export default function ProductTable() {
    const [page, setPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const { getProducts, deleteProduct } = useProducts(page, 9);
    const totalPages = getProducts?.data?.data?.meta?.last_page ?? 1;
    const productData = getProducts?.data?.data.data || [];

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedProduct) return;

        try {
            await deleteProduct.mutateAsync(selectedProduct.id)
            setDeleteModalOpen(false)
            setSelectedProduct(null)
        } catch (error) {
            console.error("Failed to delete product:", error)
        }
    };

    const columns: ColumnDef<Product>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "title",
            header: "Product Name",
            cell: ({ row }) => (
                <div className="font-medium break-words whitespace-normal">
                {row.original.title}
                </div>
            ),
            size: 50,
            enableSorting: true,
        },
        {
            accessorKey: "categories",
            header: "Categories",
            cell: ({ row }) => {
                const categories = row.original.categories 
            
                return (
                <div className="font-medium max-w-[220px] break-words whitespace-normal flex flex-col gap-1">
                    {categories.map((category) => (
                    <div key={category.categories_id}>{category.categories_title}</div>
                    ))}
                </div>
                );
            },
            size: 80,
            enableSorting: true,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="line-clamp-2 break-words whitespace-normal">
                    {row.original.description}
                </div>
            ),
            enableSorting: false,
            size: 100,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <div>{row.original.price}</div>,
            size: 60,
            enableSorting: false,
        },
        {
            accessorKey: "discount_price",
            header: "Discount Price",
            cell: ({ row }) => (
                <div className="line-clamp-1 truncate">
                {row.original.discount_price ?? "-"}
                </div>
            ),
            size: 60,
            enableSorting: false,
        },
        {
            accessorKey: "image",
            header: "Image",
            size: 100,
            cell: ({ row }) => {
                const rawImages = row.getValue("image");
                const validImages = Array.isArray(rawImages)
                ? rawImages
                : rawImages
                ? [rawImages]
                : [];

                return <PhotoCell photos={validImages} />;
            },
        },
        {
            accessorKey: "pattern",
            header: "Pattern",
        },
        {
            accessorKey: "fabric",
            header: "Fabric",
        },
        {
            accessorKey: "material",
            header: "Material",
        },
        {
          accessorKey: "variants",
          header: "Variants",

          cell: ({ row }) => (
            <VariantModal variants={row.original.variants || []} />
          ),
        },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <div className="flex gap-2">
              <UpdateProduct product={row.original} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => handleDeleteClick(row.original)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Delete Product</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ),
          size: 60,
        },
    ];

    return (
        <div className="space-y-4 py-4">
            <div className="w-full md:w-auto">
                <AddProduct />
            </div>

            {!productData ? (
                <TableSkeleton />
            ) : (
                <DataTable
                    columns={columns}
                    data={productData}
                    loading={getProducts.isPending}
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                />
            )}

            <BaseModal
                open={deleteModalOpen}
                onOpenChangeAction={setDeleteModalOpen}
                title="Delete Product"
                description={`Are you sure you want to delete ${selectedProduct?.title}?`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                isDestructive
                loading={deleteProduct.isPending}
            />
        </div>
    );
}