"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/context/auth-provider";

export default function GoogleCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    const userString = params.get("user");

    if (!token || !userString) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userString);

      // store cookies for 7 days
      Cookies.set("auth-token", token, { expires: 7 });
      Cookies.set("user-data", JSON.stringify(parsedUser), { expires: 7 });

      // redirect based on role
      if (Number(parsedUser?.is_admin) === 1) {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (err) {
      console.error("Error parsing Google user:", err);
      logout();
      router.replace("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-medium">Logging you in with Google...</p>
    </div>
  );
}
