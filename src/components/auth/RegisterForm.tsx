'use client'

import { useSignUp } from "@/hooks/useAuth"
import { Button } from "../ui/button"
import Link from "next/link"
import TextInput from "../fields/TextInput"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { useState } from "react"

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

export default function RegisterForm({ admin }: { admin?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const { mutate, isPending } = useSignUp()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
    });    
        
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

    const handleGoogleLogin = () => {
        setIsLoading(true)
        window.location.href = process.env.NEXT_PUBLIC_BASE_URL + "/auth/google/redirect"
    }

    return (
        <div className="flex items-center px-4 py-8 max-w-7xl mx-auto min-h-[80vh]">
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
                    
                    {admin && (
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
                    )}
                    <p className="text-center text-lg">
                        Already have an account? <Link href="/login" className="hover:underline">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}