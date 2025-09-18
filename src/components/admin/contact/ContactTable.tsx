'use client'

import { DataTable } from "@/components/admin/DataTable";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useContactInfo, useDeleteContactInfo } from "@/hooks/useContact";
import { ContactInfo } from "@/types/contactTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { BaseModal } from "@/components/modal/deleteModel";

export default function ContactTable() {
    const [page, setPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactInfo | null>(null);
    const { data:getContacts, isLoading: isLoadingContacts } = useContactInfo(page, 9);
    const deleteContact = useDeleteContactInfo();
    const totalPages = getContacts?.data?.meta?.last_page ?? 1;
    const ContactData = getContacts?.data?.data || [];

    const handleDeleteClick = (contact: ContactInfo) => {
        setSelectedContact(contact);
        setDeleteModalOpen(true);
    };
    
    const handleConfirmDelete = async () => {
        if (!selectedContact) return;

        try {
            await deleteContact.mutateAsync(selectedContact.id)
            setDeleteModalOpen(false)
            setSelectedContact(null)
        } catch (error) {
            console.error("Failed to delete contact:", error)
        }
    };

    const columns: ColumnDef<ContactInfo>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "firstname",
            header: "First Name",
        },
        {
            accessorKey: "lastname",
            header: "Last Name",
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <MdEmail className="text-yellow-500"/>
                {row.original.email}
            </div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <FaPhoneAlt className="text-red-500"/>
                {row.original.phone}
            </div>
            ),
        },
        {
            accessorKey: "Message",
            header: "message",
            cell: ({ row }) => (
            <div className="break-words whitespace-normal">
                {row.original.message}
            </div>
            ),
        },
        {
            accessorKey: "actions",
            header: "Action",
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
                  <TooltipContent>Delete Contact</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ),
        },
];


    return (
        <div className="space-y-4 py-4">

        {!ContactData ? (
            <TableSkeleton />
        ) : (
            <DataTable
                columns={columns}
                data={ContactData}
                loading={isLoadingContacts}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        )}

        <BaseModal
            open={deleteModalOpen}
            onOpenChangeAction={setDeleteModalOpen}
            title="Delete Contact"
            description={`Are you sure you want to delete ${selectedContact?.firstname}'s contact info?`}
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleConfirmDelete}
            isDestructive
            loading={deleteContact.isPending}
        />
        </div>
    );
}