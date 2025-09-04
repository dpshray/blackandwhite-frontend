"use client";

import Image from "next/image";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ShoppingCart } from "lucide-react";
import CartSkeleton from "@/components/cart/CartSkeleton";

export default function Cart() {
  const { data: cart, isLoading } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  if (isLoading) {
    return <CartSkeleton />;
  }
  if (!cart || cart.data.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2 mb-6">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Button
          className="bg-black text-white rounded-lg px-6 py-2"
          onClick={() => (window.location.href = "/shop")}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 max-h-[550px] overflow-auto">
          {cart.data.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-6"
            >
              <div className="flex items-center gap-4">
                {/* Remove */}
                <Button
                    variant={"ghost"}
                    onClick={() => removeCartItem.mutate(item.id)}
                    disabled={updateCartItem.isPending}
                    aria-label="Remove Cart Item"
                    className="text-xl text-gray-500 hover:text-red-500"
                >
                  ✕
                </Button>

                {/* Image */}
                <Image
                  src={item.product.variant.image}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="object-cover rounded"
                />

                {/* Product Info */}
                <div>
                  <h2 className="font-semibold">{item.product.title}</h2>
                  <p className="text-gray-500 text-sm">
                    SIZE- {item.product.variant.size}
                  </p>
                  <p className="text-gray-500 text-sm">
                    COLOR- {item.product.variant.color}
                  </p>
                </div>
              </div>

              {/* Quantity + Price */}
              <div className="flex items-center gap-12">
                <div className="flex items-center border px-2">
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      updateCartItem.mutate({
                        id: item.id,
                        quantity: Math.max(1, item.quantity - 1),
                      })
                    }
                    className="px-2"
                  >
                    -
                  </Button>
                  <span className="px-2">{item.quantity}</span>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      updateCartItem.mutate({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="px-2"
                  >
                    +
                  </Button>
                </div>
                <p className="font-semibold">
                  Rs {item.product.variant.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Total */}
        <div className="h-fit border p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
          <div className="flex justify-between py-2 border-b">
            <span>Delivery Charge</span>
            <span>Rs {cart.delivery_charge}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Sub-total</span>
            <span>Rs {cart.subtotal}</span>
          </div>
          <div className="flex justify-between py-2 border-b font-semibold">
            <span>Total</span>
            <span>Rs {cart.total}</span>
          </div>

          {/* Promo Code */}
          <div className="flex mt-4">
            <Input
              type="text"
              placeholder="Apply Promo Code Here"
              className="rounded-none"
            />
            <Button className="rounded-none"><ArrowRight /></Button>
          </div>

          {/* Buttons */}
          <Button className="w-full bg-black text-white py-3 mt-4 rounded-none">
            Proceed to Checkout
          </Button>
          <Button variant={"outline"} className="w-full border-2 py-3 mt-3 rounded-none">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
