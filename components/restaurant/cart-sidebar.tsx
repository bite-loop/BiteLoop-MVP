// components/restaurant/cart-sidebar.tsx
import type { MenuItem } from "@/types/restaurant";
import { Button } from "@/components/ui/button";

interface CartSidebarProps {
  cart: Map<string, { item: MenuItem; quantity: number }>;
  cartTotal: number;
  cartItemCount: number;
}

export default function CartSidebar({ cart, cartTotal, cartItemCount }: CartSidebarProps) {
  return (
    <div className="w-80 bg-card border rounded-xl p-4 h-fit sticky top-24">
      <h3 className="font-bold text-lg mb-4">Your Cart ({cartItemCount})</h3>
      <div className="space-y-3 max-h-96 overflow-auto">
        {Array.from(cart.values()).map(({ item, quantity }) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-muted-foreground">${item.price} x {quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-3 mt-3">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}