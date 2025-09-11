"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/hooks/useCart";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/fields/TextInput";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  contact: z.string().min(7, "Contact number is too short"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("connect-ips");
  const { data: cart} = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log({
      ...data,
      paymentMethod,
      cart,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left Side - Billing Information */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextInput
                    label="First Name*"
                    name="firstName"
                    placeholder="First Name"
                    error={errors.firstName}
                    register={register}
                />
                <TextInput
                    label="Last Name*"
                    name="lastName"
                    placeholder="Last Name"
                    error={errors.lastName}
                    register={register}
                />
                <TextInput
                    label="Email*"
                    name="email"
                    placeholder="Email Address"
                    error={errors.email}
                    register={register}
                    type="email"
                />
                <TextInput
                    label="Contact Number*"
                    name="contact"
                    placeholder="Contact Number"
                    error={errors.contact}
                    register={register}
                />
                <TextInput
                    label="State*"
                    name="state"
                    placeholder="State"
                    error={errors.state}
                    register={register}
                />
                <TextInput
                    label="City*"
                    name="city"
                    placeholder="City"
                    error={errors.city}
                    register={register}
                />
                </div>
                <TextInput
                label="Address*"
                name="address"
                placeholder="Address"
                error={errors.address}
                register={register}
                type="textArea"
                />
        </div>

        {/* Right Side - Cart Summary */}
        <div className="h-fit border p-6 rounded-md space-y-6">
            <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
            <div className="flex justify-between py-2 border-b">
                <span>Delivery Charge</span>
                <span>Rs {cart?.delivery_charge}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
                <span>Sub-total</span>
                <span>Rs {cart?.subtotal}</span>
            </div>
            <div className="flex justify-between py-2 border-b font-semibold">
                <span>Total</span>
                <span>Rs {cart?.total}</span>
            </div>

            {/* Payment Method */}
            <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
                >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="connect-ips" id="connect-ips" />
                    <Label htmlFor="connect-ips">Connect IPS</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="khalti" id="khalti" />
                    <Label htmlFor="khalti">Khalti by IME</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="esewa" id="esewa" />
                    <Label htmlFor="esewa">Esewa</Label>
                </div>
                </RadioGroup>
            </div>

            <Button className="w-full" type="submit">Check Out</Button>
        </div>

    </form>
  );
}
