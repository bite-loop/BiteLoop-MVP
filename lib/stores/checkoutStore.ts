import { create } from "zustand";
import type { CheckoutData } from "@/types/order";

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