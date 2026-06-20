"use client";

import { useState } from "react";
import type { Address } from "@/types/user";

const [address, setAddress] = useState<Address>({
  id: `addr_${Date.now()}`,
  label: "Home",
  fullAddress: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  latitude: 0,
  longitude: 0,
  isDefault: false,
  deliveryInstructions: "",
});

interface AddressBlockProps {
  addr: Address;
  defaultOpen?: boolean;
  onChange: (a: Address) => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export default function AddressBlock({
  addr,
  defaultOpen,
  onChange,
  onDelete,
  onSetDefault,
}: AddressBlockProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div>
      Address Block
    </div>
  );
}