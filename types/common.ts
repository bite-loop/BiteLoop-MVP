// ============ TIMESTAMP TYPE ============
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

// ============ API RESPONSE TYPES ============
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============ UI STATE TYPES ============
export interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isFilterOpen: boolean;
  isLoading: boolean;
  error: string | null;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
}

// ============ SEARCH & FILTERS ============
export interface SearchFilters {
  query: string;
  cuisine: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number; // minimum rating
  dietaryRestrictions: string[];
  sortBy: 'rating' | 'deliveryTime' | 'priceLowToHigh' | 'priceHighToLow' | 'popularity';
  deliveryFee: 'free' | 'any';
  isOpen: boolean;
}