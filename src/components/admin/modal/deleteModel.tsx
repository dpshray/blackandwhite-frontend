"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleAlert, Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";

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
}: BaseModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;

    try {
      setLoading(true);
      await onConfirm();
      onOpenChangeAction(false); // Close modal after success
    } catch (error) {
      console.error("Error in confirm action:", error);
    } finally {
      setLoading(false);
    }
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
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={`flex items-center justify-center gap-2 ${
              isDestructive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
                : ""
            }`}
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            {loading ? "Processing..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
