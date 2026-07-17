"use client";

import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";

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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setError(error.message ?? "Payment failed");
      setLoading(false);
      return;
    }

    setLoading(false);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <PaymentElement />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full h-12 rounded-xl"
      >
        {loading
          ? "Processing..."
          : "Pay Securely"}
      </Button>
    </form>
  );
}