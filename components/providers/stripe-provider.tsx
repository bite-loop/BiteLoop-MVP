"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";
import type { Appearance } from "@stripe/stripe-js";

interface StripeProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

const appearance: Appearance = {
  theme: "stripe",

  variables: {
    colorPrimary: "#16a34a",
    colorBackground: "#ffffff",
    colorText: "#111827",
    colorDanger: "#dc2626",

    borderRadius: "18px",

    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",

    fontSizeBase: "16px",
    spacingUnit: "6px",
  },

  rules: {
    ".Input": {
      border: "1px solid #e5e7eb",
      boxShadow: "none",
      padding: "16px",
      transition: "all .2s ease",
    },

    ".Input:focus": {
      border: "1px solid #16a34a",
      boxShadow: "0 0 0 4px rgba(22,163,74,.15)",
    },

    ".Tab": {
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      backgroundColor: "#fafafa",
      padding: "14px",
    },

    ".Tab--selected": {
      borderColor: "#16a34a",
      backgroundColor: "#f0fdf4",
      color: "#16a34a",
    },

    ".Label": {
      fontWeight: "600",
      marginBottom: "8px",
      color: "#111827",
    },

    ".Error": {
      color: "#dc2626",
    },
  },
};

export default function StripeProvider({
  clientSecret,
  children,
}: StripeProviderProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
      }}
    >
      {children}
    </Elements>
  );
}