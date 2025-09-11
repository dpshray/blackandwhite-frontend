'use client'

import { useSignUp } from "@/hooks/useAuth"
import { Button } from "../ui/button"
import Link from "next/link"
import TextInput from "../fields/TextInput"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

export const signUpSchema = z.object({
    name: z.string().min(3, "Full name must be at least 3 characters"),
    mobile: z
      .string()
      .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type SignUpForm = z.infer<typeof signUpSchema>;

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
  });    const { mutate, isPending } = useSignUp()
        
    const onSubmit = (data: SignUpForm) => {
    mutate(
      {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        password_confirmation: data.confirmPassword,
      },
    );
  };

    return (
        <div className="flex h-screen items-center px-4 py-8 max-w-7xl mx-auto min-h-[80vh]">
            <div className="hidden md:flex flex-1 items-center justify-center">
                <Image
                    src="/banner1.png" 
                    width={600}
                    height={600}
                    alt="Sign Up" 
                    className="h-full object-cover" 
                />
            </div>

            <div className="flex-1 flex justify-center px-6">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
                    <h2 className="text-5xl font-medium text-center">SIGN UP</h2>

                    <TextInput
                        label="Full Name*"
                        label_size="text-lg"
                        name="name"
                        placeholder="Enter your full name"
                        register={register}
                        error={errors.name}
                    />

                    <TextInput
                        label="Mobile Number*"
                        label_size="text-lg"
                        name="mobile"
                        placeholder="Mobile Number"
                        register={register}
                        type="number"
                        error={errors.mobile}
                    />

                    <TextInput
                        label="Email*"
                        label_size="text-lg"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        register={register}
                        error={errors.email}
                    />

                    <TextInput
                        label="Password*"
                        label_size="text-lg"
                        name="password"
                        type="password"
                        showToggle
                        placeholder="Enter password"
                        register={register}
                        error={errors.password}
                    />

                    <TextInput
                        label="Confirm Password"
                        label_size="text-lg"
                        name="confirmPassword"
                        type="password"
                        showToggle
                        placeholder="Re-enter password"
                        register={register}
                        error={errors.confirmPassword}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-black text-white py-2 rounded"
                    >
                        {isPending ? "Signing Up..." : "Sign Up"}
                    </Button>

                    <p className="text-center text-lg">
                        Already have an account? <Link href="/login" className="hover:underline">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}