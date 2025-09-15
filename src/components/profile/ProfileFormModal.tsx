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
import { Label } from "@/components/ui/label";
import { useUsers } from "@/hooks/useUser";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import TextInput from "../fields/TextInput";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone_number: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  date_of_birth: z.string().nullable().optional(),
  image: z.any().optional(), 
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormModalProps {
  defaultValues?: ProfileFormData;
}

export default function ProfileFormModal({ defaultValues }: ProfileFormModalProps) {
  const { useUpdateProfile } = useUsers();
  const updateMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone_number", data.phone_number || "");
    formData.append("gender", data.gender || "");
    formData.append("date_of_birth", data.date_of_birth || "");
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    updateMutation.mutate(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <TextInput
                label="Name"
                name="name"
                placeholder="Enter Name"
                register={register}
                error={errors.name}
            />
          </div>

          {/* Phone */}
           <div>
            <TextInput
                label="Phone Number"
                name="phone_number"
                placeholder="Enter Phone Number"
                register={register}
                error={errors.phone_number}
            />
          </div>

          {/* Gender */}
          <div>
            <Label className="pb-2">Gender</Label>
            <Select
                onValueChange={(value) => setValue("gender", value)} 
                defaultValue={defaultValues?.gender || ""}
            >
                <SelectTrigger>
                <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="others">Others</SelectItem>
                </SelectContent>
            </Select>
            {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>


          {/* DOB */}
          <div>
            <TextInput
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                placeholder="Date of Birth"
                register={register}
                error={errors.date_of_birth}
            />
          </div>

          {/* Profile Image */}
          <div>
            <Label className="pb-2">Profile Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setValue("image", file);
              }}
              className="h-10 file:mr-4 file:mt-0.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:hover:bg-black/80 file:cursor-pointer"
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit"
            className="w-full"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
