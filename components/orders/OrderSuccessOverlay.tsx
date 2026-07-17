"use client";

import { CheckCircle2, Loader2 } from "lucide-react";

interface OrderSuccessOverlayProps {
  open: boolean;
}

export default function OrderSuccessOverlay({
  open,
}: OrderSuccessOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          bg-card
          p-10
          shadow-2xl
          text-center
        "
      >
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />

        <h2 className="mt-6 text-3xl font-bold">
          Payment Successful
        </h2>

        <p className="mt-3 text-muted-foreground">
          Your payment has been received successfully.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />

          <span>Creating your order...</span>
        </div>
      </div>
    </div>
  );
}