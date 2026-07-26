// ✅ New
import { Timestamp } from "./common";
// ============ USER RELATED ============
export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  displayName: string;
  photoURL?: string;
  defaultAddress?: Address;
  savedAddresses: Address[];
  preferences: UserPreferences;
  loyaltyPoints: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserPreferences {
  dietaryRestrictions: ('vegetarian' | 'vegan' | 'gluten-free' | 'halal' | 'none')[];
  spiceLevel: 'mild' | 'medium' | 'hot';
  favoriteCuisines: string[];
  notificationEnabled: boolean;
  language: string;
}

export interface Address {
  id: string;
  label: string; // Home, Work, etc.
  fullAddress: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  deliveryInstructions?: string;
}