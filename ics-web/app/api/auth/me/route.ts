import { NextResponse } from "next/server";
import { getAuthenticatedCustomer } from "@/lib/auth";
import { getCustomerPoints, getCustomerTier } from "@/lib/store";

export async function GET() {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ customer: null }, { status: 401 });
  }

  return NextResponse.json({
    customer: {
      ...customer,
      points: getCustomerPoints(customer.id),
      loyaltyTier: getCustomerTier(customer.id),
    },
  });
}