import { NextRequest, NextResponse } from "next/server";
import { addLoyaltyEntry, appointments, getCustomerByEmail } from "@/lib/store";
import { getAppointmentPoints, getAppointmentPointsDescription } from "@/lib/loyalty";
import type { AppointmentStatus } from "@/types/appointments";

const VALID_STATUSES: AppointmentStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];

// GET /api/appointments/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const appointment = appointments.find((a) => a.id === id);
  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }
  return NextResponse.json({ appointment });
}

// PATCH /api/appointments/:id — cancel or reschedule
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  let body: { status?: AppointmentStatus; scheduledStart?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const appt = appointments[index];

  if (body.status) {
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 422 });
    }
    appt.status = body.status;
  }

  if (body.scheduledStart) {
    const dt = new Date(body.scheduledStart);
    if (isNaN(dt.getTime())) {
      return NextResponse.json({ error: "scheduledStart is not a valid ISO datetime" }, { status: 422 });
    }
    if (dt < new Date()) {
      return NextResponse.json({ error: "scheduledStart must be in the future" }, { status: 422 });
    }
    appt.scheduledStart = dt.toISOString();
  }

  appt.updatedAt = new Date().toISOString();
  appointments[index] = appt;

  if (appt.status === "Completed") {
    const customer = getCustomerByEmail(appt.email);
    if (customer) {
      addLoyaltyEntry({
        customerId: customer.id,
        sourceType: "Appointment",
        sourceId: appt.id,
        points: getAppointmentPoints(appt),
        description: getAppointmentPointsDescription(appt),
      });
    }
  }

  // TODO: send reschedule/cancel notification via INotificationService

  return NextResponse.json({ appointment: appt });
}
