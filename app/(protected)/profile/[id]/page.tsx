"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserProfile, Address, UserPreferences } from "@/types/user";
import Navbar from "@/components/navbar/navbar";
import { useAuthStore } from "@/lib/stores/authStore";
import ProtectedRoute from "@/components/protected-route/protected-route";

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

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user, fetchProfile, isLoading: authLoading } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tab, setTab] = useState<Tab>("Profile");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get ID from params
  useEffect(() => {
    const getParams = async () => {
      const { id } = await params;
      setUserId(id);
    };
    getParams();
  }, [params]);

  // Load profile once
  useEffect(() => {
    if (!user && !authLoading) {
      fetchProfile();
    }
  }, []);

  // Set profile when user loads
  useEffect(() => {
    if (user && !profile) {
      setProfile(user as unknown as UserProfile);
    }
  }, [user, profile]);

  const setProfileField = (key: keyof UserProfile, value: unknown) => {
    setProfile(prev => prev ? { ...prev, [key]: value } : null);
  };

  const setPreference = (key: keyof UserPreferences, value: unknown) => {
    setProfile(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    } : null);
  };

  const toggleDietary = (value: UserPreferences["dietaryRestrictions"][number]) => {
    if (!profile) return;
    const current = profile.preferences.dietaryRestrictions;
    setPreference("dietaryRestrictions",
      current.includes(value) ? current.filter(x => x !== value) : [...current, value]);
  };

  const toggleCuisine = (value: string) => {
    if (!profile) return;
    const current = profile.preferences.favoriteCuisines;
    setPreference("favoriteCuisines",
      current.includes(value) ? current.filter(x => x !== value) : [...current, value]);
  };

  const addAddress = () => {
    if (!profile) return;
    setProfileField("savedAddresses", [...profile.savedAddresses, blankAddr()]);
  };

  const updateAddress = (index: number, address: Address) => {
    if (!profile) return;
    const newAddresses = [...profile.savedAddresses];
    newAddresses[index] = address;
    setProfileField("savedAddresses", newAddresses);
  };

  const deleteAddress = (index: number) => {
    if (!profile) return;
    setProfileField("savedAddresses", profile.savedAddresses.filter((_, i) => i !== index));
  };

  const setDefaultAddress = (index: number) => {
    if (!profile) return;
    const newAddresses = profile.savedAddresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index
    }));
    setProfileField("savedAddresses", newAddresses);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Create preview only, don't upload yet
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setPendingImageFile(file);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!pendingImageFile || !profile) return null;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', pendingImageFile);
      formData.append('userId', profile.id);

      const response = await fetch("/api/upload/cloudinary/image", { method: "POST", body: formData });
      const data = await response.json();

      if (response.ok) {
        return data.imageUrl;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      alert("Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    
    try {
      let updatedProfile = { ...profile };
      
      // Upload image if there's a pending one
      if (pendingImageFile) {
        const imageUrl = await uploadImage();
        if (imageUrl) {
          updatedProfile.photoURL = imageUrl;
        }
      }
      
      // Save all changes including image
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        await fetchProfile();
        
        // Clear preview and pending image after successful save
        setImagePreview(null);
        setPendingImageFile(null);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !profile) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
        </div>
      </ProtectedRoute>
    );
  }

  const initials = profile.displayName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "U";
  const displayPhoto = imagePreview || profile.photoURL;

  return (
    <>
      <style>{`
        @keyframes pf-toast {
          0%   { opacity:0; transform:translateY(6px); }
          15%  { opacity:1; transform:translateY(0); }
          80%  { opacity:1; }
          100% { opacity:0; }
        }
        .pf-toast {
          position: fixed; bottom: 24px; right: 24px; z-index: 200;
          background: #ef4444; color: white;
          padding: 10px 20px; border-radius: 12px; font-size: 0.8rem;
          font-weight: 700; display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.2);
          animation: pf-toast 2s ease forwards;
        }
      `}</style>

      <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-44">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <label className="relative cursor-pointer group">
              <Avatar className="w-14 h-14 border border-border/40">
                {displayPhoto ? (
                  <AvatarImage src={displayPhoto} alt={profile.displayName} />
                ) : (
                  <AvatarFallback className="text-base font-black bg-red-500/10 text-red-500">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <span className="text-white text-xs">📷</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>
            <div className="flex-1">
              <p className="font-black text-lg">{profile.displayName || "Your name"}</p>
              <p className="text-xs opacity-40">{profile.email}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-base">{profile.loyaltyPoints?.toLocaleString() || 0}</p>
              <p className="text-xs opacity-35">loyalty pts</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-border/30 mb-8">
            {TABS.map(t => (
              <button
                key={t}
                className={`pb-2 text-sm font-semibold transition-all ${
                  tab === t ? "border-b-2 border-red-500 text-red-500" : "opacity-40 hover:opacity-70"
                }`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {tab === "Profile" && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-2">Display name</p>
                <input
                  className="w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2"
                  value={profile.displayName || ""}
                  onChange={e => setProfileField("displayName", e.target.value)}
                />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-2">Email</p>
                <input
                  className="w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2"
                  type="email"
                  value={profile.email}
                  onChange={e => setProfileField("email", e.target.value)}
                />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-2">Phone</p>
                <input
                  className="w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2"
                  type="tel"
                  value={profile.phone || ""}
                  onChange={e => setProfileField("phone", e.target.value)}
                />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-2">Language</p>
                <select
                  className="w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2"
                  value={profile.preferences?.language || "en"}
                  onChange={e => setPreference("language", e.target.value)}
                >
                  {LANGUAGES.map(l => <option key={l.v} value={l.v}>{l.l}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Push notifications</p>
                  <p className="text-xs opacity-40">Order updates, deals & offers</p>
                </div>
                <button
                  className={`w-10 h-5 rounded-full transition-colors ${
                    profile.preferences?.notificationEnabled ? "bg-red-500" : "bg-gray-300"
                  }`}
                  onClick={() => setPreference("notificationEnabled", !profile.preferences?.notificationEnabled)}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-0.5 ${
                    profile.preferences?.notificationEnabled ? "translate-x-5" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {tab === "Addresses" && (
            <div className="space-y-3">
              {profile.savedAddresses?.length === 0 && (
                <div className="text-center py-14 opacity-35">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-sm font-semibold">No addresses saved</p>
                  <p className="text-xs mt-1 opacity-60">Add one for faster checkout</p>
                </div>
              )}
              {profile.savedAddresses?.map((addr, i) => (
                <AddressBlock
                  key={addr.id}
                  addr={addr}
                  defaultOpen={i === 0}
                  onChange={a => updateAddress(i, a)}
                  onDelete={() => deleteAddress(i)}
                  onSetDefault={() => setDefaultAddress(i)}
                />
              ))}
              <button
                onClick={addAddress}
                className="w-full py-3 rounded-xl border border-dashed border-border/50 text-xs font-semibold opacity-50 hover:opacity-80 hover:border-red-500 transition-all"
              >
                + Add address
              </button>
            </div>
          )}

          {/* Preferences Tab */}
          {tab === "Preferences" && (
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-3">Dietary restrictions</p>
                <p className="text-xs opacity-40 mb-3">Filters incompatible dishes automatically</p>
                <div className="flex flex-wrap gap-2">
                  {DIET_OPTIONS.map(d => (
                    <button
                      key={d}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        profile.preferences?.dietaryRestrictions?.includes(d)
                          ? "bg-red-500 text-white"
                          : "border border-border/40 opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => toggleDietary(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-3">Spice level</p>
                <p className="text-xs opacity-40 mb-3">Personalises dish recommendations</p>
                <div className="flex gap-3">
                  {SPICE_OPTIONS.map(s => (
                    <button
                      key={s}
                      className={`flex-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        profile.preferences?.spiceLevel === s
                          ? "bg-red-500 text-white"
                          : "border border-border/40 opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => setPreference("spiceLevel", s)}
                    >
                      {s === "mild" && "🧊 Mild"}
                      {s === "medium" && "🔥 Medium"}
                      {s === "hot" && "💥 Hot"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-3">Favourite cuisines</p>
                <p className="text-xs opacity-40 mb-3">Shapes your discovery feed</p>
                <div className="flex flex-wrap gap-2">
                  {CUISINE_OPTIONS.map(c => (
                    <button
                      key={c}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        profile.preferences?.favoriteCuisines?.includes(c)
                          ? "bg-red-500 text-white"
                          : "border border-border/40 opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => toggleCuisine(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {tab === "Security" && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-2">Current password</p>
                <input className="w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2" type="password" placeholder="••••••••" />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-2">New password</p>
                <input className="w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2" type="password" placeholder="••••••••" />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-2">Confirm new password</p>
                <input className="w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2" type="password" placeholder="••••••••" />
              </div>
              <Button size="sm" className="rounded-lg text-xs bg-red-500 hover:bg-red-600">Update password</Button>

              <div className="pt-6 border-t border-border/30 space-y-3">
                <p className="text-xs font-semibold opacity-50 uppercase tracking-wider">Danger zone</p>
                <p className="text-xs opacity-40">These actions are permanent. Deleted accounts cannot be recovered.</p>
                <div className="flex gap-3">
                  <button className="text-xs font-semibold text-red-500 opacity-60 hover:opacity-100">Deactivate</button>
                  <button className="text-xs font-semibold text-red-500 opacity-60 hover:opacity-100">Delete account</button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-10 pt-6 border-t border-border/20">
            <Button onClick={handleSave} disabled={isSaving || isUploading} className="rounded-lg px-8 font-bold bg-red-500 hover:bg-red-600">
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>

        {saved && (
          <div className="pf-toast">✓ Saved</div>
        )}
    </>
  );
}

// Address Block Component
function AddressBlock({
  addr, defaultOpen, onChange, onDelete, onSetDefault,
}: {
  addr: Address; defaultOpen?: boolean;
  onChange: (a: Address) => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const update = (k: keyof Address, v: string) => onChange({ ...addr, [k]: v });
  const inp = "w-full bg-transparent border-b border-border/40 focus:border-red-500 focus:outline-none text-sm py-2";

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${addr.isDefault ? "border-red-500/30" : "border-border/40"}`}>
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/20"
        onClick={() => setOpen(o => !o)}
      >
        <span>{addr.label === "Home" && "🏠"}{addr.label === "Work" && "💼"}{addr.label === "Parents" && "👨‍👩‍👧"}{!["Home","Work","Parents"].includes(addr.label) && "📍"}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{addr.label}</p>
          <p className="text-xs opacity-35 truncate">{addr.fullAddress || "—"}</p>
        </div>
        {addr.isDefault && (
          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-500/10 text-red-500">Default</span>
        )}
        <span className="text-xs opacity-25">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-border/20 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">Label</p>
              <select className={inp} value={addr.label} onChange={e => update("label", e.target.value)}>
                {ADDR_LABELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">Zip code</p>
              <input className={inp} value={addr.zipCode} maxLength={6} onChange={e => update("zipCode", e.target.value)} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold opacity-50 mb-1">Full address</p>
            <input className={inp} value={addr.fullAddress} onChange={e => update("fullAddress", e.target.value)} />
          </div>
          <div>
            <p className="text-xs font-semibold opacity-50 mb-1">Street</p>
            <input className={inp} value={addr.street} onChange={e => update("street", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">City</p>
              <select className={inp} value={addr.city} onChange={e => update("city", e.target.value)}>
                <option value="">—</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-50 mb-1">State</p>
              <select className={inp} value={addr.state} onChange={e => update("state", e.target.value)}>
                <option value="">—</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold opacity-50 mb-1">Delivery instructions</p>
            <input className={inp} value={addr.deliveryInstructions ?? ""} onChange={e => update("deliveryInstructions", e.target.value)} />
          </div>
          <div className="flex gap-2 pt-1">
            {!addr.isDefault && (
              <button className="text-xs font-semibold opacity-50 hover:opacity-100" onClick={onSetDefault}>Set as default</button>
            )}
            <button className="text-xs font-semibold text-red-500 opacity-60 hover:opacity-100 ml-auto" onClick={onDelete}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}