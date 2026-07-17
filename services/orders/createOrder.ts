import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { CheckoutData } from "@/types/order";

export async function createOrder(
  checkoutData: CheckoutData
) {
  const order = {
    restaurantId: checkoutData.restaurantId,
    restaurantName: checkoutData.restaurantName,

    items: checkoutData.items,

    subtotal: checkoutData.itemTotal,
    deliveryFee: checkoutData.deliveryFee,
    serviceFee: checkoutData.serviceFee,
    tax: checkoutData.tax,
    totalAmount: checkoutData.total,

    deliveryAddress: checkoutData.address,

    paymentMethod: "card",
    paymentStatus: "completed",
    orderStatus: "pending",

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(
    collection(db, "orders"),
    order
  );

  return {
    success: true,
    orderId: docRef.id,
  };
}