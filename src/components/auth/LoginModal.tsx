"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AtSignIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import TextInput from "../fields/TextInput";
import { useSignIn } from "@/hooks/useAuth"; 
import { useState } from "react";

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginData = z.infer<typeof LoginSchema>;

export default function LoginModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const signIn = useSignIn({ preventRedirect: true });
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginData) => {
    await signIn.mutateAsync(values, {
      onSuccess: () => {
        // Close modal after successful login
        onOpenChange(false);
      },
    });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true)
    window.location.href = process.env.NEXT_PUBLIC_BASE_URL + "/auth/google/redirect"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
        <Card>
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <LockIcon className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Welcome Back
              </DialogTitle>
              <p className="text-muted-foreground text-sm">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <TextInput
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                icon={<AtSignIcon size={16} />}
                register={register}
                error={errors.email}
              />

              <TextInput
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                register={register}
                error={errors.password}
                icon={<LockIcon size={16} />}
                showToggle
              />

              <div className="text-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={signIn.isPending}
                className="w-full h-11"
              >
                {signIn.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
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
                {isLoading ? "Loading..." : "Continue with Google"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold hover:underline transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
