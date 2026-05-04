/**
 * In-memory data store (development / prototype).
 * Replace with a real database (Postgres, SQLite, etc.) for production.
 */

import type {
  Appointment,
  Location,
  BusinessHours,
  TechnicianCapacity,
  VehicleFitment,
} from "@/types/appointments";
import type {
  Customer,
  CustomerSession,
  CustomerVehicle,
  LoyaltyEntry,
  QuarryOrder,
  RewardOption,
  ServiceReminder,
} from "@/types/customer";

// ── Locations ───────────────────────────────────────────────────────────────

export const LOCATIONS: Location[] = [
  {
    id: "loc-devonshire",
    name: "ICS Tires – Devonshire",
    address: "79 Middle Rd, Devonshire, DV 06, Bermuda",
    phone: "441-236-3011",
    email: "info@ics.bm",
  },
];

// ── Business hours (Mon–Sat, 7am–7pm for InStore location) ─────────────────

export const BUSINESS_HOURS: BusinessHours[] = [1, 2, 3, 4, 5, 6].map((day) => ({
  locationId: "loc-devonshire",
  dayOfWeek: day,
  openTime: "07:00",
  closeTime: "19:00",
}));

// ── Technician capacity defaults ────────────────────────────────────────────

export const DEFAULT_CAPACITY: Omit<TechnicianCapacity, "date"> = {
  locationId: "loc-devonshire",
  maxAppointments: 8,
  slotDurationMinutes: 30,
};

// ── Vehicle fitment seed data ───────────────────────────────────────────────
// year: 0 means the size applies across all years for that make/model.

export const VEHICLE_FITMENT: VehicleFitment[] = [
  // Toyota
  { year: 0, make: "Toyota", model: "Yaris",     tireSizeFront: "175/65R15" },
  { year: 0, make: "Toyota", model: "Vitz",      tireSizeFront: "175/65R15" },
  { year: 0, make: "Toyota", model: "Corolla",   tireSizeFront: "195/65R15", notes: "Older models" },
  { year: 0, make: "Toyota", model: "Corolla",   tireSizeFront: "205/55R16", notes: "Newer models" },
  { year: 0, make: "Toyota", model: "Raize",     tireSizeFront: "205/60R16" },
  { year: 0, make: "Toyota", model: "Rush",      tireSizeFront: "215/60R17" },
  { year: 0, make: "Toyota", model: "RAV4",      tireSizeFront: "225/65R17", notes: "Standard" },
  { year: 0, make: "Toyota", model: "RAV4",      tireSizeFront: "235/55R18", notes: "Sport/Premium" },
  { year: 0, make: "Toyota", model: "Hilux",     tireSizeFront: "265/65R17", notes: "Standard" },
  { year: 0, make: "Toyota", model: "Hilux",     tireSizeFront: "255/70R16", notes: "Worksite" },
  { year: 0, make: "Toyota", model: "TownAce",   tireSizeFront: "165R14C" },
  { year: 0, make: "Toyota", model: "LiteAce",   tireSizeFront: "165R14C" },
  // Honda
  { year: 0, make: "Honda",  model: "Fit",       tireSizeFront: "185/55R16" },
  { year: 0, make: "Honda",  model: "Civic",     tireSizeFront: "205/55R16", notes: "Standard" },
  { year: 0, make: "Honda",  model: "Civic",     tireSizeFront: "215/50R17", notes: "Sport" },
  { year: 0, make: "Honda",  model: "HR-V",      tireSizeFront: "215/55R17" },
  { year: 0, make: "Honda",  model: "CR-V",      tireSizeFront: "225/65R17", notes: "Standard" },
  { year: 0, make: "Honda",  model: "CR-V",      tireSizeFront: "235/60R18", notes: "AWD" },
  { year: 0, make: "Honda",  model: "Freed",     tireSizeFront: "185/65R15" },
  // Nissan
  { year: 0, make: "Nissan", model: "March",     tireSizeFront: "165/70R14" },
  { year: 0, make: "Nissan", model: "Note",      tireSizeFront: "185/65R15" },
  { year: 0, make: "Nissan", model: "NV200",     tireSizeFront: "185/75R14C", notes: "Standard" },
  { year: 0, make: "Nissan", model: "NV200",     tireSizeFront: "195/70R15C", notes: "Long wheelbase" },
  { year: 0, make: "Nissan", model: "Caravan",   tireSizeFront: "195/70R15C" },
  // Mazda
  { year: 0, make: "Mazda",  model: "Demio",     tireSizeFront: "185/65R15" },
  { year: 0, make: "Mazda",  model: "Axela",     tireSizeFront: "205/55R16" },
  { year: 0, make: "Mazda",  model: "Bongo",     tireSizeFront: "185R14C",   notes: "Standard" },
  { year: 0, make: "Mazda",  model: "Bongo",     tireSizeFront: "195/70R15C", notes: "Wide body" },
  // Mitsubishi
  { year: 0, make: "Mitsubishi", model: "Mirage",  tireSizeFront: "165/65R14" },
  { year: 0, make: "Mitsubishi", model: "Delica",  tireSizeFront: "215/60R16" },
  // Suzuki
  { year: 0, make: "Suzuki",     model: "Swift",   tireSizeFront: "185/55R16" },
  { year: 0, make: "Suzuki",     model: "Vitara",  tireSizeFront: "215/60R16" },
  // Hyundai
  { year: 0, make: "Hyundai",    model: "i10",     tireSizeFront: "165/65R14" },
  { year: 0, make: "Hyundai",    model: "i20",     tireSizeFront: "185/65R15" },
  { year: 0, make: "Hyundai",    model: "Creta",   tireSizeFront: "215/60R17" },
  { year: 0, make: "Hyundai",    model: "Kona",    tireSizeFront: "215/60R17" },
  // Kia
  { year: 0, make: "Kia",        model: "Picanto",  tireSizeFront: "175/65R14" },
  { year: 0, make: "Kia",        model: "Sportage", tireSizeFront: "225/65R17" },
  // BMW
  { year: 0, make: "BMW",        model: "Mini Cooper", tireSizeFront: "195/55R16", notes: "Standard" },
  { year: 0, make: "BMW",        model: "Mini Cooper", tireSizeFront: "205/45R17", notes: "Sport" },
  { year: 0, make: "BMW",        model: "1 Series",    tireSizeFront: "205/55R16", notes: "Standard" },
  { year: 0, make: "BMW",        model: "1 Series",    tireSizeFront: "225/45R17", notes: "M Sport" },
  // Mercedes-Benz
  { year: 0, make: "Mercedes-Benz", model: "A-Class", tireSizeFront: "205/55R16" },
  // Volkswagen
  { year: 0, make: "Volkswagen", model: "Polo",    tireSizeFront: "185/65R15" },
  // Renault
  { year: 0, make: "Renault",    model: "Kwid",    tireSizeFront: "165/70R14" },
  { year: 0, make: "Renault",    model: "Captur",  tireSizeFront: "215/60R17" },
  { year: 0, make: "Renault",    model: "Triber",  tireSizeFront: "185/65R15" },
  // Peugeot
  { year: 0, make: "Peugeot",    model: "208",     tireSizeFront: "185/65R15" },
  // MG
  { year: 0, make: "MG",         model: "ZS EV",   tireSizeFront: "215/55R17" },
  // Isuzu
  { year: 0, make: "Isuzu",      model: "D-Max",   tireSizeFront: "255/65R17" },
  // UD Trucks
  { year: 0, make: "UD Trucks",  model: "Atlas",   tireSizeFront: "205/75R16C" },
];

// ── In-memory appointments store ────────────────────────────────────────────

export const appointments: Appointment[] = [];

export const customers: Customer[] = [];

export const customerSessions: CustomerSession[] = [];

export const customerVehicles: CustomerVehicle[] = [];

export const quarryOrders: QuarryOrder[] = [];

export const loyaltyEntries: LoyaltyEntry[] = [];

export const serviceReminders: ServiceReminder[] = [];

export const REWARD_OPTIONS: RewardOption[] = [
  {
    id: "reward-rotation",
    title: "Free Tire Rotation",
    pointsCost: 250,
    type: "FreeRotation",
    description: "Redeem for a complimentary tire rotation at ICS Tires.",
  },
  {
    id: "reward-balance",
    title: "Free Wheel Balance",
    pointsCost: 300,
    type: "FreeBalance",
    description: "Use your points for a balancing service on your next visit.",
  },
  {
    id: "reward-credit",
    title: "$25 Family Credit",
    pointsCost: 500,
    type: "GeneralCredit",
    description: "Apply a $25 credit to tires, service work, or a quarry delivery.",
  },
  {
    id: "reward-delivery",
    title: "Quarry Delivery Discount",
    pointsCost: 450,
    type: "DeliveryDiscount",
    description: "Take money off the next aggregate or material delivery.",
  },
];

export const MATERIAL_PRICING: Record<string, number> = {
  Sand: 38,
  Screenings: 42,
  "5/8 Rock": 55,
  "Gabion Rock": 64,
  Soil: 35,
  Boulders: 70,
  "Mixed Aggregate Load": 48,
};

// ── Helpers ─────────────────────────────────────────────────────────────────

export function generateId(): string {
  return crypto.randomUUID();
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizePhone(value: string): string {
  return value.trim();
}

export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

export function getHoursForDay(locationId: string, dayOfWeek: number): BusinessHours | undefined {
  return BUSINESS_HOURS.find((h) => h.locationId === locationId && h.dayOfWeek === dayOfWeek);
}

export function countAppointmentsOnDay(locationId: string, dateStr: string): number {
  return appointments.filter(
    (a) =>
      a.locationId === locationId &&
      a.scheduledStart.startsWith(dateStr) &&
      a.status !== "Cancelled"
  ).length;
}

export function getFitmentForVehicle(year: number, make: string, model: string): VehicleFitment | undefined {
  const makeLc  = make.toLowerCase();
  const modelLc = model.toLowerCase();
  // Prefer exact year match, fall back to year=0 (model-generic) records
  return (
    VEHICLE_FITMENT.find(
      (f) => f.year === year && f.make.toLowerCase() === makeLc && f.model.toLowerCase() === modelLc
    ) ??
    VEHICLE_FITMENT.find(
      (f) => f.year === 0 && f.make.toLowerCase() === makeLc && f.model.toLowerCase() === modelLc
    )
  );
}

export function getCustomerById(customerId: string): Customer | undefined {
  return customers.find((customer) => customer.id === customerId);
}

export function getCustomerByEmail(email: string): Customer | undefined {
  return customers.find((customer) => customer.email === normalizeEmail(email));
}

export function getCustomerByPhone(phone: string): Customer | undefined {
  return customers.find((customer) => customer.phone === normalizePhone(phone));
}

export function getOrCreateCustomer(input: {
  name: string;
  email: string;
  phone: string;
  passwordHash?: string;
}): Customer {
  const existing = getCustomerByEmail(input.email);
  if (existing) {
    if (input.name && existing.name !== input.name) existing.name = input.name;
    if (input.phone && existing.phone !== normalizePhone(input.phone)) existing.phone = normalizePhone(input.phone);
    return existing;
  }

  const now = new Date().toISOString();
  const customer: Customer = {
    id: generateId(),
    name: input.name.trim(),
    email: normalizeEmail(input.email),
    phone: normalizePhone(input.phone),
    passwordHash: input.passwordHash ?? "",
    loyaltyTier: "Bronze",
    createdAt: now,
  };

  customers.push(customer);
  return customer;
}

export function saveCustomerVehicle(input: {
  customerId: string;
  year: string;
  make: string;
  model: string;
  tireSize?: string;
  nickname?: string;
}): CustomerVehicle {
  const existing = customerVehicles.find(
    (vehicle) =>
      vehicle.customerId === input.customerId &&
      vehicle.year === input.year &&
      vehicle.make.toLowerCase() === input.make.toLowerCase() &&
      vehicle.model.toLowerCase() === input.model.toLowerCase()
  );

  if (existing) {
    existing.tireSize = input.tireSize ?? existing.tireSize;
    existing.nickname = input.nickname ?? existing.nickname;
    return existing;
  }

  const vehicle: CustomerVehicle = {
    id: generateId(),
    customerId: input.customerId,
    year: input.year,
    make: input.make.trim(),
    model: input.model.trim(),
    tireSize: input.tireSize?.trim(),
    nickname: input.nickname?.trim(),
    createdAt: new Date().toISOString(),
  };

  customerVehicles.push(vehicle);
  return vehicle;
}

export function createSession(customerId: string): CustomerSession {
  const session: CustomerSession = {
    token: generateId(),
    customerId,
    createdAt: new Date().toISOString(),
  };
  customerSessions.push(session);
  return session;
}

export function getSession(token: string): CustomerSession | undefined {
  return customerSessions.find((session) => session.token === token);
}

export function deleteSession(token: string): void {
  const index = customerSessions.findIndex((session) => session.token === token);
  if (index >= 0) customerSessions.splice(index, 1);
}

export function getCustomerAppointments(customer: Customer): Appointment[] {
  return appointments.filter((appointment) => appointment.email === customer.email);
}

export function getCustomerQuarryOrders(customer: Customer): QuarryOrder[] {
  return quarryOrders.filter(
    (order) => order.customerId === customer.id || order.email === customer.email
  );
}

export function addLoyaltyEntry(input: Omit<LoyaltyEntry, "id" | "createdAt">): LoyaltyEntry {
  const existing = loyaltyEntries.find(
    (entry) =>
      entry.customerId === input.customerId &&
      entry.sourceType === input.sourceType &&
      entry.sourceId === input.sourceId &&
      entry.description === input.description
  );

  if (existing) return existing;

  const entry: LoyaltyEntry = {
    id: generateId(),
    customerId: input.customerId,
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    points: input.points,
    description: input.description,
    createdAt: new Date().toISOString(),
  };

  loyaltyEntries.push(entry);
  const customer = getCustomerById(input.customerId);
  if (customer) customer.loyaltyTier = getCustomerTier(input.customerId);
  return entry;
}

export function getCustomerPoints(customerId: string): number {
  return loyaltyEntries
    .filter((entry) => entry.customerId === customerId)
    .reduce((total, entry) => total + entry.points, 0);
}

export function getCustomerTier(customerId: string): Customer["loyaltyTier"] {
  const points = getCustomerPoints(customerId);
  if (points >= 1000) return "Gold";
  if (points >= 400) return "Silver";
  return "Bronze";
}

export function createServiceReminder(input: Omit<ServiceReminder, "id" | "createdAt">): ServiceReminder {
  const reminder: ServiceReminder = {
    id: generateId(),
    customerId: input.customerId,
    vehicleId: input.vehicleId,
    title: input.title,
    message: input.message,
    nextReminderAt: input.nextReminderAt,
    intervalMonths: input.intervalMonths,
    active: input.active,
    createdAt: new Date().toISOString(),
  };
  serviceReminders.push(reminder);
  return reminder;
}

export function getCustomerReminders(customerId: string): ServiceReminder[] {
  return serviceReminders.filter((reminder) => reminder.customerId === customerId && reminder.active);
}
