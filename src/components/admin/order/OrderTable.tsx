'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { AllOrder } from "@/types/orderTypes";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useOrder";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { OrderItemsDialog } from "./OrderItemsDialog";
import { Badge } from "@/components/ui/badge";
import { OrderStatusCell } from "./OrderStatusCell";

export default function OrderTable() {
    const [page, setPage] = useState(1);
    const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null)
    const { data:getOrders, isLoading: isLoadingOrders } = useAllOrders(page, 9);
    const { mutate } = useUpdateOrderStatus();
    const totalPages = getOrders?.data?.meta.last_page ?? 1;
    const OrderData = getOrders?.data?.data || [];

    const columns: ColumnDef<AllOrder>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "user",
            header: "User",
            cell: ({ row }) => (
            <div>
                {row.original.user.name} <br />
                <Badge variant="outline" className="mt-1">{row.original.user.email}</Badge>
            </div>
            ),
        },
        {
            accessorKey: "billing_information",
            header: "Billing Address",
            cell: ({ row }) => {
            const b = row.original.billing_information;
            return (
                <div className="text-sm">
                {b?.first_name} {b?.last_name} <br />
                {b?.address}, {b?.city}, {b?.state} <br />
                <span className="flex items-center gap-2"><FaPhoneAlt className="text-red-500"/> {b?.contact_number}</span>
                <span className="flex items-center gap-2"><MdEmail className="text-yellow-500"/> {b?.email}</span> <br />
                </div>
            );
            },
        },
        {
            accessorKey: "items",
            header: "Items",
            cell: ({ row }) => <OrderItemsDialog items={row.original.items} />,
        },
        {
            accessorKey: "total_amount",
            header: "Total Amount",
            cell: ({ row }) => (
            <div className="font-medium wrap-break-word whitespace-normal">
                Rs {row.original.total_amount}
            </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <OrderStatusCell
                    orderId={row.original.id}
                    value={row.original.status}
                    onChangeStatus={(id, status) => {
                        setLoadingOrderId(id) // Set loading for this specific order
                        mutate(
                        { orderId: id, status },
                        {
                            onSuccess: () => setLoadingOrderId(null),
                            onError: () => setLoadingOrderId(null),
                        },
                        )
                    }}
                    loadingOrderId={loadingOrderId} // Pass loading state to cell
                    />
            )
        }
    ];


    return (
        <div className="space-y-4 py-4">

        {!OrderData ? (
            <TableSkeleton />
        ) : (
            <DataTable
                columns={columns}
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