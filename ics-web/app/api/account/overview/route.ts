import { NextResponse } from "next/server";
import { getAuthenticatedCustomer } from "@/lib/auth";
import {
  REWARD_OPTIONS,
  customerVehicles,
  getCustomerAppointments,
  getCustomerPoints,
  getCustomerQuarryOrders,
  getCustomerReminders,
  getCustomerTier,
  loyaltyEntries,
} from "@/lib/store";

export async function GET() {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appointments = getCustomerAppointments(customer)
    .slice()
    .sort((left, right) => right.scheduledStart.localeCompare(left.scheduledStart));
  const orders = getCustomerQuarryOrders(customer)
    .slice()
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  const vehicles = customerVehicles.filter((vehicle) => vehicle.customerId === customer.id);
  const reminders = getCustomerReminders(customer.id)
    .slice()
    .sort((left, right) => left.nextReminderAt.localeCompare(right.nextReminderAt));
  const points = getCustomerPoints(customer.id);
  const ledger = loyaltyEntries
    .filter((entry) => entry.customerId === customer.id)
    .slice()
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

  return NextResponse.json({
    customer: {
      ...customer,
      loyaltyTier: getCustomerTier(customer.id),
      points,
    },
    vehicles,
    appointments,
    orders,
    reminders,
    ledger,
    rewards: REWARD_OPTIONS,
  });
}