"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import {
  CheckCircle2,
  Clock3,
  ChefHat,
  Bike,
  PackageCheck,
  MapPin,
  CreditCard,
  Receipt,
} from "lucide-react";

import Navbar from "@/components/navbar/navbar";
import { db } from "@/lib/firebase/config";
import type { Order, OrderStatus } from "@/types/order";
import Image from "next/image";

export default function OrderDetailsPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

const formatPrice = (price:number)=>
new Intl.NumberFormat("en-CA",{
style:"currency",
currency:"CAD",
}).format(price);

const paymentColor: Record<Order["paymentStatus"], string> = {
completed:"text-green-600",
pending:"text-yellow-600",
processing:"text-blue-600",
failed:"text-red-600",
cancelled:"text-red-600",
refunded:"text-orange-600"
}

const orderStatusColor: Record<OrderStatus, string> = {
  pending: "text-yellow-600",
  confirmed: "text-green-600",
  preparing: "text-orange-500",
  ready_for_pickup: "text-blue-600",
  picked_up: "text-indigo-600",
  in_transit: "text-purple-600",
  delivered: "text-green-600",
  cancelled: "text-red-600",
};
const orderStatusText: Record<OrderStatus, string> = {
  pending: "Order Pending",
  confirmed: "Order Confirmed",
  preparing: "Preparing Food",
  ready_for_pickup: "Ready for Pickup",
  picked_up: "Picked Up",
  in_transit: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Order Cancelled",
};

  useEffect(() => {
    async function fetchOrder() {
      try {
        if (!orderId) return;

        const docRef = doc(db, "orders", orderId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrder({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Order, "id">),
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);



const statusSteps: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready_for_pickup",
  "picked_up",
  "in_transit",
  "delivered",
];

const currentStep = Math.max(
  statusSteps.indexOf(order?.orderStatus ?? "pending"),
  0
);

const timeline = [
  {
    title: "Order Pending",
    icon: Clock3,
  },
  {
    title: "Order Confirmed",
    icon: CheckCircle2,
  },
  {
    title: "Preparing Food",
    icon: ChefHat,
  },
  {
    title: "Ready for Pickup",
    icon: PackageCheck,
  },
  {
    title: "Picked Up",
    icon: Bike,
  },
  {
    title: "Out for Delivery",
    icon: Bike,
  },
  {
    title: "Delivered",
    icon: PackageCheck,
  },
];

const paymentMethod = useMemo(() => {
  if (!order) return "";

  switch (order.paymentMethod) {
    case "card":
      return "Card";
    case "upi":
      return "UPI";
    case "wallet":
      return "Wallet";
    case "cash":
      return "Cash";
    case "netbanking":
      return "Net Banking";
    default:
      return order.paymentMethod;
  }
}, [order]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading Order...
        </h2>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Order Not Found
        </h2>
      </main>
    );
  }
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-16">

        {/* Hero */}

        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="flex items-center gap-4">

                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">

                  <CheckCircle2 className={`h-8 w-8 ${orderStatusColor[order.orderStatus]}`} />

                </div>

                <div>
<p
  className={`text-lg font-semibold ${orderStatusColor[order.orderStatus]}`}
>
  {orderStatusText[order.orderStatus]}
</p>

                  <h1 className="text-3xl lg:text-4xl font-bold mt-1">
                    {order.restaurantName}
                  </h1>

                </div>

              </div>

              <div className="flex flex-wrap gap-8 mt-8">

                <div>

                  <p className="text-sm text-muted-foreground">
                    Order Number
                  </p>

                  <p className="font-semibold text-lg">
                    #{order.orderNumber}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Payment
                  </p>
<p
  className={`font-semibold text-lg capitalize ${paymentColor[order.paymentStatus]}`}
>
  {order.paymentStatus.replace(/_/g, " ")}
</p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-primary/10 border border-primary/20 px-8 py-6">

              <p className="text-muted-foreground text-sm">
                Estimated Delivery
              </p>

<h2 className="text-3xl font-bold mt-2">
  {order.estimatedDeliveryTime.toDate().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
</h2>

            </div>

          </div>

        </section>

        {/* Timeline */}

        <section className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-sm">

<h2 className="text-2xl font-bold mb-2">
  Order Progress
</h2>

<p className="text-muted-foreground mb-8">
  Track your order in real time.
</p>

          <div className="space-y-7">

            {timeline.map((step, index) => {

              const Icon = step.icon;

              const completed = index <= currentStep;

              return (

                <div
                  key={step.title}
                  className="flex items-start gap-5"
                >

                  <div
className={`h-12 w-12 rounded-full flex items-center justify-center border transition-all ${
  completed
    ? "bg-primary text-primary-foreground border-primary"
    : "border-border text-muted-foreground"
}`}
                  >

                    <Icon className="h-5 w-5" />

                  </div>

                  <div>

                    <p
className={`font-semibold ${
  completed
    ? "text-foreground"
    : "text-muted-foreground"
}`}
                    >
                      {step.title}
                    </p>

<p className="text-sm text-muted-foreground mt-1">
  {completed ? "Completed" : "Pending"}
</p>

                  </div>

                </div>

              );

            })}

          </div>

        </section>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-8">
                        {/* Order Items */}

            <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">

              <div className="flex items-center gap-3 mb-6">

                <Receipt className="h-6 w-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  Your Order
                </h2>

              </div>

              <div className="space-y-5">

                {order.items.map((item, index) => (

                  <div
                    key={`${item.menuItemId}-${index}`}
                    className="flex items-center gap-4 border-b border-border pb-5 last:border-none last:pb-0"
                  >
<Image
  src={item.image || "/images/food-placeholder.png"}
  alt={item.name}
  width={80}
  height={80}
  className="h-20 w-20 rounded-xl object-cover border"
/>

                    <div className="flex-1">

                      <h3 className="font-semibold text-lg">
                        {item.name}
                      </h3>

<p className="text-sm text-muted-foreground mt-1">
  Quantity: {item.quantity}
</p>

                    </div>

                    <div className="text-right">

<p className="font-bold text-lg">
  {formatPrice(item.totalPrice)}
</p>
                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* Delivery Address */}

            <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">

              <div className="flex items-center gap-3 mb-6">

                <MapPin className="h-6 w-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  Delivery Address
                </h2>

              </div>

              <div className="space-y-2">
<p className="font-semibold text-lg">
  {order.userDetails.name}
</p>

<p className="text-muted-foreground leading-7">
  {order.deliveryAddress.fullAddress}
</p>

                <p className="text-muted-foreground">
                  {order.deliveryAddress.street}
                </p>

                <p className="text-muted-foreground">
                  {order.deliveryAddress.city},{" "}
                  {order.deliveryAddress.state}
                </p>

                <p className="text-muted-foreground">
                  {order.deliveryAddress.zipCode}
                </p>

<p className="pt-3 font-medium">
  Phone: {order.userDetails.phone}
</p>    

              </div>

            </section>

          </div>

          {/* Right Side */}

          <div className="space-y-8">

            {/* Payment */}

            <section className="sticky top-28 rounded-3xl border border-border bg-card p-8 shadow-sm">

              <div className="flex items-center gap-3 mb-6">

                <CreditCard className="h-6 w-6 text-primary" />

                <h2 className="text-2xl font-bold">
                  Payment
                </h2>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Method
                  </span>

                  <span className="font-semibold">
                    {paymentMethod}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Status
                  </span>

<span
  className={`font-semibold capitalize ${paymentColor[order.paymentStatus]}`}
>
  {order.paymentStatus.replace(/_/g, " ")}
</span>

                </div>

              </div>

            </section>

            {/* Bill */}

            <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">

<h2 className="text-2xl font-bold mb-6">
  Payment Summary
</h2>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span>
                    {formatPrice(order.subtotal)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Delivery Fee
                  </span>

                  <span>
                    {formatPrice(order.deliveryFee)}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Service Fee
                  </span>

                  <span>
                    {formatPrice(order.serviceFee)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Tax
                  </span>

                  <span>
                    {formatPrice(order.tax)}
                  </span>

                </div>

{order.discount > 0 && (
  <div className="flex justify-between text-green-600 font-medium">
    <span>Discount</span>
    <span>-{formatPrice(order.discount)}</span>
  </div>
)}

                 
              

                <div className="border-t border-border pt-5 flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>
                    {formatPrice(order.totalAmount)}
                  </span>

                </div>

              </div>

            </section>

          </div>

        </div>

      </main>

    </>

  );

}