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
    !max-w-6xl
    w-[96vw]

    max-h-[90vh]
    h-auto

    p-0

    border-0
    bg-transparent
    shadow-none

    overflow-hidden
  "
>
        <div
className="
grid

h-[90vh]

rounded-[32px]

border
border-border/60

bg-gradient-to-br
from-background
via-background
to-primary/5

shadow-[0_30px_80px_rgba(0,0,0,.18)]

grid-cols-1
lg:grid-cols-[1.7fr_0.8fr]

overflow-y-auto
"
        >
          {/* LEFT */}

<div
className="
flex
flex-col

min-h-0
min-w-0
"
>
            {/* Header */}

            <div
className="
border-b
border-border/60

px-12
xl:px-14
pt-8
pb-6

bg-background/70
backdrop-blur-xl
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
lg:text-[52px]
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
                max-w-none
                "
              >
Review your payment details below and securely complete your purchase with Stripe.
              </p>
            </div>
{/* Form */}

<div className="flex-1 overflow-hidden">

<div
className="
h-full
overflow-y-auto

px-12
xl:px-14

pt-8
pb-10
"
>
    <div className="mx-auto max-w-2xl">
      <StripeProvider clientSecret={clientSecret}>
        <CheckoutForm
          onSuccess={() => {
            onOpenChange(false);
          }}
        />
      </StripeProvider>
    </div>

  </div>

</div>
          </div>

          {/* RIGHT */}

<div
className="
hidden
xl:flex

flex-col

border-l

bg-gradient-to-b
from-muted/30
to-background
"
>
    <div className="flex h-full flex-col">
            {/* Top */}

            <div className="p-10">

<p
className="
text-sm
font-semibold
tracking-wide
text-primary
uppercase
"
>
Why your payment is safe
</p>

              <div className="mt-8 space-y-6">

                <div>

<div
className="
rounded-2xl
border
border-border/50

bg-background/70

p-5

transition-all

duration-300

hover:border-primary/30

hover:shadow-lg
"
>
                    PCI DSS Level 1
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Highest level of payment security.
                  </p>

                </div>

                <div>

                  <div
className="
rounded-2xl
border
border-border/50

bg-background/70

p-5

transition-all

duration-300

hover:border-primary/30

hover:shadow-lg
"
>
                    End-to-End Encryption
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Your card information never reaches our servers.
                  </p>

                </div>

                <div>

                  <div
className="
rounded-2xl
border
border-border/50

bg-background/70

p-5

transition-all

duration-300

hover:border-primary/30

hover:shadow-lg
"
>
                    Powered by Stripe
                  </div>

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
              p-10
              "
            >
              <div
className="
rounded-3xl

border
border-border/60

bg-background

p-6

shadow-lg

transition-all

duration-300

hover:-translate-y-1

hover:border-primary

hover:shadow-xl
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
border-border/60
bg-background
px-4
py-3
shadow-sm
transition-all
hover:-translate-y-1
hover:border-primary
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
                  bg-gradient-to-r
from-green-500/10
to-emerald-500/10
                  p-4
                  "
                >
                  <p className="font-semibold text-green-600">
                    🔒 Secure Payment
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your payment details are protected using industry-leading encryption.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}