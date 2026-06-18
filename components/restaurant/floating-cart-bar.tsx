"use client";

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/stores/cartStore";

interface FloatingCartBarProps {
  itemCount: number;
  total: number;
}


export default function FloatingCartBar({
  itemCount,
  total,
}: FloatingCartBarProps) {

  const { clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <Link href="/checkout">
            <div className="flex items-center justify-between gap-8 rounded-2xl bg-primary/95 backdrop-blur-xl px-6 py-4 text-white shadow-2xl cursor-pointer min-w-[420px] hover:scale-[1.02] transition-transform">
              
              <div className="flex items-center gap-3">
                <ShoppingCart size={22} />
                <div>
                  <p className="text-sm font-medium">
                    {itemCount} {itemCount === 1 ? "Item" : "Items"}
                  </p>

                  <p className="text-lg font-bold">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>

<div className="flex items-center gap-4">
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      clearCart();
    }}
    className="
rounded-xl
p-2.5
bg-white/10
hover:bg-red-500/20
hover:text-red-200
transition-all
"

  >
    <Trash2 size={18} />
  </button>

  <div className="text-right">
    <p className="font-semibold">
      View Cart →
    </p>
  </div>
</div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}