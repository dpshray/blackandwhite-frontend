"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";
import { authService } from "@/services/authServces";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//Sign In Hook
export const useSignIn = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return login(email, password);
    },
  });
};

//Sign Up Hook
export const useSignUp = () => {
  const { signup } = useAuth();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      mobile,
      password,
      password_confirmation,
    }: {
      name: string;
      email: string;
      mobile: string;
      password: string;
      password_confirmation: string;
    }) => {
      return signup(name, email, mobile, password, password_confirmation);
    },
  });
};

// Forgot Password Hook
export const useForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      return authService.forgotPassword(payload);
    },
    onSuccess: (res: any) => {
      toast.success(res.message || "Reset link sent to your email!");
      router.push("/forgot-password/reset-password");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send reset link!");
    },
  });
};

// Reset Password Hook
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { token: string; password: string; password_confirmation: string }) => {
      return authService.resetPassword(payload);
    },
    onSuccess: (res: any) => {
      toast.success(res.message || "Password reset successfully!");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to reset password!");
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      return authService.logout();
    },
    onSuccess: () => {
      logout(); // Remove cookies & clear state
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
};