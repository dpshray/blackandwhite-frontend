"use client";

import { contactService } from "@/services/contactServices";
import { ContactResponse } from "@/types/contactTypes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useContactInfo = (page: number = 1, limit: number = 10) =>
  useQuery<ContactResponse>({
    queryKey: ["contact-info", page, limit],
    queryFn: ()=> contactService.getContactInfo(page, limit),
  });

export const useAddContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactService.addContactInfo,
    onSuccess: () => {
      toast.success("Contact added successfully");
      queryClient.invalidateQueries({ queryKey: ["contact-info"] });
    },
    onError: () => toast.error("Failed to add contact"),
  });
};

export const useDeleteContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => contactService.deleteContactInfo(id),
    onSuccess: () => {
      toast.success("Contact deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["contact-info"] });
    },
    onError: () => toast.error("Failed to delete contact"),
  });
};
