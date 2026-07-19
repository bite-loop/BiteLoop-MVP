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

export default function OrderDetailsPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

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

  const statusSteps: OrderStatus[] = [
    "confirmed",
    "preparing",
    "ready_for_pickup",
    "in_transit",
    "delivered",
  ];

  const currentStep = Math.max(
    statusSteps.indexOf(order.orderStatus),
    0
  );

  const timeline = [
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
      icon: Clock3,
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
  }, [order.paymentMethod]);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-16">

        {/* Hero */}

        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="flex items-center gap-4">

                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">

                  <CheckCircle2 className="h-9 w-9 text-green-600" />

                </div>

                <div>

                  <p className="text-green-600 font-semibold">
                    Order Confirmed
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

                  <p className="font-semibold text-lg capitalize">
                    {order.paymentStatus}
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-primary/10 border border-primary/20 px-8 py-6">

              <p className="text-muted-foreground text-sm">
                Estimated Delivery
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {order.estimatedDeliveryTime}
              </h2>

            </div>

          </div>

        </section>

        {/* Timeline */}

        <section className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-sm">

          <h2 className="text-2xl font-bold mb-8">
            Order Progress
          </h2>

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
                      {completed
                        ? "Completed"
                        : "Waiting"}
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

                {order.items.map((item) => (

                  <div
                    key={item.menuItemId}
                    className="flex items-center gap-4 border-b border-border pb-5 last:border-none last:pb-0"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover border"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold text-lg">
                        {item.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-bold">
                        ${item.totalPrice.toFixed(2)}
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

                <p className="font-semibold">
                  {order.userDetails.name}
                </p>

                <p className="text-muted-foreground">
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
                  📞 {order.userDetails.phone}
                </p>

              </div>

            </section>

          </div>

          {/* Right Side */}

          <div className="space-y-8">

            {/* Payment */}

            <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">

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

                  <span className="font-semibold capitalize text-green-600">
                    {order.paymentStatus}
                  </span>

                </div>

              </div>

            </section>

            {/* Bill */}

            <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">

              <h2 className="text-2xl font-bold mb-6">
                Bill Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span>
                    ${order.subtotal.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Delivery Fee
                  </span>

                  <span>
                    ${order.deliveryFee.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Service Fee
                  </span>

                  <span>
                    ${order.serviceFee.toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Tax
                  </span>

                  <span>
                    ${order.tax.toFixed(2)}
                  </span>

                </div>

                {order.discount > 0 && (

                  <div className="flex justify-between text-green-600">

                    <span>
                      Discount
                    </span>

                    <span>
                      -${order.discount.toFixed(2)}
                    </span>

                  </div>

                )}

                <div className="border-t border-border pt-5 flex justify-between text-xl font-bold">

                  <span>Total</span>

                  <span>
                    ${order.totalAmount.toFixed(2)}
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