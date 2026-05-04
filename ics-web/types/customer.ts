export type LoyaltyTier = "Bronze" | "Silver" | "Gold";

export type RewardRedemptionType =
  | "TireDiscount"
  | "FreeRotation"
  | "FreeBalance"
  | "DeliveryDiscount"
  | "GeneralCredit";

export interface CustomerVehicle {
  id: string;
  customerId: string;
  nickname?: string;
  year: string;
  make: string;
  model: string;
  tireSize?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  loyaltyTier: LoyaltyTier;
  createdAt: string;
  notes?: string;
}

export interface CustomerSession {
  token: string;
  customerId: string;
  createdAt: string;
}

export interface QuarryOrderItem {
  material: string;
  tons: number;
  truck: string;
  notes?: string;
  unitPrice: number;
  lineTotal: number;
}

export interface QuarryOrder {
  id: string;
  customerId?: string;
  customerName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  items: QuarryOrderItem[];
  subtotal: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface LoyaltyEntry {
  id: string;
  customerId: string;
  sourceType: "Appointment" | "QuarryOrder" | "AdminAdjustment" | "RewardRedemption";
  sourceId: string;
  points: number;
  description: string;
  createdAt: string;
}

export interface ServiceReminder {
  id: string;
  customerId: string;
  vehicleId?: string;
  title: string;
  message: string;
  nextReminderAt: string;
  intervalMonths: number;
  active: boolean;
  createdAt: string;
}

export interface RewardOption {
  id: string;
  title: string;
  pointsCost: number;
  type: RewardRedemptionType;
  description: string;
}