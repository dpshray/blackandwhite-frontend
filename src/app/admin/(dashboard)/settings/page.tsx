"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useGetDeliveryCharge, useSetDeliveryCharge } from "@/hooks/useDashboard"
import TextInput from "@/components/fields/TextInput"

const deliverySchema = z.object({
    amount: z
        .string()
        .nonempty("Delivery charge is required")
        .refine((val) => {
        const num = Number(val)
        return !isNaN(num) && num >= 0
        }, "Delivery charge must be a positive number"),
})

type DeliveryForm = z.infer<typeof deliverySchema>

export default function SettingsPage() {
    const { data, isLoading } = useGetDeliveryCharge()
    const { mutateAsync, isPending, isSuccess } = useSetDeliveryCharge()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isDirty },
    } = useForm<DeliveryForm>({
        resolver: zodResolver(deliverySchema),
        defaultValues: {
        amount: "",
        },
    })

    useEffect(() => {
        if (data?.data?.amount !== undefined) {
            setValue("amount", data.data.amount)
        }
    }, [data, setValue])

    const onSubmit = async (formData: DeliveryForm) => {
        await mutateAsync({ value: formData.amount })
        reset({ amount: formData.amount })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your delivery charges and other configurations
                    </p>
                </div>

                {/* Delivery Charge Card */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Delivery Charge</CardTitle>
                                <CardDescription className="text-sm">
                                    Set the standard delivery fee for all orders
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Current Value Display */}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                            </div>
                        ) : (
                            <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                                <AlertDescription className="text-sm font-medium text-green-900 dark:text-green-100">
                                Current delivery charge: <span className="text-lg font-bold">Rs. {data?.data?.amount || data?.value || 0}</span>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Success Message */}
                        {isSuccess && !isDirty && (
                            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                                <Save className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <AlertDescription className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                    Delivery charge updated successfully!
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Form */}
                        <div className="space-y-4">
                            <TextInput
                                label="New Delivery Charge"
                                label_size="text-sm font-medium"
                                name="amount"
                                type="number"
                                placeholder="Enter amount in Rs."
                                register={register}
                                error={errors.amount}
                                registerOptions={{
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Only numbers are allowed"
                                }
                                }}
                            />

                            <div className="flex gap-3 pt-2">
                                <Button
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={isPending || !isDirty}
                                    className="flex-1 gap-2"
                                    size="lg"
                                >
                                    {isPending ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                                
                                {isDirty && (
                                    <Button
                                        variant="outline"
                                        onClick={() => reset()}
                                        disabled={isPending}
                                        size="lg"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="rounded-lg border bg-muted/50 p-4">
                            <p className="text-xs text-muted-foreground">
                                <strong>Note:</strong> This delivery charge will be applied to all new orders. 
                                Existing orders will not be affected by this change.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}