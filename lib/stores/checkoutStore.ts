import { create } from "zustand";
import type { Address } from "@/types/user";

interface CheckoutData {
  restaurantName: string;
  items: any[];
  address: Address | null;

  noContact: boolean;
  suggestions: string;

  itemTotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  total: number;
}

interface CheckoutStore {
  checkoutData: CheckoutData | null;

  setCheckoutData: (
    data: CheckoutData
  ) => void;

  clearCheckoutData: () => void;
}

export const useCheckoutStore =
  create<CheckoutStore>((set) => ({
    checkoutData: null,

    setCheckoutData: (data) =>
      set({
        checkoutData: data,
      }),

    clearCheckoutData: () =>
      set({
        checkoutData: null,
      }),
  }));