import { create } from "zustand";
import type { MenuItem } from "@/types/restaurant";

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartStore {
  restaurantId: string | null;
  restaurantName: string | null;

  cart: Map<string, CartItem>;

  addToCart: (
    item: MenuItem,
    restaurantId: string,
    restaurantName: string
  ) => void;

  removeFromCart: (itemId: string) => void;

  clearCart: () => void;

  getItemCount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  restaurantId: null,
  restaurantName: null,

  cart: new Map(),

  addToCart: (item, restaurantId, restaurantName) => {
    const newCart = new Map(get().cart);

    const existing = newCart.get(item.id);

    if (existing) {
      newCart.set(item.id, {
        ...existing,
        quantity: existing.quantity + 1,
      });
    } else {
      newCart.set(item.id, {
        item,
        quantity: 1,
      });
    }

    set({
      cart: newCart,
      restaurantId,
      restaurantName,
    });
  },

  removeFromCart: (itemId) => {
    const newCart = new Map(get().cart);

    const existing = newCart.get(itemId);

    if (!existing) return;

    if (existing.quantity > 1) {
      newCart.set(itemId, {
        ...existing,
        quantity: existing.quantity - 1,
      });
    } else {
      newCart.delete(itemId);
    }

    set({ cart: newCart });
  },

  clearCart: () =>
    set({
      cart: new Map(),
      restaurantId: null,
      restaurantName: null,
    }),

  getItemCount: () =>
    Array.from(get().cart.values()).reduce(
      (sum, item) => sum + item.quantity,
      0
    ),

  getTotal: () =>
    Array.from(get().cart.values()).reduce(
      (sum, item) => sum + item.item.price * item.quantity,
      0
    ),
}));