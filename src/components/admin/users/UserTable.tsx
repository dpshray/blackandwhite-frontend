'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { BaseModal } from "../../modal/deleteModel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { User } from "@/types/userTypes";
import { useDeleteUser, useUsers } from "@/hooks/useUser";

export default function UserTable() {
    const [page, setPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setselectedUser] = useState<User | null>(
        null
    );
    const getUsers = useUsers(page, 9);
    const deleteUser = useDeleteUser();
    const totalPages = getUsers?.data?.data?.meta?.last_page ?? 1;
    const UserData = getUsers?.data?.data.data || [];

    const handleDeleteClick = (user: User) => {
        setselectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedUser) return;

        try {
            await deleteUser.mutateAsync(selectedUser.id)
            setDeleteModalOpen(false)
            setselectedUser(null)
        } catch (error) {
            console.error("Failed to delete user:", error)
        }
    };

    const columns: ColumnDef<User>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "name",
            header: "User Name",
            cell: ({ row }) => (
                <div className="font-medium break-words whitespace-normal">
                {row.original.name}
                </div>
            ),
        },
        {
            accessorKey: "mobile_number",
            header: "Mobile Number",
        },
        {
            accessorKey: "email",
            header: "Email",
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
                        aria-label="Delete"
                        onClick={() => handleDeleteClick(row.original)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Delete User</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ),
          size: 60,
        },
    ];

    return (
        <div className="space-y-4 py-4">

        {!UserData ? (
            <TableSkeleton />
        ) : (
            <DataTable
                columns={columns}
                data={UserData}
                loading={getUsers.isPending}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        )}

        <BaseModal
            open={deleteModalOpen}
            onOpenChangeAction={setDeleteModalOpen}
            title="Delete User"
            description={`Are you sure you want to delete ${selectedUser?.name}?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleConfirmDelete}
            isDestructive
            loading={deleteUser.isPending}
        />
        </div>
    );
}