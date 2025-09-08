"use client";

import { userService } from "@/services/userServices";
import { UserResponse } from "@/types/userTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useUsers = (
  page: number = 1,
  limit: number = 9,
) => {
  const queryClient = useQueryClient();

  //  GET User
  const getUsers = useQuery<UserResponse>({
    queryKey: ["users", { page, limit }],
    queryFn: () => userService.getUsers({ page, limit }),
    staleTime: 5 * 60 * 1000,
  });

  //  DELETE User
  const deleteUser = useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (err: AxiosError<ApiError>) => {
      toast.error(err.response?.data?.message || "Failed to delete user");
    },
  });

  return {
    // query
    getUsers,

    // mutations
    deleteUser,
  };
};
