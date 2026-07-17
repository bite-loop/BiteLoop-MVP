"use client";

import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface CheckoutFormProps {
  onSuccess: () => void;
}

export default function CheckoutForm({
  onSuccess,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setError(error.message ?? "Payment failed.");
      setLoading(false);
      return;
    }

    setLoading(false);
    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <PaymentElement />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-2xl bg-muted/40 p-5">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-green-600" />

          <div>
            <p className="font-semibold">
              Secure Payment
            </p>

            <p className="text-sm text-muted-foreground">
              Payments are encrypted and securely processed by Stripe.
            </p>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="
          h-16
          w-full
          rounded-2xl
          text-lg
          font-bold
        "
      >
        {loading ? "Processing Payment..." : "Pay Securely"}
      </Button>
    </form>
  );
}