"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/lib/stores/checkoutStore";
import {
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import { motion ,AnimatePresence} from "framer-motion";

export default function PaymentPage() {
  const router = useRouter();

  const { checkoutData } =
    useCheckoutStore();

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [showSuccess, setShowSuccess] =
    useState(false);

  useEffect(() => {
    if (!checkoutData) {
      router.push("/checkout");
    }
  }, [checkoutData, router]);

  if (!checkoutData) return null;

  const methods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      icon: CreditCard,
    },
    {
      id: "gpay",
      title: "Google Pay",
      icon: Wallet,
    },
    {
      id: "cod",
      title: "Cash On Delivery",
      icon: Banknote,
    },
  ];

  return (
    <>
      <Navbar />

<motion.main
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.4,
  }}
  className="
max-w-7xl
mx-auto
px-6
pt-28
pb-10
min-h-screen
bg-gradient-to-b
from-background
to-primary/5
"
>

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Payment
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Complete Your Order
          </h1>

          <p className="text-muted-foreground mt-2">
            Choose a payment method and confirm your order.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Delivery Address */}
            <div className="bg-card border rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-4">
                <MapPin size={20} />
                <h2 className="font-bold text-lg">
                  Delivering To
                </h2>
              </div>

              <h3 className="font-semibold">
                {checkoutData.address?.label}
              </h3>

              <p className="text-muted-foreground mt-1">
                {checkoutData.address?.fullAddress}
              </p>

              <p className="text-sm text-primary mt-4">
                Estimated Delivery: 25-35 mins
              </p>

            </div>

<div
  className="
  relative
  overflow-hidden
  bg-primary
  rounded-2xl
  p-6
  shadow-xl
  "
>
  <div className="relative z-10">
    <p className="text-white/70 text-xs uppercase tracking-[0.25em]">
      Total Payable
    </p>

    <h2 className="text-4xl font-black text-white mt-2">
      ${checkoutData.total.toFixed(2)}
    </h2>

    <p className="text-white/80 text-sm mt-2">
      {checkoutData.restaurantName}
    </p>

    <div className="mt-5 flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-green-400" />

      <span className="text-sm text-white/80">
        Ready to place your order
      </span>
    </div>
  </div>

  <div
    className="
    absolute
    -right-8
    -top-8
    h-28
    w-28
    rounded-full
    bg-white/10
    "
  />

  <div
    className="
    absolute
    -right-2
    bottom-0
    h-16
    w-16
    rounded-full
    bg-white/5
    "
  />
</div>
            {/* Payment Methods */}
<motion.div
initial={{
  opacity: 0,
  scale: 0.9,
  y: 20,
}}
animate={{
  opacity: 1,
  scale: 1,
  y: 0,
}}
exit={{
  opacity: 0,
  scale: 0.95,
}}
transition={{
  duration: 0.2,
}}
className="
bg-card/80
backdrop-blur-xl
border
border-border/60
rounded-2xl
p-5
shadow-lg

"
>

              <h2 className="font-bold text-lg mb-5">
                Payment Method
              </h2>

              <div className="space-y-3">

{methods.map((method) => {
  const Icon = method.icon;

  return (
    <button
      key={method.id}
      onClick={() => setPaymentMethod(method.id)}
      className={`
      w-full
      flex
      items-center
      justify-between
      p-5
      border
      rounded-2xl
      transition-all
      duration-300
      hover:border-primary
      hover:-translate-y-1

      ${
        paymentMethod === method.id
          ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20 "
          : ""
      }
      `}
    >
      <div className="flex items-center gap-4">
        <Icon size={20} />

        <span className="font-medium">
          {method.title}
        </span>
      </div>

      <div
        className={`
        w-5
        h-5
        rounded-full
        border-2

        ${
          paymentMethod === method.id
            ? "bg-primary border-primary"
            : "border-muted-foreground"
        }
        `}
      />
    </button>
  );
})}

              </div>
<Button
  onClick={() => setShowSuccess(true)}
className="
w-full
h-14
text-base
font-semibold
rounded-2xl
bg-primary
shadow-lg
shadow-primary/20
hover:scale-[1.01]
hover:shadow-xl
hover:shadow-primary/30
transition-all
duration-300
mt-6
"
>
  {paymentMethod === "cod"
    ? "Place Order"
    : `Pay $${checkoutData.total.toFixed(2)}`}
</Button>
</motion.div>

</div>
</div>

</motion.main>

      {/* Success Modal */}
      <AnimatePresence>
{showSuccess && (
        <div className="
fixed
inset-0
z-[100]
bg-black/40
flex
items-center
justify-center
">

      <motion.div
  initial={{
    opacity: 0,
    scale: 0.9,
    y: 20,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.95,
    y: 20,
  }}
  transition={{
    duration: 0.2,
  }}
  className="
  bg-card
  border
  rounded-3xl
  p-8
  w-full
  max-w-md
  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
  "
>

            <div className="flex justify-center mb-5">
              <CheckCircle2
                size={90}
                className="
text-green-500
animate-pulse
"
              />
            </div>

<h2 className="text-4xl font-black text-center">
  Order Confirmed
</h2>

<p className="text-center text-muted-foreground mt-3">
  Your food is being prepared.
</p>

            <Button
              onClick={() => router.push("/")}
              className="
w-full
h-14
mt-6
text-base
font-bold
rounded-2xl
bg-primary
shadow-lg
shadow-primary/20
hover:scale-[1.02]
hover:shadow-xl
hover:shadow-primary/30
transition-all
duration-300
"
            >
              Back to Home
          </Button>

        </motion.div>

      </div>
    )}
</AnimatePresence>
</>
);
}