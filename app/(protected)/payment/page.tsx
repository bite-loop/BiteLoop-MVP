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
import Confetti from "react-confetti";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();

  const { checkoutData } =
    useCheckoutStore();

  const [paymentMethod, setPaymentMethod] =
    useState("card");

    const [expandedMethod, setExpandedMethod] =
  useState<string | null>("upi");

  const [upiOption, setUpiOption] =
  useState("gpay");

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
    id: "wallet",
    title: "Wallets",
    icon: Wallet,
    subtitle: "Paytm, Amazon Pay, PhonePe",
  },
  {
    id: "card",
    title: "Add Credit or Debit Cards",
    icon: CreditCard,
    subtitle: "Visa, Mastercard, RuPay",
  },
  {
    id: "netbanking",
    title: "Netbanking",
    icon: Banknote,
    subtitle: "All major banks",
  },
  {
    id: "upi",
    title: "UPI",
    icon: Wallet,
    subtitle: "Google Pay, PhonePe, BHIM",
  },
  {
    id: "cash",
    title: "Cash",
    icon: Banknote,
    subtitle: "Pay on delivery",
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
    <div key={method.id}>

    <button
      
      onClick={() => {
  setPaymentMethod(method.id);

  setExpandedMethod(
    expandedMethod === method.id
      ? null
      : method.id
  );
}}
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

  <div className="text-left">
    <p className="font-semibold">
      {method.title}
    </p>

    <p className="text-xs text-muted-foreground">
      {method.subtitle}
    </p>
  </div>
</div>

{expandedMethod === method.id ? (
  <ChevronDown size={20} />
) : (
  <ChevronRight size={20} />
)}

    </button>
{expandedMethod === method.id &&
  method.id === "upi" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="
      mt-4
      rounded-2xl
      border
      bg-muted/20
      p-5
      "
    >
      <h3 className="font-semibold text-lg">
        Scan QR to pay
      </h3>

      <p className="text-sm text-muted-foreground mt-2">
        Use any UPI app on your phone to scan and pay
      </p>

      <div className="flex items-center gap-3 mt-4">
        <div className="px-3 py-2 border rounded-lg text-sm font-medium">
          Google Pay
        </div>

        <div className="px-3 py-2 border rounded-lg text-sm font-medium">
          PhonePe
        </div>

        <div className="px-3 py-2 border rounded-lg text-sm font-medium">
          Paytm
        </div>

        <span className="text-sm text-muted-foreground">
          or others
        </span>
      </div>

<div
  className="
  mt-6
  relative
  h-[290px]
  w-[290px]
  rounded-2xl
  bg-zinc-800
  overflow-hidden
  flex
  items-center
  justify-center
  "
>
  {/* QR Image */}
  <img
    src="/qr-placeholder.png"
    alt="QR Code"
    className="
    h-[250px]
    w-[250px]
    object-contain
    "
  />

  {/* Generate Button */}
  <button
    className="
    absolute
    px-6
    py-3
    rounded-2xl
    bg-primary
    text-white
    font-semibold
    shadow-lg
    hover:scale-105
    transition-all
    duration-300
    "
  >
    Generate QR
  </button>
</div>
    </motion.div>
)}

{expandedMethod === method.id &&
  method.id === "cash" && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="
      mt-4
      rounded-2xl
      border
      bg-muted/20
      p-5
      "
    >
      <p className="text-sm text-muted-foreground">
        Please keep exact change handy to help us serve you better.
      </p>

      <Button
        onClick={() => setShowSuccess(true)}
        className="
        w-full
        h-14
        mt-4
        rounded-2xl
        font-semibold
        "
      >
        Place Order
      </Button>
    </motion.div>
)}
    </div>
  );
  
})}

              </div>
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
  <Confetti
  recycle={false}
  numberOfPieces={300}
  gravity={0.45}
  initialVelocityY={20}
  initialVelocityX={14}
  tweenDuration={3000}
/>

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
<motion.div
  initial={{
    scale: 0,
    rotate: -180,
  }}
  animate={{
    scale: 1,
    rotate: 0,
  }}
  transition={{
    type: "spring",
    stiffness: 180,
    damping: 12,
  }}
>
  <CheckCircle2
    size={90}
    className="text-green-500"
  />
</motion.div>
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