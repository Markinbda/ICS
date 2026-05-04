export type ServiceType = "InStore" | "Roadside" | "Mobile";
export type VehicleType = "Passenger" | "LightTruck" | "HeavyTruck" | "ConstructionEquipment";
export type ServiceRequestType = "Replace" | "Repair" | "Rotation" | "Balance" | "Other";
export type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface BusinessHours {
  locationId: string;
  dayOfWeek: number; // 0=Sun, 1=Mon ... 6=Sat
  openTime: string;  // "07:00"
  closeTime: string; // "19:00"
}

export interface TechnicianCapacity {
  locationId: string;
  date: string; // ISO date "2026-05-03"
  maxAppointments: number;
  slotDurationMinutes: number;
}

export interface VehicleFitment {
  year: number;
  make: string;
  model: string;
  trim?: string;
  tireSizeFront: string;
  tireSizeRear?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  serviceType: ServiceType;
  locationId?: string;
  scheduledStart: string; // ISO datetime
  scheduledEnd: string;
  status: AppointmentStatus;
  customerName: string;
  email: string;
  phone: string;
  vehicleType: VehicleType;
  year: string;
  make: string;
  model: string;
  tireSize: string;
  serviceRequestType: ServiceRequestType;
  quantity: number;
  notes?: string;
  // Roadside / Mobile address
  serviceAddress?: string;
  serviceCity?: string;
  serviceParish?: string;
  accessInstructions?: string;
  isUrgent?: boolean;
  safeContact?: boolean;
  preferredTimeWindow?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  start: string; // ISO datetime
  end: string;
  available: boolean;
}

export interface CreateAppointmentRequest {
  serviceType: ServiceType;
  locationId?: string;
  scheduledStart: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleType: VehicleType;
  year: string;
  make: string;
  model: string;
  tireSize: string;
  serviceRequestType: ServiceRequestType;
  quantity: number;
  notes?: string;
  serviceAddress?: string;
  serviceParish?: string;
  accessInstructions?: string;
  isUrgent?: boolean;
  safeContact?: boolean;
  preferredTimeWindow?: string;
}
