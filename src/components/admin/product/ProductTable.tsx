'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/productTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import VariantModal from "../modal/VariantModel";
import { BaseModal } from "../../modal/deleteModel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductTable() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const { getProducts, deleteProduct } = useProducts(page, 9, searchQuery);
    const totalPages = getProducts?.data?.data?.meta?.last_page ?? 1;
    const productData = getProducts?.data?.data.data || [];
    const router = useRouter();

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    };

    const handleSearch = useCallback((value: string) => {
        setSearchQuery(value)
        setPage(1)
    }, [])

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
            id: "product_code",
            header: "Product Code",
            cell: ({ row }) => <div>{row.original.product_code}</div>,
        },
        {
            accessorKey: "title",
            header: "Product Name",
            cell: ({ row }) => (
                <div className="font-medium break-words whitespace-normal line-clamp-2">
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
            accessorKey: "main_image",
            header: "Main Image",
            size: 100,
            cell: ({ row }) => {
                const image = row.original.main_image; 
                
                return (
                <Image
                    src={image ? image : "/no-image.png"}  
                    alt="Product Image"
                    width={50}
                    height={50}
                    className="rounded-md object-cover border"
                />
                );
            }
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
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/admin/product/${row.original.slug}`)}
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>View Product Detail</TooltipContent>
                </Tooltip>
              </TooltipProvider>
                
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
                    enableSearch
                    onSearchAction={handleSearch}
                    searchPlaceholder="Search Products by product code or name..."
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