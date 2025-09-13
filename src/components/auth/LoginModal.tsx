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
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
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
