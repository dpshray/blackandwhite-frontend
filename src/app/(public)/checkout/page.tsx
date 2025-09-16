"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/hooks/useCart";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/fields/TextInput";
import {
  useAddAddressInfo,
  useAddressInfo,
} from "@/hooks/useAddress";
import { useAddOrder } from "@/hooks/useOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const checkoutSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  contact_number: z.string().min(7, "Contact number is too short"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const { data: cart, isLoading, isFetched } = useCart();
    const { data: addresses, isLoading: isLoadingAddresses } = useAddressInfo();
    const addAddress = useAddAddressInfo();
    const { mutate: addOrder, isPending: isPlacingOrder } = useAddOrder();
    const router = useRouter();

  const hasAddress = addresses && addresses.length > 0;
  const defaultAddress = hasAddress ? addresses[0] : null;
  
  const [mode, setMode] = useState<"view" | "select" | "add">("add");

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setMode("view");
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    defaultAddress?.id ?? null
  );

  useEffect(() => {
    if (!isLoading && isFetched) {
      if (!cart || cart.data.length === 0) {
        toast.error("Your cart is empty");
        router.replace("/shop");
      }
    }
  }, [cart, isLoading, isFetched, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onAddAddressSubmit = (data: CheckoutFormData) => {
    addAddress.mutate(data, {
      onSuccess: (newAddr: any) => {
        if (newAddr?.id) setSelectedAddressId(newAddr.id);
        setMode("select");
      },
    });
  };

  const handleCheckout = () => {
    if (!selectedAddressId) {
      toast.error("Please select or add an address");
      return;
    }
    addOrder(selectedAddressId);
  };

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-6 w-40" /> 
          <Skeleton className="h-40 w-full rounded-md" /> 
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>

        <div className="h-fit border p-6 rounded-md space-y-6">
          <Skeleton className="h-6 w-32" /> 
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-10 w-full rounded-md" /> 
        </div>
      </div>
    );
  }

  if (isFetched && (!cart || cart.data.length === 0)) {
    return null; 
  }

  if (isLoadingAddresses) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 lg:col-span-2 space-y-6">
        <Skeleton className="h-6 w-40" /> 
        <Skeleton className="h-40 w-full rounded-md" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left Side - Billing Information */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-semibold">Billing Information</h2>

        {/* VIEW MODE */}
        {mode === "view" && selectedAddressId && (
          <>
            <div className="border p-4 rounded-md">
              {addresses
                ?.filter((a) => a.id === selectedAddressId)
                .map((a) => (
                  <div key={a.id}>
                    <p>
                      {a.first_name} {a.last_name}
                    </p>
                    <p>{a.email}</p>
                    <p>{a.contact_number}</p>
                    <p>
                      {a.address}, {a.city}, {a.state}
                    </p>
                  </div>
                ))}
            </div>
            <Button variant="outline" onClick={() => setMode("select")}>
              Edit
            </Button>
          </>
        )}

        {/* SELECT MODE */}
        {mode === "select" && (
          <div className="space-y-4">
            <RadioGroup
              value={selectedAddressId?.toString()}
              onValueChange={(value) => setSelectedAddressId(Number(value))}
              className="space-y-4"
            >
              {addresses?.map((addr) => (
                <Label
                  key={addr.id}
                  htmlFor={`address-${addr.id}`}
                  className="border p-3 rounded-md flex items-center justify-between cursor-pointer hover:bg-accent"
                >
                  <div className="space-y-2">
                    <p>
                      {addr.first_name} {addr.last_name}
                    </p>
                    <p>{addr.email}</p>
                    <p>{addr.contact_number}</p>
                    <p>
                      {addr.address}, {addr.city}, {addr.state}
                    </p>
                  </div>
                  <RadioGroupItem
                    id={`address-${addr.id}`}
                    value={addr.id.toString()}
                    className="ml-2"
                  />
                </Label>
              ))}
            </RadioGroup>

            <div className="flex gap-4">
              <Button onClick={() => setMode("add")}>Add New Address</Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedAddressId) setMode("view");
                }}
              >
                Done
              </Button>
            </div>
          </div>
        )}

        {/* ADD MODE */}
        {mode === "add" && (
          <form
            onSubmit={handleSubmit(onAddAddressSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextInput
                label="First Name*"
                name="first_name"
                placeholder="First Name"
                error={errors.first_name}
                register={register}
              />
              <TextInput
                label="Last Name*"
                name="last_name"
                placeholder="Last Name"
                error={errors.last_name}
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
                name="contact_number"
                placeholder="Contact Number"
                error={errors.contact_number}
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
            <div className="flex gap-4">
              <Button type="submit">Save Address</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMode("select")}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Right Side - Cart Total + Payment */}
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
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" disabled />
              <Label htmlFor="cod">Cash on Delivery</Label>
            </div>
          </RadioGroup>
        </div>


        <Button
          className="w-full"
          onClick={handleCheckout}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing order..." : "Check Out"}
        </Button>
      </div>
    </div>
  );
}
