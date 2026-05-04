import { NextRequest, NextResponse } from "next/server";
import { createServiceReminder, customerVehicles, getCustomerById, getOrCreateCustomer, quarryOrders, saveCustomerVehicle, serviceReminders } from "@/lib/store";

function getNextYearIso() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString();
}

export async function GET() {
  const reminders = serviceReminders.map((reminder) => ({
    ...reminder,
    customer: getCustomerById(reminder.customerId),
    vehicle: reminder.vehicleId ? customerVehicles.find((vehicle) => vehicle.id === reminder.vehicleId) : null,
  }));

  return NextResponse.json({ reminders, quarryOrders });
}

export async function POST(request: NextRequest) {
  let body: {
    customerName?: string;
    email?: string;
    phone?: string;
    year?: string;
    make?: string;
    model?: string;
    tireSize?: string;
    nextReminderAt?: string;
    message?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.customerName || !body.email || !body.phone || !body.make || !body.model) {
    return NextResponse.json({ error: "Customer name, email, phone, make, and model are required." }, { status: 422 });
  }

  const customer = getOrCreateCustomer({
    name: body.customerName,
    email: body.email,
    phone: body.phone,
  });
  const vehicle = saveCustomerVehicle({
    customerId: customer.id,
    year: body.year?.trim() || "Current",
    make: body.make,
    model: body.model,
    tireSize: body.tireSize,
  });

  const reminder = createServiceReminder({
    customerId: customer.id,
    vehicleId: vehicle.id,
    title: "Annual Tire Care Reminder",
    message:
      body.message?.trim() ||
      "It is time for your yearly tire health check and wheel alignment with the ICS Tires team.",
    nextReminderAt: body.nextReminderAt || getNextYearIso(),
    intervalMonths: 12,
    active: true,
  });

  return NextResponse.json({ reminder }, { status: 201 });
}