"use client";

import { userService } from "@/services/userServices";
import { UserProfile } from "@/types/profileTypes";
import { UserResponse } from "@/types/userTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

// GET Users
export const useUsers = (page: number = 1, limit: number = 9) => {
  return useQuery<UserResponse>({
    queryKey: ["users", { page, limit }],
    queryFn: () => userService.getUsers({ page, limit }),
    staleTime: 5 * 60 * 1000,
  });
};

// DELETE User
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to delete user");
    },
  });
};

// GET Profile
export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await userService.getProfile();
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });
};

// UPDATE Profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => userService.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};
