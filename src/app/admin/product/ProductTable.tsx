'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/productTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";


export default function ProductTable() {
    const [page, setPage] = useState(1);
    const { data } = useProducts(page, 9);
    const columns: ColumnDef<Product>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
            enableSorting: true,
            enableHiding: false,
            size: 40,
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
        // {
        //     accessorKey: "categories_subcategories",
        //     header: "Category / Sub Category",
        //     cell: ({ row }) => {
        //         const categories = row.original.categories 
            
        //         return (
        //         <div className="font-medium max-w-[220px] break-words whitespace-normal flex flex-col gap-1">
        //             {categories.map((category) => (
        //             <div key={category.id}>{category.name}</div>
        //             ))}
        //         </div>
        //         );
        //     },
        //     size: 80,
        //     enableSorting: true,
        // },
        // {
        //     accessorKey: "model_no",
        //     header: "Model_no",
        //     cell: ({ row }) => <div className="break-words whitespace-normal">{row.original.model_no}</div>,
        //     size: 100,
        //     enableSorting: false,
        // },
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
        // {
        //     accessorKey: "image",
        //     header: "Image",
        //     size: 100,
        //     cell: ({ row }) => {
        //         const images = row.getValue("image") as string[] | undefined;
        //         const validImages = Array.isArray(images) ? images : [];

        //         return <PhotoCell photos={validImages} />;
        // },
        // },
        {
            accessorKey: "quantity",
            header: "Quantity",
        },
        {
            accessorKey: "warranty",
            header: "Warranty",
        },
        {
            accessorKey: "features",
            header: "Features",
            cell: ({ row }) => {
                const features = row.getValue("features") as string[] | undefined;
                return (
                <div className="max-w-[200px] line-clamp-2 break-words whitespace-normal text-sm text-gray-700">
                    {features && features.length > 0
                    ? features.join(", ")
                    : <span className="text-gray-400">-</span>}
                </div>
                );
        },
        },
        // {
        //   accessorKey: "variants",
        //   header: "Variants",
        //   cell: ({ row }) => (
        //     <VariantDetailsDialog variants={row.original.variants || []} />
        //   ),
        //   size: 100,
        //   enableSorting: false,
        // },
        // {
        //   id: "actions",
        //   header: "Actions",
        //   cell: ({ row }) => (
        //     <div className="flex gap-2">
        //       <UpdateProductDialog
        //         productId={row.original.id}
        //         defaultValues={{
        //           name: row.original.title,
        //           model_no: row.original.model_no,
        //           description: row.original.description,
        //           price: parseFloat(row.original.price),
        //           discount_price: row.original.discount_price
        //             ? parseFloat(row.original.discount_price)
        //             : 0,
        //           features: row.original.features || [],
        //           quantity: row.original.quantity,
        //           warranty: row.original.warranty,
        //           categories: (row.original.categories ?? []).map(
        //             (cat: Category | any) => ({
        //               id: cat.categories_id,
        //               name: cat.name,
        //               categories_title: cat.categories_title,
        //               categories_slug: cat.categories_slug,
        //             })
        //           ),
        //           subcategories: (row.original.subcategories ?? []).map(
        //             (subcat: SubCategory | any) => ({
        //               id: subcat.subcategories_id,
        //               subcategories_title: subcat.subcategories_title,
        //               slug: subcat.subcategories_slug,
        //             })
        //           ),
        //           variants: (row.original.variants ?? []).map((v) => ({
        //             id: v.id,
        //             size: v.size,
        //             color: v.color,
        //             price: Number(v.price),
        //             discount_price: v.discount_price
        //               ? Number(v.discount_price)
        //               : null,
        //             frame: v.frame,
        //             temple: v.temple,
        //             quantity: Number(v.quantity),
        //           })),
        //         }}
        //       />
        //       <TooltipProvider>
        //         <Tooltip>
        //           <TooltipTrigger asChild>
        //             <div>
        //               <Button
        //                 variant="outline"
        //                 size="icon"
        //                 aria-label="Delete"
        //                 onClick={() => handleDeleteClick(row.original)}
        //               >
        //                 <Trash2 className="w-4 h-4 text-red-500" />
        //               </Button>
        //             </div>
        //           </TooltipTrigger>
        //           <TooltipContent>Delete Product</TooltipContent>
        //         </Tooltip>
        //       </TooltipProvider>
        //     </div>
        //   ),
        //   size: 60,
        // },
    ];

    return (
        <div className="space-y-4 py-4">
        {/* <div className="w-full md:w-auto">
            <AddProductDialog />
        </div> */}

        {!data ? (
            <TableSkeleton />
        ) : (
            <DataTable
            columns={columns}
            data={(data?.data as any) || []}
            loading={!data}
            // totalPages={totalPages}
            // currentPage={page}
            // onPageChange={setPage}
            />
        )}

        {/* <BaseModal
            open={deleteModalOpen}
            onOpenChangeAction={setDeleteModalOpen}
            title="Delete Product"
            description={`Are you sure you want to delete ${selectedProduct?.id}?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleConfirmDelete}
            isDestructive
        /> */}
        </div>
    );
}