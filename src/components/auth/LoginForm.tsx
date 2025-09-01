"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 
import TextInput from "../fields/TextInput";
import { useSignIn } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

const signInSchema = z.object({
  email: z.email("Invalid email address"),  
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isPending } = useSignIn();

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
      {
        onSuccess: () => {
          toast.success("Login successful!");
          router.push("/"); 
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Invalid email or password!");
        },
      }
    );
  };

  return (
    <div className="flex px-4 py-8 max-w-7xl mx-auto min-h-[80vh]">
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

          <p className="text-center text-lg">
            Don&apos;t have an account? <Link href="/register" className="hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
