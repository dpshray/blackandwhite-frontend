"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authService } from "@/services/authServces";
import { useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ token: string; user: User }>;
  signup: (full_name: string, email: string, mobile: string, password: string, password_confirmation: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Load user from cookies on initial mount
  useEffect(() => {
    const token = Cookies.get("auth-token");
    const userData = Cookies.get("user-data");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        Cookies.remove("auth-token");
        Cookies.remove("user-data");
      }
    }
    setIsLoading(false);
  }, []);

  // Login using API
  const login = async (email: string, password: string) => {
    try {
      const response = await authService.signIn({
        email, 
        password,
      });

      const token = response?.data?.token;
      const user = response?.data?.data;

      if (!token || !user) {
        throw new Error("Invalid email or password");
      }

      // Save token & user in cookies
      Cookies.set("auth-token", token, { expires: 7 });
      Cookies.set("user-data", JSON.stringify(user), { expires: 7 });

      setUser(user);

      return { token, user };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message ?? error.message ?? "Login failed");
    }
  };

  // Signup
  const signup = async (
    name: string,
    email: string,
    mobile: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const response = await authService.signUp({
        name,
        email,
        mobile_number: mobile,
        password,
        password_confirmation,
      });

      if (!response.success) {
        throw new Error(response?.message || "Signup failed");
      }

      return { success: true, message: response.message };
    } catch (error: any) {
      throw new Error(error?.response?.data?.message ?? error.message ?? "Signup failed");
    }
  };

  // ✅ Logout user
  const logout = () => {
    Cookies.remove("auth-token");
    Cookies.remove("user-data");
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
