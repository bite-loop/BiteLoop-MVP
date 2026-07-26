import { Timestamp } from "./common";
import { Address } from './user';

// ============ CART RELATED ============
export interface SelectedCustomization {
  groupId: string;
  groupName: string;
  selectedOptions: {
    optionId: string;
    optionName: string;
    additionalPrice: number;
  }[];
}

export interface Cart {
  id?: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CartItem {
  id: string; // unique cart item id
  menuItemId: string;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  customizations: SelectedCustomization[];
  specialInstructions?: string;
  totalPrice: number; // (basePrice + customizations) * quantity
}

// ============ ORDER RELATED ============
export interface Order {
  id: string;
  orderNumber: string; // #ORD-2024001
  userId: string;
  userDetails: {
    name: string;
    phone: string;
    email: string;
  };
  restaurantId: string;
  restaurantName: string;
  items: OrderedItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  uberDeliveryId?: string; // Uber Eats delivery ID
  uberTrackingUrl?: string; // Uber Eats tracking URL
estimatedDeliveryTime: Timestamp;
  actualDeliveryTime?: Timestamp;
  specialInstructions?: string;
  timeline: OrderTimeline[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderedItem {
  menuItemId: string;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  customizations: SelectedCustomization[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: Timestamp;
  description: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export type PaymentMethod = 
  | 'card'
  | 'upi'
  | 'wallet'
  | 'cash'
  | 'netbanking';

  // ============ CHECKOUT DATA ============
export interface CheckoutData {
  restaurantId: string;
  restaurantName: string;

  userId: string;

  userDetails: {
    name: string;
    email: string;
    phone: string;
  };

  items: CartItem[];

  address: Address | null;

  noContact: boolean;
  suggestions: string;

  itemTotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;

  total: number;
}
// ============ COUPONS & DISCOUNTS ============
export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number;
  validFrom: Timestamp;
  validUntil: Timestamp;
  isActive: boolean;
  usageLimit: number;
  usedCount: number;
  applicableRestaurants?: string[]; // empty means all
}

export interface UserCoupon {
  id: string;
  userId: string;
  couponId: string;
  code: string;
  isUsed: boolean;
  usedAt?: Timestamp;
  orderId?: string;
  expiresAt: Timestamp;
}