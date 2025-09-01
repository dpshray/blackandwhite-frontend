"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LockIcon } from "lucide-react";
import { useResetPassword } from "@/hooks/useAuth";
import TextInput from "@/components/fields/TextInput";
import { Button } from "@/components/ui/button";

const ResetSchema = z
  .object({
    token: z.string().min(1, "Invalid or expired token"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

type ResetFormData = z.infer<typeof ResetSchema>;

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({ resolver: zodResolver(ResetSchema) });

  const resetMutation = useResetPassword();

  const onSubmit = async (data: ResetFormData) => {
    resetMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="max-w-md w-full bg-black shadow-lg rounded-lg p-8">
        <h2 className="text-2xl text-white font-semibold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
          <TextInput
            label="Reset Code"
            name="token"
            type="text"
            placeholder="Enter reset code"
            icon={<KeyRound size={16} />}
            register={register}
            error={errors.token}
          />

          <TextInput
            label="New Password"
            name="password"
            type="password"
            placeholder="Enter new password"
            icon={<LockIcon size={16} />}
            showToggle
            register={register}
            error={errors.password}
          />

          <TextInput
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            placeholder="Confirm new password"
            icon={<LockIcon size={16} />}
            showToggle
            register={register}
            error={errors.password_confirmation}
          />

          <Button disabled={resetMutation.isPending} variant={"outline"} className="text-black w-full" type="submit">
            { resetMutation.isPending ? "Processing..." : "Reset Password" }
          </Button>
        </form>
      </div>
    </div>
  );
}
