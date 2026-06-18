"use client";

import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Plus,
  Ticket,
  Trash2,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useAuthStore } from "@/lib/stores/authStore";
import { useState, useEffect } from "react";
import type { Address } from "@/types/user";

export default function CheckoutPage() {
 const [selectedAddress, setSelectedAddress] =
  useState<string>("");
  const [noContact, setNoContact] = useState(false);
  const [suggestions, setSuggestions] = useState("");

const {
  cart,
  restaurantName,
  getTotal,
  removeFromCart,
} = useCartStore();
const { user } = useAuthStore();

const addresses = (user?.savedAddresses ?? []) as Address[];

useEffect(() => {
  const defaultAddress =
    addresses.find((a) => a.isDefault);

  if (defaultAddress) {
    setSelectedAddress(defaultAddress.id);
  }
}, [addresses]);

const cartItems = Array.from(cart.values());
if (cartItems.length === 0) {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-4">
          Your cart is empty
        </h1>

        <p className="text-muted-foreground">
          Add some delicious food before checkout.
        </p>
      </main>
    </>
  );
}


// Cart subtotal
const itemTotal = getTotal();

// Delivery fee
// Free delivery above $35
const deliveryFee = itemTotal >= 35 ? 0 : 4.99;

// Platform / service fee
const serviceFee = itemTotal > 0 ? 1.99 : 0;

// HST (Ontario example: 13%)
const tax = (itemTotal + deliveryFee + serviceFee) * 0.13;

// Savings
const savings =
  itemTotal >= 35 ? 4.99 : 0;

// Final total
const total =
  itemTotal +
  deliveryFee +
  serviceFee +
  tax;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8 pt-29">
        <h1 className="text-2xl font-bold mb-6 tracking-tight">SECURE CHECKOUT</h1>

        <div className="grid lg:grid-cols-[1.8fr_420px] gap-8 items-start">
          {/* Left Column: Delivery Address */}
          <div className="space-y-6">
            {/* Address Section */}
<div className="bg-card border rounded-xl p-8 shadow-sm">
  <div className="flex items-start gap-4 mb-8">
    <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-lg shadow-md">
      <MapPin size={22} />
    </div>

    <div>
      <h2 className="text-2xl font-bold">
        Choose a delivery address
      </h2>

      <p className="text-muted-foreground">
        Multiple addresses in this location
      </p>
    </div>
  </div>
{addresses.length === 0 && (
  <div className="text-center py-10">
    <p className="text-muted-foreground">
      No saved addresses found.
    </p>
  </div>
)}
  <div className="grid md:grid-cols-2 gap-4">
    {addresses.map((addr) => {

      return (
        
        <div
          key={addr.id}
          onClick={() => setSelectedAddress(addr.id)}
          className={`border rounded-xl p-4 cursor-pointer transition-all ${
            selectedAddress === addr.id
              ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
              : "hover:border-primary/50 hover:shadow-md"
          }`}>

          <div className="flex items-start gap-3">
            <MapPin className="mt-1" size={20} />

            <div>
              <h3 className="font-bold text-lg">
                {addr.label}
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                {addr.fullAddress}
              </p>

              <p className="font-semibold mt-6">
                30-40 MINS
              </p>

              <Button
                size="sm"
                className="mt-4"
              >
                Deliver Here
              </Button>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  <div className="mt-6">
    <button className="border border-dashed rounded-xl p-4 w-full text-left hover:border-primary transition">
      <div className="flex items-center gap-3">
        <Plus />

        <div>
          <p className="font-semibold">
            Add New Address
          </p>

          <p className="text-sm text-muted-foreground">
            Save another delivery location
          </p>
        </div>
      </div>
    </button>
  </div>
</div>


          </div>

          {/* Right Column: Bill Summary */}
          <div className="space-y-3 sticky top-20 max-w-[400px]">
<h2 className="font-semibold text-lg mb-2">
  Order Summary
</h2>

  {/* Restaurant Card */}
  <div className="bg-card border rounded-2xl p-4 shadow-sm">
<div className="flex items-center justify-between mb-4">
  <div>
    <h3 className="font-semibold text-lg">
      {restaurantName || "Restaurant"}
    </h3>

    <p className="text-sm text-muted-foreground mt-1">
      25-35 min delivery
    </p>
  </div>

  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
    {cartItems.length} Items
  </span>
</div>

<div className="w-12 h-px bg-border my-4" />
    <div className="space-y-4">
{cartItems.map(({ item, quantity }) => (
<div
  key={item.id}
  className="flex items-center justify-between"
>
  <div className="flex-1">
    <p className="font-medium">
      {item.name}
    </p>

    <p className="text-xs text-muted-foreground">
      Qty {quantity}
    </p>
  </div>

  <div className="flex items-center gap-3">
    <p className="font-semibold">
      ${(item.price * quantity).toFixed(2)}
    </p>

    <button
      onClick={() => removeFromCart(item.id)}
      className="
      p-2
      rounded-lg
      text-muted-foreground
      hover:text-red-500
      hover:bg-red-500/10
      transition-all
      "
    >
      <Trash2 size={16} />
    </button>
  </div>
</div>
))}
    </div>
  </div>

 {/* Suggestions */}
<div className="bg-card border rounded-2xl p-4">

  <h3 className="font-semibold mb-3">
    Delivery Instructions
  </h3>
    <textarea
      value={suggestions}
      placeholder="Extra napkins, less spicy, ring bell once..."
      onChange={(e) =>
        setSuggestions(e.target.value)
      }
      rows={3}
      className="
w-full
resize-none
rounded-xl
border
bg-background
p-3
text-sm
outline-none
"
    />
  </div>

  {/* No Contact */}
  <div className="bg-card border rounded-2xl p-4">
    <label className="flex items-start gap-4 cursor-pointer">
<input
  type="checkbox"
  className="mt-1 h-4 w-4"
        checked={noContact}
        onChange={(e) =>
          setNoContact(e.target.checked)
        }
      />

      <div>
        <p className="font-semibold">
          Opt in for No-contact Delivery
        </p>

        <p className="text-sm text-muted-foreground">
          Delivery partner will leave the order
          outside your door.
        </p>
      </div>
    </label>
  </div>

  {/* Coupon */}
  <div
  className="
  bg-primary/5
  border
  border-primary/20
  rounded-2xl
  p-4
  cursor-pointer
  hover:bg-primary/10
  transition
  "
>
  <div className="flex items-center gap-3">
  <Ticket size={20} />

  <div>
    <p className="font-semibold">
      Apply Coupon
    </p>

    <p className="text-xs text-muted-foreground">
      Save more on this order
    </p>
  </div>
</div>
  </div>

 {/* Bill */}
<div className="bg-card border rounded-2xl p-4">
  <h3 className="font-bold mb-4">
    Bill Details
  </h3>

  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span>Item Total</span>
      <span>${itemTotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <span>Delivery Fee</span>
      <span>
        {deliveryFee === 0
          ? "FREE"
          : `$${deliveryFee.toFixed(2)}`}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Platform Fee</span>
      <span>${serviceFee.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <span>HST (13%)</span>
      <span>${tax.toFixed(2)}</span>
    </div>

    <div className="border-t pt-4 mt-4">
      <div className="flex justify-between font-bold text-lg">
        <span>TO PAY</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
</div>

  {/* Savings */}
<div className="
border
border-green-500/30
bg-green-500/10
text-green-600
rounded-2xl
p-4
font-semibold
">
  You saved ${savings.toFixed(2)}
</div>

  <Button
className="
w-full
h-12
text-sm
font-semibold
rounded-xl
bg-primary
hover:scale-[1.01]
transition-all
"
>
    Proceed to Payment
  </Button>

</div>
</div>
      
      </main>
    </>
  );
}