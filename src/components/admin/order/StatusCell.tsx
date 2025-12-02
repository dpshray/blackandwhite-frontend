"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Loader2, ChevronDown } from 'lucide-react';
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUpdateOrderStatus } from "@/hooks/useOrder";

export const StatusCell = ({ row }: { row: any }) => {
  const { mutate, isPending } = useUpdateOrderStatus();
  const [status, setStatus] = useState(row.original.status);

  const statusOptions = [
    { label: "Processing", value: "Processing" },
    { label: "Shipped", value: "Shipped" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const getStatusStyles = (status: string) => {
    const baseStyles = "px-3 py-1.5 text-xs font-medium rounded-md transition-all";
    switch (status.toLowerCase()) {
        case "pending":
            return `${baseStyles} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700`;
        case "processing":
            return `${baseStyles} bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800`;
        case "shipped":
            return `${baseStyles} bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200 border border-blue-200 dark:border-blue-800`;
        case "delivered":
            return `${baseStyles} bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800`;
        case "cancelled":
            return `${baseStyles} bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200 border border-red-200 dark:border-red-800`;
        default:
            return baseStyles;
    }
  };

  const handleChange = (newStatus: string) => {
    setStatus(newStatus);
    mutate({ orderId: row.original.id, status: newStatus });
  };

  return (
    <Select onValueChange={handleChange} defaultValue={status} disabled={isPending}>
      <SelectTrigger
        className={cn(
          "w-auto min-w-fit border-0 bg-transparent p-0 shadow-none hover:bg-muted/50 focus:bg-muted/50 focus:ring-1 focus:ring-ring rounded-md px-2 py-1 transition-colors",
          isPending && "opacity-60 cursor-not-allowed"
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className={getStatusStyles(status)}>
            {status}
          </span>
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          )}
        </div>
      </SelectTrigger>

      <SelectContent className="min-w-fit">
        {statusOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
            <span className={getStatusStyles(opt.value)}>
              {opt.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
