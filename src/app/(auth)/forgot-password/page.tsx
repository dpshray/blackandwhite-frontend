"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AtSignIcon } from "lucide-react"
import { useForgotPassword } from "@/hooks/useAuth"
import TextInput from "@/components/fields/TextInput"
import { Button } from "@/components/ui/button"

const ForgotSchema = z.object({
  email: z.email("Enter a valid email"),
})

type ForgotFormData = z.infer<typeof ForgotSchema>

export default function ForgetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({ resolver: zodResolver(ForgotSchema) })

    const forgotPasswordMutation = useForgotPassword();
  

  const onSubmit = async (data: ForgotFormData) => {
    forgotPasswordMutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black shadow-lg rounded-lg p-8">
        <h2 className="text-2xl text-white font-semibold text-center mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
          <TextInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            icon={<AtSignIcon size={16} />}
            register={register}
            error={errors.email}
          />
          <Button disabled={forgotPasswordMutation.isPending} variant={"outline"} className="text-black w-full" type="submit">
            { forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link" }
          </Button>
        </form>
      </div>
    </div>
  )
}
