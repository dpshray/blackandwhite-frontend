"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddress } from "@/hooks/useAddress";

const addressSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  contact_number: z.string().min(7, "Contact number is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormModalProps {
  mode: "add" | "update";
  defaultValues?: AddressFormData & { id?: number };
}

export default function AddressFormModal({
  mode,
  defaultValues,
}: AddressFormModalProps) {
  const { useAddAddressInfo, useUpdateAddressInfo } = useAddress();
  const addMutation = useAddAddressInfo();
  const updateMutation = useUpdateAddressInfo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: AddressFormData) => {
    if (mode === "add") {
      addMutation.mutate(data);
    } else if (mode === "update" && defaultValues?.id) {
      updateMutation.mutate({ id: defaultValues.id, ...data });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          {mode === "add" ? "Add Address" : "Update Address"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Address" : "Update Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input placeholder="First Name" {...register("first_name")} />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name.message}</p>
          )}

          <Input placeholder="Last Name" {...register("last_name")} />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name.message}</p>
          )}

          <Input placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Input placeholder="State" {...register("state")} />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}

          <Input placeholder="City" {...register("city")} />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}

          <Input placeholder="Address" {...register("address")} />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          <Input
            placeholder="Contact Number"
            {...register("contact_number")}
          />
          {errors.contact_number && (
            <p className="text-red-500 text-sm">
              {errors.contact_number.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={addMutation.isPending || updateMutation.isPending}
          >
            {mode === "add"
              ? addMutation.isPending
                ? "Adding..."
                : "Add Address"
              : updateMutation.isPending
              ? "Updating..."
              : "Update Address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
