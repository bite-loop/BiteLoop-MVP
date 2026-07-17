"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StripeProvider from "@/components/providers/stripe-provider";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        <StripeProvider clientSecret={clientSecret}>
          <div className="py-4">
            Stripe Checkout Form
          </div>
        </StripeProvider>
      </DialogContent>
    </Dialog>
  );
}