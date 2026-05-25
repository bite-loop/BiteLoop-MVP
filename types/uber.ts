// ============ UBER EATS INTEGRATION ============
export interface UberDeliveryQuote {
  id: string;
  fee: number;
  estimatedPickupTime: string;
  estimatedDropoffTime: string;
  distance: number;
  currency: string;
}

export interface UberDeliveryDetails {
  trackingId: string;
  trackingUrl: string;
  status: string;
  courierName: string;
  courierPhone: string;
  courierPhoto: string;
  vehicleType: string;
  estimatedArrival: string;
}