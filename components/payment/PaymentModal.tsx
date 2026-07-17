"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import StripeProvider from "@/components/providers/stripe-provider";
import CheckoutForm from "./CheckoutForm";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientSecret: string;
}

export default function PaymentModal({
  open,
  onOpenChange,
  clientSecret,
}: PaymentModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
        p-0
        border-0
        overflow-hidden
        bg-transparent
        shadow-none

        max-w-[1100px]
        w-[95vw]
        h-[90vh]
        "
      >
        <div
          className="
          grid
          h-full
          overflow-hidden
          rounded-[32px]
          border
          bg-background
          shadow-2xl

          lg:grid-cols-[1.4fr_0.9fr]
          "
        >
          {/* LEFT */}

          <div
            className="
            flex
            flex-col
            overflow-hidden
            "
          >
            {/* Header */}

            <div
              className="
              border-b
              px-10
              py-8
              "
            >
              <div
                className="
                inline-flex
                rounded-full
                bg-primary/10
                px-4
                py-2
                text-sm
                font-semibold
                text-primary
                "
              >
                🔒 Secure Checkout
              </div>

              <h1
                className="
                mt-5
                text-4xl
                font-black
                tracking-tight
                "
              >
                Complete Payment
              </h1>

              <p
                className="
                mt-3
                text-muted-foreground
                text-base
                leading-relaxed
                max-w-lg
                "
              >
                Your payment is securely processed through Stripe with
                end-to-end encryption.
              </p>
            </div>

            {/* Form */}

            <div
              className="
              flex-1
              overflow-y-auto
              px-10
              py-8
              "
            >
              <StripeProvider clientSecret={clientSecret}>
                <CheckoutForm
                  onSuccess={() => {
                    onOpenChange(false);
                  }}
                />
              </StripeProvider>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
            hidden
            lg:flex
            flex-col
            justify-between
            border-l
            bg-muted/30
            "
          >
            {/* Top */}

            <div className="p-8">

              <p
                className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-muted-foreground
                "
              >
                SECURITY
              </p>

              <div className="mt-8 space-y-6">

                <div>

                  <h3 className="font-bold text-lg">
                    PCI DSS Level 1
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Highest level of payment security.
                  </p>

                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    End-to-End Encryption
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Your card information never reaches our servers.
                  </p>

                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Powered by Stripe
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Trusted by millions of businesses worldwide.
                  </p>

                </div>

              </div>

            </div>

            {/* Bottom */}

            <div
              className="
              border-t
              p-8
              "
            >
              <div
                className="
                rounded-3xl
                bg-background
                p-6
                shadow-lg
                "
              >
                <p
                  className="
                  text-sm
                  text-muted-foreground
                  "
                >
                  Accepted Cards
                </p>

                <div
                  className="
                  mt-5
                  flex
                  flex-wrap
                  gap-3
                  "
                >
                  {[
                    "Visa",
                    "Mastercard",
                    "AmEx",
                    "Interac",
                  ].map((card) => (
                    <div
                      key={card}
                      className="
                      rounded-xl
                      border
                      bg-muted
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      "
                    >
                      {card}
                    </div>
                  ))}
                </div>

                <div
                  className="
                  mt-8
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-green-500/10
                  p-4
                  "
                >
                  <p className="font-semibold text-green-600">
                    ✓ Secure Payment
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your payment details are protected using industry-leading encryption.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}