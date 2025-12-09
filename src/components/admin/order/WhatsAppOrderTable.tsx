'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { AllWhatsAppOrder } from "@/types/orderTypes";
import { useAllWhatsAppOrders, useUpdateWhatsAppOrderStatus } from "@/hooks/useOrder";
import { Badge } from "@/components/ui/badge";
import { OrderStatusCell } from "./OrderStatusCell";

export default function WhatsAppOrderTable() {
    const [page, setPage] = useState(1);
    const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null)
    const { data:getOrders, isLoading: isLoadingOrders } = useAllWhatsAppOrders(page, 9);
    const { mutate } = useUpdateWhatsAppOrderStatus();
    const totalPages = getOrders?.data?.meta.last_page ?? 1;
    const OrderData = getOrders?.data?.data || [];

    const whatsappOrderColumns: ColumnDef<AllWhatsAppOrder>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "customer",
            header: "Customer",
            cell: ({ row }) => {
            return (
                <div className="text-sm">
                    <div className="font-medium">{row.original.name}</div>
                    {row.original.email && (
                        <Badge variant="outline" className="mt-1">
                        {row.original.email}
                        </Badge>
                    )}
                </div>
            );
            },
        },

        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => (
                <div className="text-sm font-medium">
                    {row.original.phone}
                </div>
            ),
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => (
                <div className="text-sm">
                    {row.original.address || "-"}
                </div>
            ),
        },
        {
            accessorKey: "product_code",
            header: "Product Code",
            cell: ({ row }) => (
                <div className="font-medium">
                    {row.original.product_code}
                </div>
            ),
        },
        {
            accessorKey: "size",
            header: "Size/Color",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {row.original.color && (
                        <Badge>{row.original.color}</Badge>
                    )}
                    {row.original.size && (
                        <Badge variant="secondary">{row.original.size}</Badge>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Order Date",
            cell: ({ row }) => (
                <span>{row.original.created_at?.split("T")[0]}</span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <OrderStatusCell
                    orderId={row.original.id}
                    value={row.original.status || ""}
                    onChangeStatus={(id, status) => {
                        setLoadingOrderId(id) // Set loading for this specific order
                        mutate(
                        { id, status },
                        {
                            onSuccess: () => setLoadingOrderId(null),
                            onError: () => setLoadingOrderId(null),
                        },
                        )
                    }}
                    loadingOrderId={loadingOrderId} // Pass loading state to cell
                />
            ),
        },
    ];


    return (
        <div className="space-y-4 py-4">

        {!OrderData ? (
            <TableSkeleton />
        ) : (
            <DataTable
                columns={whatsappOrderColumns}
                data={OrderData}
                loading={isLoadingOrders}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        )}
        </div>
    );
}