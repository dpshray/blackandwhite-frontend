"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // read token + user info from query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userData = params.get("user"); // sometimes backend sends JSON string or base64

    if (token) {
      Cookies.set("auth-token", token, { expires: 7 });
    }
    if (userData) {
      try {
        Cookies.set("user-data", userData, { expires: 7 });
      } catch (err) {
        console.error("Could not parse userData", err);
      }
    }

    // redirect after storing
    router.replace("/");
  }, [router]);

  return <p>Signing you in...</p>;
}
