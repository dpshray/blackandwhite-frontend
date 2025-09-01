"use client";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";

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
