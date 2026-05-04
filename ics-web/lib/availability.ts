import type { AvailabilitySlot } from "@/types/appointments";
import {
  BUSINESS_HOURS,
  DEFAULT_CAPACITY,
  countAppointmentsOnDay,
} from "@/lib/store";

/**
 * Generate 30-minute appointment slots for a given location, date, and service type.
 * Roadside bypasses capacity but is still returned so the UI can show times.
 */
export function generateSlots(
  locationId: string,
  dateStr: string, // "YYYY-MM-DD"
  serviceType: "InStore" | "Roadside" | "Mobile"
): AvailabilitySlot[] {
  const date = new Date(dateStr + "T00:00:00");
  const dayOfWeek = date.getDay();

  const hours = BUSINESS_HOURS.find(
    (h) => h.locationId === locationId && h.dayOfWeek === dayOfWeek
  );

  // Closed day → no slots
  if (!hours) return [];

  const slotMinutes = DEFAULT_CAPACITY.slotDurationMinutes;
  const maxSlots = DEFAULT_CAPACITY.maxAppointments;

  const bookedCount = countAppointmentsOnDay(locationId, dateStr);

  const [openH, openM] = hours.openTime.split(":").map(Number);
  const [closeH, closeM] = hours.closeTime.split(":").map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const slots: AvailabilitySlot[] = [];
  let cursor = openMinutes;

  while (cursor + slotMinutes <= closeMinutes) {
    const startH = Math.floor(cursor / 60);
    const startMin = cursor % 60;
    const endCursor = cursor + slotMinutes;
    const endH = Math.floor(endCursor / 60);
    const endMin = endCursor % 60;

    const fmt = (h: number, m: number) =>
      `${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;

    const start = fmt(startH, startMin);
    const end = fmt(endH, endMin);

    // Roadside always available; InStore/Mobile respect capacity
    const available =
      serviceType === "Roadside" ? true : bookedCount < maxSlots;

    slots.push({ start, end, available });
    cursor = endCursor;
  }

  return slots;
}
