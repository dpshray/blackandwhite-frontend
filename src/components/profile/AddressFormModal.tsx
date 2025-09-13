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
import { Button } from "@/components/ui/button";
import { useAddress } from "@/hooks/useAddress";
import TextInput from "../fields/TextInput";

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
          <TextInput
            label="First Name"
            name="first_name"
            placeholder="First Name"
            register={register}
            error={errors.first_name}
          />

          <TextInput
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            register={register}
            error={errors.last_name}
          />

          <TextInput
            label="Email"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email}
          />

          <TextInput
            label="State"
            name="state"
            placeholder="State"
            register={register}
            error={errors.state}
          />

          <TextInput
            label="City"
            name="city"
            placeholder="City"
            register={register}
            error={errors.city}
          />

          <TextInput
            label="Address"
            name="address"
            placeholder="Address"
            register={register}
            error={errors.address}
          />

          <TextInput
            label="Contact Number"
            name="contact_number"
            placeholder="Contact Number"
            register={register}
            error={errors.contact_number}
          />

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
