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
  useState<string | null>(null);

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
<div
  className="
  mx-auto
  grid
  max-w-7xl
  gap-8
  lg:grid-cols-[minmax(0,1fr)_380px]
  items-start
  "
>

{/* LEFT COLUMN */}

<div className="space-y-6">

            {/* Delivery Address */}
            <div className="bg-card border rounded-2xl p-6">

<div className="flex items-start justify-between mb-5">

<div className="flex items-center gap-3">

<MapPin
className="text-primary"
size={20}
/>

<div>

<h2 className="font-bold text-lg">
Delivering To
</h2>

<p className="text-xs text-muted-foreground">
Delivery Address
</p>

</div>

</div>

<Button
variant="ghost"
size="sm"
className="rounded-xl"
>

Change

</Button>

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

<div className="mb-6">

<h2 className="text-2xl font-bold">
Choose Payment Method
</h2>

<p className="mt-1 text-sm text-muted-foreground">
Select your preferred payment option.
</p>

</div>

              <div className="space-y-3">

{methods.map((method) => {
  const Icon = method.icon;

  return (
    <div key={method.id}>

    <button
      
onClick={() => {
  setPaymentMethod(method.id);
  setExpandedMethod(method.id);
}}
className={`
w-full
flex
items-center
justify-between
rounded-3xl
border
border-border
bg-card
p-5
transition-all
duration-300
hover:-translate-y-1
hover:border-primary
hover:shadow-xl
hover:shadow-primary/10

${
paymentMethod === method.id
? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-lg"
: ""
}
`}
    >
<div className="flex items-center gap-4">

  <div
    className={`
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      transition-all
      ${
        paymentMethod === method.id
          ? "bg-primary text-white shadow-lg"
          : "bg-primary/10 text-primary"
      }
    `}
  >
    <Icon size={22} />
  </div>

  <div className="text-left">

    <p className="font-semibold text-[15px]">
      {method.title}
    </p>

    <p className="mt-1 text-xs text-muted-foreground">
      {method.subtitle}
    </p>

  </div>

</div>
<motion.div
  animate={{
    rotate: expandedMethod === method.id ? 90 : 0,
  }}
  transition={{
    duration: 0.2,
  }}
>
  <ChevronRight
    size={20}
    className="text-muted-foreground"
  />
</motion.div>

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

<div className="mt-5 flex flex-wrap gap-3">

{[
  {
    id: "gpay",
    label: "Google Pay",
  },
  {
    id: "phonepe",
    label: "PhonePe",
  },
  {
    id: "paytm",
    label: "Paytm",
  },
  {
    id: "bhim",
    label: "BHIM",
  },
].map((app) => (

<button
key={app.id}
onClick={() => setUpiOption(app.id)}
className={`
rounded-xl
px-4
py-2
text-sm
font-semibold
transition-all
duration-300

${
upiOption === app.id
? "bg-primary text-white shadow-lg"
: "border hover:border-primary hover:bg-primary/5"
}
`}
>

{app.label}

</button>

))}

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
<div
className="
mt-6
rounded-3xl
border
bg-card
p-6
"
>

<div className="flex justify-between">

<div>

<p className="text-xs text-muted-foreground">
Amount
</p>

<p className="font-bold text-2xl">
₹{checkoutData.total.toFixed(2)}
</p>

</div>

<div className="text-right">

<p className="text-xs text-muted-foreground">
Selected
</p>

<p className="font-semibold capitalize">
{upiOption}
</p>

</div>

</div>

<div className="mt-6 flex justify-center">

<img
src="/qr-placeholder.png"
className="h-56 w-56 rounded-2xl"
/>

</div>

</div>
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

    </motion.div>
)}
    </div>
  );
  
})}

              </div>
    </motion.div>
</div>

{/* RIGHT COLUMN */}

<div
  className="
  lg:sticky
  lg:top-28
  space-y-6
  "
>

  <motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  className="
  rounded-3xl
  border
  border-border/60
  bg-card
  shadow-xl
  overflow-hidden
"
>
  {/* Header */}
  <div className="bg-primary p-6 text-white">
    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
      ORDER SUMMARY
    </p>

    <h2 className="mt-2 text-4xl font-black">
      ₹{checkoutData.total.toFixed(2)}
    </h2>

    <p className="mt-2 text-white/80">
      {checkoutData.restaurantName}
    </p>
  </div>

  {/* Body */}
<div className="space-y-5 p-6">

<h3 className="font-semibold text-lg">
Your Order
</h3>

<div className="space-y-4">

{checkoutData.items.map((item) => (

<div
key={item.id}
className="flex items-center justify-between"
>

<div className="flex items-center gap-3">

<img
src={item.image}
alt={item.name}
className="h-12 w-12 rounded-xl object-cover"
/>

<div>

<p className="font-medium">
{item.name}
</p>

<p className="text-xs text-muted-foreground">

Qty {item.quantity}

</p>

</div>

</div>

<p className="font-semibold">

${item.totalPrice.toFixed(2)}

</p>

</div>

))}

</div>

<div className="border-t pt-5 space-y-3">

<div className="flex justify-between">

<span className="text-muted-foreground">

Item Total

</span>

<span>

${checkoutData.itemTotal.toFixed(2)}

</span>

</div>

<div className="flex justify-between">

<span className="text-muted-foreground">

Delivery Fee

</span>

<span>

{checkoutData.deliveryFee === 0
? "FREE"
: `$${checkoutData.deliveryFee.toFixed(2)}`}

</span>

</div>

<div className="flex justify-between">

<span className="text-muted-foreground">

Platform Fee

</span>

<span>

${checkoutData.serviceFee.toFixed(2)}

</span>

</div>

<div className="flex justify-between">

<span className="text-muted-foreground">

Tax

</span>

<span>

${checkoutData.tax.toFixed(2)}

</span>

</div>

<div className="border-t pt-3 flex justify-between text-lg font-bold">

<span>Total</span>

<span>

${checkoutData.total.toFixed(2)}

</span>

</div>

</div>

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