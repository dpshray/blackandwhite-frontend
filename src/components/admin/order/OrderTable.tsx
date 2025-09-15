'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { AllOrder } from "@/types/orderTypes";
import { useAllOrders } from "@/hooks/useOrder";
import { Badge } from "@/components/ui/badge";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function OrderTable() {
    const [page, setPage] = useState(1);
    const { data:getOrders, isLoading: isLoadingOrders } = useAllOrders(page, 9);
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
                <span className="text-sm text-gray-500">{row.original.user.email}</span>
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
                {b.first_name} {b.last_name} <br />
                {b.address}, {b.city}, {b.state} <br />
                <span className="flex items-center gap-2"><FaPhoneAlt className="text-red-500"/> {b.contact_number}</span>
                <span className="flex items-center gap-2"><MdEmail className="text-yellow-500"/> {b.email}</span> <br />
                </div>
            );
            },
        },
        {
            accessorKey: "items",
            header: "Items",
            cell: ({ row }) => (
            <div className="space-y-1 text-sm">
                {row.original.items.map((item, index) => (
                <div key={index}>
                    {item.product_name} - {item.variant_size}/{item.variant_color} x {item.quantity} = Rs {item.price}
                </div>
                ))}
            </div>
            ),
        },
        {
            accessorKey: "total_amount",
            header: "Total Amount",
            cell: ({ row }) => (
            <div className="font-medium break-words whitespace-normal">
                Rs {row.original.total_amount}
            </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
            <div className="font-medium break-words whitespace-normal">
                <Badge>{row.original.status}</Badge>
            </div>
            ),
        },
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