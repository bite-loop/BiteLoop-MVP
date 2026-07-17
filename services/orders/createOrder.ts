import type { CheckoutData } from "@/types/order";

export async function createOrder(
  checkoutData: CheckoutData
) {
  console.log("Creating Order...");

  console.log(checkoutData);

  return {
    success: true,
    orderId: "TEMP_ORDER_ID",
  };
}