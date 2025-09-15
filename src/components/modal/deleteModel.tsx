"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CircleAlert, Loader2 } from "lucide-react";
import { ReactNode   } from "react";

type BaseModalProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void; // Supports async
  isDestructive?: boolean;
  icon?: ReactNode;
  loading?: boolean;
};

export function BaseModal({
  open,
  onOpenChangeAction,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isDestructive = false,
  icon = <CircleAlert className="opacity-80" size={16} strokeWidth={2} />,
  loading = false,
}: BaseModalProps) {

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChangeAction}>
      <AlertDialogContent className="p-4 gap-2">
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-2">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            {icon}
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
        </div>

        {children && (
          <div className="mt-2 text-sm text-muted-foreground">{children}</div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            variant={'destructive'}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
              isDestructive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            {loading ? "Processing..." : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
