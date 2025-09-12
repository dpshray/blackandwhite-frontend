"use client";

import { AddressInfo, addressService } from "@/services/addressServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddress = () => {
  const queryClient = useQueryClient();

  const useAddressInfo = () =>
    useQuery<AddressInfo[]>({
      queryKey: ["address-info"],
      queryFn: addressService.getAddressInfo,
    });

  const useAddAddressInfo = () =>
    useMutation({
      mutationFn: addressService.addAddressInfo,
      onSuccess: () => {
        toast.success("Address added successfully");
        queryClient.invalidateQueries({ queryKey: ["address-info"] });
      },
      onError: () => toast.error("Failed to add address"),
    });

  const useUpdateAddressInfo = () =>
    useMutation({
      mutationFn: ({ id, ...payload }: AddressInfo) =>
        addressService.updateAddressInfo(id, payload),
      onSuccess: () => {
        toast.success("Address updated successfully");
        queryClient.invalidateQueries({ queryKey: ["address-info"] });
      },
      onError: () => toast.error("Failed to update address"),
    });

  return { useAddressInfo, useAddAddressInfo, useUpdateAddressInfo };
};
