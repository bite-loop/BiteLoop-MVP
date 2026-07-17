"use client";

import { CheckCircle2, Loader2 } from "lucide-react";

type OrderStage =
  | "payment"
  | "creating"
  | "saving"
  | "redirecting";

interface OrderSuccessOverlayProps {
  open: boolean;
  stage: OrderStage;
}

export default function OrderSuccessOverlay({
  open,
  stage,
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

<div className="mt-10 space-y-4">
  <StatusRow
    title="Payment received"
    completed={true}
    loading={false}
  />

  <StatusRow
    title="Creating your order"
    completed={stage !== "payment"}
    loading={stage === "creating"}
  />

  <StatusRow
    title="Saving order"
    completed={
      stage === "redirecting"
    }
    loading={stage === "saving"}
  />

  <StatusRow
    title="Redirecting"
    completed={false}
    loading={stage === "redirecting"}
  />
</div>
      </div>
    </div>
  );
}
function StatusRow({
  title,
  completed,
  loading,
}: {
  title: string;
  completed: boolean;
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {completed ? (
        <CheckCircle2 className="h-5 w-5 text-primary" />
      ) : loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <div className="h-5 w-5 rounded-full border-2 border-muted" />
      )}

      <span
        className={
          completed
            ? "font-medium"
            : "text-muted-foreground"
        }
      >
        {title}
      </span>
    </div>
  );
}