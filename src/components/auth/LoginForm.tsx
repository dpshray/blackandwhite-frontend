"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import TextInput from "../fields/TextInput";
import { useSignIn } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const signInSchema = z.object({
  email: z.email("Invalid email address"),  
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function LoginForm({ admin }: { admin?: boolean }) {
  const { mutate, isPending } = useSignIn();
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormValues) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
    );
  };

  const handleGoogleLogin = () => {
    setIsLoading(true)
    window.location.href = process.env.NEXT_PUBLIC_BASE_URL + "/auth/google/redirect"
  }

  return (
    <div className="flex h-screen items-center px-4 py-8 max-w-7xl mx-auto min-h-[80vh]">
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Image
          src="/banner1.png" 
          width={600}
          height={600}
          alt="Sign Up" 
          className="h-full object-cover" />
      </div>

      <div className="flex-1 flex items-center sm:items-start justify-center px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
          <h2 className="text-5xl font-medium text-center mb-10">SIGN IN</h2>

          <TextInput
            label="Email*"
            label_size="text-lg"
            name="email"
            placeholder="Enter Email"
            register={register}
            error={errors.email}
          />

          <TextInput
            label="Password*"
            label_size="text-lg"
            name="password"
            type="password"
            placeholder="Enter password"
            register={register}
            error={errors.password}
            showToggle
          />

          <div className="text-right">
            <Link href="/forgot-password" className="text-lg hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing In..." : "Sign In"}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.6 30.1 0 24 0 14.6 0 6.4 5.4 2.4 13.2l7.8 6.1C12.4 13.1 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.7-2 5-4.3 6.5l6.7 5.2c3.9-3.6 6.3-8.9 6.3-16.2z"/>
              <path fill="#FBBC05" d="M10.2 28.9c-1.1-3.3-1.1-6.9 0-10.2l-7.8-6.1C-1.3 18.9-1.3 29.1 2.4 36.1l7.8-6.1z"/>
              <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-6.7-5.2c-2 1.3-4.5 2.1-7.3 2.1-6.3 0-11.6-4.3-13.5-10.1l-7.8 6.1C6.4 42.6 14.6 48 24 48z"/>
            </svg>
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>

          
          {admin && (
            <p className="text-center text-lg">
              Don&apos;t have an account? <Link href="/register" className="hover:underline">Sign Up</Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
