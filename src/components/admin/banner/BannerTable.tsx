'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { BaseModal } from "../../modal/deleteModel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Banner } from "@/types/bannerTypes";
import Link from "next/link";
import Image from "next/image";
import AddBanner from "./AddBanner";
import UpdateBanner from "./UpdateBanner";
import { useDeleteBanner, useGetBanners } from "@/hooks/useBanners";

export default function BannerTable() {
    const [page, setPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBanner, setselectedBanner] = useState<Banner | null>(
        null
    );
    const getBanners = useGetBanners(page, 9);
    const deleteBanner = useDeleteBanner();
    const totalPages = getBanners?.data?.data?.meta?.last_page ?? 1;
    const BannerData = getBanners?.data?.data?.data || [];

    const handleDeleteClick = (banner: Banner) => {
        setselectedBanner(banner);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedBanner) return;

        try {
            await deleteBanner.mutateAsync(selectedBanner.id)
            setDeleteModalOpen(false)
            setselectedBanner(null)
        } catch (error) {
            console.error("Failed to delete banner:", error)
        }
    };

    const columns: ColumnDef<Banner>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="font-medium break-words whitespace-normal">
                {row.original.title}
                </div>
            ),
        },
        {
            accessorKey: "subtitle",
            header: "Subtitle",
        },
        {
            accessorKey: "url",
            header: "url",
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                const imageUrl = row.getValue("image") as string | null;

                if (!imageUrl) {
                return <span className="text-gray-400">-</span>;
                }

                return (
                <Link href={imageUrl} target="_blank" className="aspect-[2.4/1]">
                    <Image
                        src={imageUrl}
                        width={100}
                        height={100}
                        alt="Banner"
                        className="max-w-20 max-h-20 rounded object-cover border"
                    />
                </Link>
                );
            },
        },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <div className="flex gap-2">
              <UpdateBanner banner={row.original} />
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
                  <TooltipContent>Delete Banner</TooltipContent>
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
            <AddBanner />
        </div>

        {!BannerData ? (
            <TableSkeleton />
        ) : (
            <DataTable
                columns={columns}
                data={BannerData}
                loading={getBanners?.isPending}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        )}

        <BaseModal
            open={deleteModalOpen}
            onOpenChangeAction={setDeleteModalOpen}
            title="Delete Banner"
            description={`Are you sure you want to delete ${selectedBanner?.title}?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleConfirmDelete}
            isDestructive
            loading={deleteBanner.isPending}
        />
        </div>
    );
}