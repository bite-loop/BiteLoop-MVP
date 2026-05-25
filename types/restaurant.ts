import { Timestamp } from './common';

// ============ RESTAURANT RELATED ============
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string[];
  rating: number;
  totalRatings: number;
  reviewCount: number;
  deliveryTime: string; // "25-35 min"
  minOrder: number;
  deliveryFee: number;
  serviceFee: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  images: {
    cover: string;
    logo: string;
    gallery: string[];
  };
  operatingHours: OperatingHours;
  isOpen: boolean;
  isActive: boolean;
  popularItems: string[]; // menu item IDs
  tags: string[]; // "trending", "new", "free delivery"
  averageOrderValue: number;
}

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime: string; // "09:00"
  closeTime: string; // "22:00"
}

// ============ MENU RELATED ============
export interface Menu {
  restaurantId: string;
  categories: MenuCategory[];
  lastUpdated: Timestamp;
}

export interface MenuCategory {
  id: string;
  name: string; // "Appetizers", "Main Course", etc.
  description?: string;
  displayOrder: number;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // for showing discounts
  discountPercentage?: number;
  images: string[];
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  containsAllergens: string[];
  isAvailable: boolean;
  isPopular: boolean;
  preparationTime: number; // minutes
  customizationOptions: CustomizationGroup[];
  nutritionalInfo?: NutritionalInfo;
  rating: number;
  numberOfRatings: number;
}

export interface CustomizationGroup {
  id: string;
  name: string; // "Choose Size", "Add Extras"
  type: 'single' | 'multiple'; // single choice or multiple
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  additionalPrice: number;
  isDefault?: boolean;
}

export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

// ============ REVIEWS & RATINGS ============
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  restaurantId: string;
  orderId: string;
  rating: number; // 1-5
  foodRating: number; // 1-5
  deliveryRating: number; // 1-5
  comment: string;
  images: string[];
  likes: number;
  restaurantReply?: {
    comment: string;
    repliedAt: Timestamp;
  };
  createdAt: Timestamp;
}