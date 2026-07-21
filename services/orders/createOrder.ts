import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { CheckoutData } from "@/types/order";

export async function createOrder(
  checkoutData: CheckoutData
) {
  const now = new Date();
const estimatedDelivery = new Date(now);
estimatedDelivery.setMinutes(
  estimatedDelivery.getMinutes() + 35
);

  const order = {
    // User
    userId: checkoutData.userId,
    userDetails: checkoutData.userDetails,

    // Restaurant
    restaurantId: checkoutData.restaurantId,
    restaurantName: checkoutData.restaurantName,

    // Items
    items: checkoutData.items,

    // Pricing
    subtotal: checkoutData.itemTotal,
    deliveryFee: checkoutData.deliveryFee,
    serviceFee: checkoutData.serviceFee,
    tax: checkoutData.tax,
    discount: 0,
    couponCode: "",

    totalAmount: checkoutData.total,

    // Delivery
    deliveryAddress: checkoutData.address,
    specialInstructions: checkoutData.suggestions,

    // Payment
    paymentMethod: "card",
    paymentStatus: "completed",

// Status
orderStatus: "pending",

estimatedDeliveryTime: Timestamp.fromDate(
  estimatedDelivery
),

timeline: [
  {
    status: "pending",
    timestamp: Timestamp.fromDate(now),
    description: "Order placed successfully.",
  },
],

createdAt: serverTimestamp(),
updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(db, "orders"),
    order
  );

  const today = new Date();

  const date =
    `${today.getFullYear()}` +
    `${String(today.getMonth() + 1).padStart(2, "0")}` +
    `${String(today.getDate()).padStart(2, "0")}`;

  const orderNumber = `BL-${date}-${docRef.id
    .slice(0, 6)
    .toUpperCase()}`;

  await updateDoc(docRef, {
    orderNumber,
  });

  return {
    success: true,
    orderId: docRef.id,
    orderNumber,
  };
}