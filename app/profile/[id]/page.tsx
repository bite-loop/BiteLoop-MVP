"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserProfile, Address, UserPreferences } from "@/types/user";
import Navbar from "@/components/navbar/navbar";
import { useAuthStore } from "@/lib/stores/authStore";
import { toast } from "sonner";

const DIET_OPTIONS: UserPreferences["dietaryRestrictions"] = ["vegetarian","vegan","gluten-free","halal","none"];
const SPICE_OPTIONS: UserPreferences["spiceLevel"][] = ["mild","medium","hot"];
const CUISINE_OPTIONS = ["North Indian","South Indian","Chinese","Italian","Thai","Mughlai","Street Food","Biryani","Coastal","Desserts"];
const LANGUAGES = [{ v:"en",l:"English" },{ v:"hi",l:"Hindi" },{ v:"ta",l:"Tamil" },{ v:"te",l:"Telugu" },{ v:"mr",l:"Marathi" },{ v:"bn",l:"Bengali" }];
const CITIES  = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata","Pune","Ahmedabad","Kochi","Jaipur"];
const STATES  = ["Maharashtra","Delhi","Karnataka","Telangana","Tamil Nadu","West Bengal","Rajasthan","Gujarat","Kerala"];
const ADDR_LABELS = ["Home","Work","Parents","Other"];
const TABS = ["Profile","Addresses","Preferences","Security"] as const;
type Tab = typeof TABS[number];

const blankAddr = (): Address => ({
  id: `addr_${Date.now()}`,
  label: "Home", fullAddress: "", street: "",
  city: "", state: "", zipCode: "",
  latitude: 0, longitude: 0,
  isDefault: false, deliveryInstructions: "",
});

const defaultPreferences: UserPreferences = {
  dietaryRestrictions: [],
  spiceLevel: "medium",
  favoriteCuisines: [],
  notificationEnabled: true,
  language: "en",
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tab, setTab] = useState<Tab>("Profile");
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user: authUser, fetchProfile } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      await fetchProfile();
      setIsMounted(true);
      setIsLoading(false);
    };
    loadUser();
  }, [fetchProfile]);

  // Set profile from auth store
  useEffect(() => {
    if (authUser && isMounted) {
      setProfile(authUser as unknown as UserProfile);
    }
  }, [authUser, isMounted]);

  const setProfileField = useCallback((key: keyof UserProfile, value: unknown) => {
    setProfile(prev => prev ? { ...prev, [key]: value } : null);
  }, []);

  const setPreference = useCallback((key: keyof UserPreferences, value: unknown) => {
    setProfile(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    } : null);
  }, []);

  const toggleDietary = useCallback((value: UserPreferences["dietaryRestrictions"][number]) => {
    if (!profile) return;
    const current = profile.preferences.dietaryRestrictions;
    setPreference("dietaryRestrictions",
      current.includes(value)
        ? current.filter(x => x !== value)
        : [...current, value]);
  }, [profile, setPreference]);

  const toggleCuisine = useCallback((value: string) => {
    if (!profile) return;
    const current = profile.preferences.favoriteCuisines;
    setPreference("favoriteCuisines",
      current.includes(value)
        ? current.filter(x => x !== value)
        : [...current, value]);
  }, [profile, setPreference]);

  const addAddress = useCallback(() => {
    if (!profile) return;
    setProfileField("savedAddresses", [...profile.savedAddresses, blankAddr()]);
  }, [profile, setProfileField]);

  const updateAddress = useCallback((index: number, address: Address) => {
    if (!profile) return;
    const newAddresses = [...profile.savedAddresses];
    newAddresses[index] = address;
    setProfileField("savedAddresses", newAddresses);
  }, [profile, setProfileField]);

  const deleteAddress = useCallback((index: number) => {
    if (!profile) return;
    setProfileField("savedAddresses", profile.savedAddresses.filter((_, i) => i !== index));
  }, [profile, setProfileField]);

  const setDefaultAddress = useCallback((index: number) => {
    if (!profile) return;
    const newAddresses = profile.savedAddresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index
    }));
    setProfileField("savedAddresses", newAddresses);
  }, [profile, setProfileField]);

  // Handle profile image upload
 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || !profile) return 

      if (!file.type.startsWith('image/')) {
        alert("please upload an image file")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('image',file)
      formData.append('userId',profile.id)

      const response = await fetch("/api/upload/cloudinary/image", {
         method: "POST",
         body: formData
      });

      const data = await response.json()

      if(response.ok) {
         setProfileField("photoURL", data.imageUrl)

         const saveResponse = await fetch("/api/user/profile", {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
             ...profile,
             photoURL: data.imageUrl,
           }),
         })


         if (saveResponse.ok) {
           setSaved(true)
           setTimeout(() => {
             setSaved(false)
           }, 2000);
           await fetchProfile()
         }
      } else {
         throw new Error(data.error || "Upload failed")
      }
    } catch (error:any) {
       console.error("Error uploading image:", error);
       toast.error("Failed to upload image, Please try again")
    } finally {
       setIsUploading(false)
    }
 }

 
  const handleSave = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        await fetchProfile(); // Refresh the auth store
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !isMounted || !profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </>
    );
  }

  const initials = profile.displayName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <>
      <style>{`
        @keyframes pf-up {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pf-toast {
          0%   { opacity:0; transform:translateY(6px); }
          15%  { opacity:1; transform:translateY(0); }
          80%  { opacity:1; }
          100% { opacity:0; }
        }
        .pf-up { animation: pf-up 0.4s cubic-bezier(.22,1,.36,1) both; }
        .chip {
          padding: 5px 14px; border-radius: 999px; font-size: 0.72rem;
          font-weight: 600; border: 1px solid hsl(var(--border)/0.5);
          background: transparent; cursor: pointer; color: inherit;
          opacity: 0.5; transition: all 0.15s;
        }
        .chip:hover { opacity: 0.8; border-color: hsl(var(--primary)/0.4); }
        .chip.on {
          background: hsl(var(--primary)); color: hsl(var(--primary-foreground));
          border-color: hsl(var(--primary)); opacity: 1;
        }
        .toggle-track {
          width: 38px; height: 20px; border-radius: 999px;
          border: 1.5px solid hsl(var(--border)/0.5);
          background: transparent; position: relative;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .toggle-track.on { background: hsl(var(--primary)); border-color: hsl(var(--primary)); }
        .toggle-track::after {
          content: ''; position: absolute; top: 2px; left: 2px;
          width: 12px; height: 12px; border-radius: 50%;
          background: hsl(var(--muted-foreground)/0.4); transition: all 0.2s;
        }
        .toggle-track.on::after { left: 20px; background: #fff; }
        .pf-toast {
          position: fixed; bottom: 24px; right: 24px; z-index: 200;
          background: hsl(var(--primary)); color: hsl(var(--primary-foreground));
          padding: 10px 20px; border-radius: 12px; font-size: 0.8rem;
          font-weight: 700; display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 28px hsl(var(--primary)/0.3);
          animation: pf-toast 2s ease forwards;
        }
        .tab-btn {
          font-size: 0.8rem; font-weight: 600; padding: 6px 0;
          background: transparent; border: none; cursor: pointer;
          color: inherit; opacity: 0.4; border-bottom: 2px solid transparent;
          transition: all 0.18s;
        }
        .tab-btn.on { opacity: 1; border-bottom-color: hsl(var(--primary)); color: hsl(var(--primary)); }
        .tab-btn:not(.on):hover { opacity: 0.7; }
        .avatar-upload {
          position: relative;
          cursor: pointer;
        }
        .avatar-upload input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }
        .avatar-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .avatar-upload:hover .avatar-overlay {
          opacity: 1;
        }
      `}</style>

      <main className="">
        <Navbar />
        <section className="py-44 px-6 text-center reveal max-w-2xl mx-auto">
          
          {/* Header with clickable avatar */}
          <div className="flex items-center gap-4 mb-10 pf-up">
            <label className="avatar-upload cursor-pointer">
              <Avatar className="w-14 h-14 border border-border/40">
                {profile.photoURL && <AvatarImage src={profile.photoURL} alt={profile.displayName} />}
                <AvatarFallback className="text-base font-black" style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="avatar-overlay">
                <span className="text-white text-xs font-bold">📷</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
            <div className="flex-1 min-w-0">
              <p className="font-black text-lg leading-none truncate">{profile.displayName || "Your name"}</p>
              <p className="text-xs opacity-40 mt-1">{profile.email}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-black text-base leading-none">{profile.loyaltyPoints?.toLocaleString() || 0}</p>
              <p className="text-xs opacity-35 mt-0.5">loyalty pts</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-border/30 mb-8 pf-up" style={{ animationDelay: "0.05s" }}>
            {TABS.map(t => (
              <button key={t} className={`tab-btn ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {tab === "Profile" && (
            <div className="pf-up space-y-6">
              <Field label="Display name">
                <input className="w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors" 
                  value={profile.displayName || ""} placeholder="Full name"
                  onChange={e => setProfileField("displayName", e.target.value)}/>
              </Field>
              <Field label="Email">
                <input className="w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors" 
                  type="email" value={profile.email} placeholder="you@email.com"
                  onChange={e => setProfileField("email", e.target.value)}/>
              </Field>
              <Field label="Phone">
                <input className="w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors" 
                  type="tel" value={profile.phone || ""} placeholder="+91 98765 43210"
                  onChange={e => setProfileField("phone", e.target.value)}/>
              </Field>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Language">
                  <select className="w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors appearance-none cursor-pointer" 
                    value={profile.preferences?.language || "en"}
                    onChange={e => setPreference("language", e.target.value)}>
                    {LANGUAGES.map(l => <option key={l.v} value={l.v}>{l.l}</option>)}
                  </select>
                </Field>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Push notifications</p>
                  <p className="text-xs opacity-40 mt-0.5">Order updates, deals & offers</p>
                </div>
                <button
                  className={`toggle-track ${profile.preferences?.notificationEnabled ? "on" : ""}`}
                  onClick={() => setPreference("notificationEnabled", !profile.preferences?.notificationEnabled)}
                />
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {tab === "Addresses" && (
            <div className="pf-up space-y-3">
              {profile.savedAddresses?.length === 0 && (
                <div className="text-center py-14 opacity-35">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-sm font-semibold">No addresses saved</p>
                  <p className="text-xs mt-1 opacity-60">Add one for faster checkout</p>
                </div>
              )}
              {profile.savedAddresses?.map((addr, i) => (
                <AddressBlock key={addr.id} addr={addr} defaultOpen={i === 0}
                  onChange={a => updateAddress(i, a)}
                  onDelete={() => deleteAddress(i)}
                  onSetDefault={() => setDefaultAddress(i)}/>
              ))}
              <button
                onClick={addAddress}
                className="w-full py-3 rounded-xl border border-dashed border-border/50 text-xs font-semibold opacity-50 hover:opacity-80 hover:border-primary/40 transition-all"
              >
                + Add address
              </button>
            </div>
          )}

          {/* Preferences Tab */}
          {tab === "Preferences" && (
            <div className="pf-up space-y-8">
              <section>
                <Label>Dietary restrictions</Label>
                <p className="text-xs opacity-40 mb-3">Filters incompatible dishes automatically</p>
                <div className="flex flex-wrap gap-2">
                  {DIET_OPTIONS.map(d => (
                    <button key={d} className={`chip ${profile.preferences?.dietaryRestrictions?.includes(d) ? "on" : ""}`}
                      onClick={() => toggleDietary(d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <Label>Spice level</Label>
                <p className="text-xs opacity-40 mb-3">Personalises dish recommendations</p>
                <div className="flex gap-3">
                  {SPICE_OPTIONS.map(s => (
                    <button key={s}
                      className={`chip flex-1 text-center ${profile.preferences?.spiceLevel === s ? "on" : ""}`}
                      onClick={() => setPreference("spiceLevel", s)}>
                      {{ mild:"🧊 Mild", medium:"🔥 Medium", hot:"💥 Hot" }[s]}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <Label>Favourite cuisines</Label>
                <p className="text-xs opacity-40 mb-3">Shapes your discovery feed</p>
                <div className="flex flex-wrap gap-2">
                  {CUISINE_OPTIONS.map(c => (
                    <button key={c} className={`chip ${profile.preferences?.favoriteCuisines?.includes(c) ? "on" : ""}`}
                      onClick={() => toggleCuisine(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Security Tab */}
          {tab === "Security" && (
            <div className="pf-up space-y-6">
              <Field label="Current password">
                <input className="w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors" type="password" placeholder="••••••••"/>
              </Field>
              <Field label="New password">
                <input className="w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors" type="password" placeholder="••••••••"/>
              </Field>
              <Field label="Confirm new password">
                <input className="w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors" type="password" placeholder="••••••••"/>
              </Field>
              <Button size="sm" className="rounded-xl px-6 text-xs">Update password</Button>

              <div className="pt-6 border-t border-border/30 space-y-3">
                <p className="text-xs font-semibold opacity-50 uppercase tracking-widest">Danger zone</p>
                <p className="text-xs opacity-40 leading-relaxed">
                  These actions are permanent. Deleted accounts and loyalty points cannot be recovered.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button className="chip" style={{ color:"hsl(var(--destructive))", borderColor:"hsl(var(--destructive)/0.3)", opacity:0.7 }}>
                    Deactivate
                  </button>
                  <button className="chip" style={{ color:"hsl(var(--destructive))", borderColor:"hsl(var(--destructive)/0.4)" }}>
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-10 pt-6 border-t border-border/20">
            <Button onClick={handleSave} disabled={isSaving} className="rounded-xl px-8 font-bold">
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </section>
      </main>

      {saved && (
        <div className="pf-toast">✓ Saved</div>
      )}
    </>
  );
}

// Helper Components
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold opacity-50 uppercase tracking-widest mb-2">{children}</p>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function AddressBlock({
  addr, defaultOpen, onChange, onDelete, onSetDefault,
}: {
  addr: Address; defaultOpen?: boolean;
  onChange: (a: Address) => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const u = (k: keyof Address, v: string) => onChange({ ...addr, [k]: v });
  const inp = "w-full bg-transparent border-b border-border/40 focus:border-primary/60 focus:outline-none text-sm py-2 transition-colors placeholder:opacity-30";
  const sel = `${inp} appearance-none cursor-pointer`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${addr.isDefault ? "border-primary/30" : "border-border/40"}`}>
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/20 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span>{{ Home:"🏠", Work:"💼", Parents:"👨‍👩‍👧", Other:"📦" }[addr.label] ?? "📍"}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-none">{addr.label}</p>
          <p className="text-xs opacity-35 mt-0.5 truncate">{addr.fullAddress || "—"}</p>
        </div>
        {addr.isDefault && (
          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background:"hsl(var(--primary)/0.12)", color:"hsl(var(--primary))" }}>
            Default
          </span>
        )}
        <span className="text-xs opacity-25">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-border/20 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Label">
              <select className={sel} value={addr.label} onChange={e => u("label", e.target.value)}>
                {ADDR_LABELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Zip code">
              <input className={inp} value={addr.zipCode} placeholder="400001" maxLength={6}
                onChange={e => u("zipCode", e.target.value)}/>
            </Field>
          </div>
          <Field label="Full address">
            <input className={inp} value={addr.fullAddress} placeholder="Flat / Building / Landmark"
              onChange={e => u("fullAddress", e.target.value)}/>
          </Field>
          <Field label="Street">
            <input className={inp} value={addr.street} placeholder="Street name"
              onChange={e => u("street", e.target.value)}/>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City">
              <select className={sel} value={addr.city} onChange={e => u("city", e.target.value)}>
                <option value="">—</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="State">
              <select className={sel} value={addr.state} onChange={e => u("state", e.target.value)}>
                <option value="">—</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Delivery instructions">
            <input className={inp} value={addr.deliveryInstructions ?? ""} placeholder="Gate code, floor, ring bell…"
              onChange={e => u("deliveryInstructions", e.target.value)}/>
          </Field>
          <div className="flex gap-2 pt-1 flex-wrap">
            {!addr.isDefault && (
              <button className="text-xs font-semibold opacity-50 hover:opacity-90 transition-opacity"
                onClick={onSetDefault}>Set as default</button>
            )}
            <button className="text-xs font-semibold hover:opacity-90 transition-opacity ml-auto"
              style={{ color:"hsl(var(--destructive))", opacity:0.6 }}
              onClick={onDelete}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}