'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { BaseModal } from "../modal/deleteModel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/categoryTypes";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";

export default function CategoryTable() {
    const [page, setPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setselectedCategory] = useState<Category | null>(
        null
    );
    const { getCategories, deleteCategory } = useCategories(page, 9);
    const totalPages = getCategories?.data?.data?.meta?.last_page ?? 1;
    const CategoryData = getCategories?.data?.data.data || [];

    const handleDeleteClick = (category: Category) => {
        setselectedCategory(category);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedCategory) return;

        try {
            await deleteCategory.mutateAsync(selectedCategory.id)
            setDeleteModalOpen(false)
            setselectedCategory(null)
        } catch (error) {
            console.error("Failed to delete category:", error)
        }
    };

    const columns: ColumnDef<Category>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "title",
            header: "Category Name",
            cell: ({ row }) => (
                <div className="font-medium break-words whitespace-normal">
                {row.original.title}
                </div>
            ),
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <div className="flex gap-2">
              <UpdateCategory category={row.original} />
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
                  <TooltipContent>Delete Category</TooltipContent>
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
            <AddCategory />
        </div>

        {!CategoryData ? (
            <TableSkeleton />
        ) : (
            <DataTable
                columns={columns}
                data={CategoryData}
                loading={!CategoryData}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        )}

        <BaseModal
            open={deleteModalOpen}
            onOpenChangeAction={setDeleteModalOpen}
            title="Delete Category"
            description={`Are you sure you want to delete ${selectedCategory?.title}?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleConfirmDelete}
            isDestructive
            loading={deleteCategory.isPending}
        />
        </div>
    );
}