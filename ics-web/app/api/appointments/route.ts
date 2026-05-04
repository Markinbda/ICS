import { NextRequest, NextResponse } from "next/server";
import type { CreateAppointmentRequest } from "@/types/appointments";
import { validateAppointmentRequest } from "@/lib/validation";
import { appointments, generateId, getOrCreateCustomer, saveCustomerVehicle, DEFAULT_CAPACITY } from "@/lib/store";
import { generateSlots } from "@/lib/availability";

// POST /api/appointments — create booking
export async function POST(request: NextRequest) {
  let body: Partial<CreateAppointmentRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const errors = validateAppointmentRequest(body);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const req = body as CreateAppointmentRequest;

  // Capacity check for InStore / Mobile
  if (req.serviceType !== "Roadside" && req.locationId) {
    const dateStr = req.scheduledStart.split("T")[0];
    const slots = generateSlots(req.locationId, dateStr, req.serviceType);
    const targetSlot = slots.find((s) => s.start === req.scheduledStart);
    if (!targetSlot || !targetSlot.available) {
      return NextResponse.json(
        { error: "Selected time slot is no longer available. Please choose another time." },
        { status: 409 }
      );
    }
  }

  const slotDuration = DEFAULT_CAPACITY.slotDurationMinutes;
  const start = new Date(req.scheduledStart);
  const end = new Date(start.getTime() + slotDuration * 60_000);
  const now = new Date().toISOString();
  const customer = getOrCreateCustomer({
    name: req.customerName,
    email: req.email,
    phone: req.phone,
  });

  saveCustomerVehicle({
    customerId: customer.id,
    year: req.year,
    make: req.make,
    model: req.model,
    tireSize: req.tireSize,
  });

  const appointment = {
    id: generateId(),
    serviceType: req.serviceType,
    locationId: req.locationId,
    scheduledStart: start.toISOString(),
    scheduledEnd: end.toISOString(),
    status: "Pending" as const,
    customerName: req.customerName.trim(),
    email: req.email.toLowerCase().trim(),
    phone: req.phone.trim(),
    vehicleType: req.vehicleType,
    year: req.year,
    make: req.make.trim(),
    model: req.model.trim(),
    tireSize: req.tireSize?.trim() ?? "",
    serviceRequestType: req.serviceRequestType,
    quantity: req.quantity,
    notes: req.notes?.trim(),
    serviceAddress: req.serviceAddress?.trim(),
    serviceParish: req.serviceParish?.trim(),
    accessInstructions: req.accessInstructions?.trim(),
    isUrgent: req.isUrgent ?? false,
    safeContact: req.safeContact ?? false,
    preferredTimeWindow: req.preferredTimeWindow?.trim(),
    createdAt: now,
    updatedAt: now,
  };

  appointments.push(appointment);

  // TODO: send confirmation email/SMS via INotificationService

  return NextResponse.json({ appointment }, { status: 201 });
}

// GET /api/appointments?email= or ?phone=  — lookup by customer
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const email = searchParams.get("email")?.toLowerCase().trim();
  const phone = searchParams.get("phone")?.trim();

  if (!email && !phone) {
    return NextResponse.json({ error: "Provide email or phone query parameter" }, { status: 400 });
  }

  const results = appointments.filter((a) => {
    if (email && a.email === email) return true;
    if (phone && a.phone === phone) return true;
    return false;
  });

  return NextResponse.json({ appointments: results });
}
