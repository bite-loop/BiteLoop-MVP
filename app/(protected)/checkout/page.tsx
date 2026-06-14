"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Home,
  Users,
  Plus,
  Ticket,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";

const addresses = [
  {
    id: "home",
    name: "Home",
    icon: Home,
    address: "123 Main Street, Toronto, ON",
    time: "25 MINS",
  },
  {
    id: "friend",
    name: "Friends & Family",
    icon: Users,
    address: "456 Queen Street, Toronto, ON",
    time: "30 MINS",
  },
];

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [noContact, setNoContact] = useState(false);
  const [suggestions, setSuggestions] = useState("");

const {
  cart,
  restaurantName,
  getTotal,
} = useCartStore();

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

  // Calculate totals
 const itemTotal = getTotal();
const deliveryFee = itemTotal > 30 ? 0 : 4.99;

const gstCharges = itemTotal * 0.13; 

const total = itemTotal + deliveryFee + gstCharges;
  const savings = 133.2;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8 pt-29">
        <h1 className="text-2xl font-bold mb-6 tracking-tight">SECURE CHECKOUT</h1>

        <div className="grid lg:grid-cols-[1.8fr_420px] gap-8 items-start">
          {/* Left Column: Delivery Address */}
          <div className="space-y-6">
            {/* Address Section */}
<div className="bg-card border rounded-2xl p-8">
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

  <div className="grid md:grid-cols-2 gap-6">
    {addresses.map((addr) => {
      const Icon = addr.icon;

      return (
        <div
          key={addr.id}
          onClick={() => setSelectedAddress(addr.id)}
          className={`border rounded-xl p-6 cursor-pointer transition-all ${
            selectedAddress === addr.id
              ? "border-primary bg-primary/5 shadow-md"
              : "hover:border-primary/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-start gap-3">
            <Icon className="mt-1" size={20} />

            <div>
              <h3 className="font-bold text-lg">
                {addr.name}
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                {addr.address}
              </p>

              <p className="font-semibold mt-6">
                {addr.time}
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
    <button className="border border-dashed rounded-xl p-6 w-full text-left hover:border-primary transition">
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
<div className="space-y-4 sticky top-24">

  {/* Restaurant Card */}
  <div className="bg-card border rounded-2xl p-5">
<h3 className="font-bold text-lg">
  {restaurantName || "Restaurant"}
</h3>

    <p className="text-sm text-muted-foreground mb-4">
      Titagarh
    </p>
<div className="w-12 h-px bg-border my-4" />
    <div className="space-y-3">
{cartItems.map(({ item, quantity }) => (
  <div
    key={item.id}
    className="flex justify-between text-sm"
  >
    <div>
      <p className="font-medium">
        {item.name}
      </p>

      <p className="text-muted-foreground">
        Qty {quantity}
      </p>
    </div>

    <span>
      ${(item.price * quantity).toFixed(2)}
    </span>
  </div>
))}
    </div>
  </div>

  {/* Suggestions */}
  <div className="bg-card border rounded-2xl p-4">
    <textarea
      value={suggestions}
      onChange={(e) =>
        setSuggestions(e.target.value)
      }
      rows={3}
      className="w-full resize-none outline-none bg-transparent text-sm"
      placeholder="Any suggestions? We will pass it on..."
    />
  </div>

  {/* No Contact */}
  <div className="bg-card border rounded-2xl p-4">
    <label className="flex gap-3">
      <input
        type="checkbox"
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
  <div className="bg-card border rounded-2xl p-4 cursor-pointer hover:border-primary transition">
    <div className="flex items-center gap-2">
      <Ticket size={18} />

      <span className="font-medium">
        Apply Coupon
      </span>
    </div>
  </div>

  {/* Bill */}
  <div className="bg-card border rounded-2xl p-5">
    <h3 className="font-bold mb-4">
      Bill Details
    </h3>

    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span>Item Total</span>
        <span>${itemTotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Delivery Fee</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>GST & Charges</span>
        <span>${gstCharges.toFixed(2)}</span>
      </div>

      <div className="border-t pt-3 mt-3">
        <div className="flex justify-between font-bold">
          <span>TO PAY</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>

  {/* Savings */}
  <div className="border border-green-500 bg-green-50 text-green-700 rounded-xl p-4 font-medium">
    Savings of ${savings.toFixed(2)}
  </div>

  <Button className="w-full h-12 text-base font-semibold">
    Proceed to Payment
  </Button>
</div>
        </div>
      </main>
    </>
  );
}