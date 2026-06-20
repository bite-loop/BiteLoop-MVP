"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Address } from "@/types/user";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/authStore";

const ADDR_LABELS = ["Home","Work","Parents","Other"];

const CITIES  = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","Pune","Ahmedabad","Kochi","Jaipur"];
const STATES  = ["Maharashtra","Delhi","Karnataka","Telangana","Tamil Nadu","West Bengal","Rajasthan","Gujarat","Kerala"];


interface AddressDrawerProps {
  open: boolean;
  onClose: () => void;
  onAddressAdded?: () => void;
}

export default function AddressDrawer({
  open,
  onClose,
  onAddressAdded,
}: AddressDrawerProps) {
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
const {
  user,
  fetchProfile,
} = useAuthStore();



const inp =
  "w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2";

  const update = (
  key: keyof Address,
  value: string
) => {
  setAddress((prev) => ({
    ...prev,
    [key]: value,
  }));
};
const handleSaveAddress = async () => {
  if (!user) return;

  try {
    const updatedProfile = {
      ...user,
      savedAddresses: [
        ...(user.savedAddresses || []),
        address,
      ],
    };

    const response = await fetch(
      "/api/user/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          updatedProfile
        ),
      }
    );

if (response.ok) {
  await fetchProfile();
  onAddressAdded?.();
  onClose();
}
  } catch (error) {
    console.error(
      "Error saving address:",
      error
    );
  }
};
  return (
    <AnimatePresence>
        
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
            fixed
            inset-0
            bg-black/50
            z-50
            "
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 220,
            }}
            className="
            fixed
            top-0
            left-0
            h-screen
            w-full
            max-w-xl
            bg-background
            border-r
            z-[60]
            overflow-y-auto
            "
          >
<div className="p-6 border-b">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold">
        Add New Address
      </h2>

      <p className="text-muted-foreground mt-2">
        Save a new delivery location
      </p>
    </div>

<button
  onClick={onClose}
  className="
  h-10
  w-10
  rounded-full
  border
  flex
  items-center
  justify-center
  hover:bg-muted
  "
>
  ✕
</button>
  </div>
</div>

<div
  className="
  border
  rounded-xl
  overflow-hidden
  border-border/40
  mx-4
  mt-4
  "
>
  <div
    className="
    flex
    items-center
    gap-3
    px-4
    py-3
    "
  >
    <span>
      {address.label === "Home" && "🏠"}
      {address.label === "Work" && "💼"}
      {address.label === "Parents" && "👨‍👩‍👧"}
      {!["Home", "Work", "Parents"].includes(
        address.label
      ) && "📍"}
    </span>

    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold">
        {address.label}
      </p>

      <p className="text-xs opacity-35 truncate">
        {address.fullAddress || "—"}
      </p>
    </div>
  </div>

        <div className="px-4 pb-4 border-t border-border/20 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">Label</p>
              <select className={inp} value={address.label} onChange={e => update("label", e.target.value)}>
                {ADDR_LABELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">Zip code</p>
              <input className={inp} value={address.zipCode} maxLength={6} onChange={e => update("zipCode", e.target.value)} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold opacity-50 mb-1">Full address</p>
            <input className={inp} value={address.fullAddress} onChange={e => update("fullAddress", e.target.value)} />
          </div>
          <div>
            <p className="text-xs font-semibold opacity-50 mb-1">Street</p>
            <input className={inp} value={address.street} onChange={e => update("street", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">City</p>
              <select className={inp} value={address.city} onChange={e => update("city", e.target.value)}>
                <option value="">—</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">State</p>
              <select className={inp} value={address.state} onChange={e => update("state", e.target.value)}>
                <option value="">—</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold opacity-50 mb-1">Delivery instructions</p>
            <input className={inp} value={address.deliveryInstructions ?? ""} onChange={e => update("deliveryInstructions", e.target.value)} />
          </div>

        </div>
        </div>
        <Button
  onClick={handleSaveAddress}
  className="
w-[calc(100%-2rem)]
mx-4
h-12
mb-4
rounded-xl
  "
>
  Save Address
</Button>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

