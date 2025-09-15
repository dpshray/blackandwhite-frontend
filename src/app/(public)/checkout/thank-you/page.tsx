'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/useCart";
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ThankYou() {
  const { data: cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!cart || cart.data.length === 0) {
        router.replace("/shop"); 
    }
  }, [cart, router]);
  
  if (!cart || cart.data.length === 0) return null;
  
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 flex items-center justify-center py-10 px-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
              <div className="absolute inset-0 w-16 h-16 bg-green-500/20 rounded-full animate-ping" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Thank You!</h1>
            <p className="text-muted-foreground">Your order has been successfully placed</p>
          </div>

          {/* Order Details */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Package className="w-4 h-4" />
              <span>Order confirmation sent to your email</span>
            </div>
            <p className="text-xs text-muted-foreground">You&apos;ll receive tracking information once your order ships</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/shop" className="flex items-center gap-2">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Footer Message */}
          {/* <p className="text-xs text-muted-foreground pt-4 border-t">
            Need help? Contact our{" "}
            <Link href="/support" className="text-primary hover:underline">
              customer support
            </Link>
          </p> */}
        </CardContent>
      </Card>
    </div>
  )
}
