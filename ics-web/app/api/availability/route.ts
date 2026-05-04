import { NextRequest, NextResponse } from "next/server";
import { generateSlots } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const locationId = searchParams.get("locationId") ?? "loc-devonshire";
  const serviceType = (searchParams.get("serviceType") ?? "InStore") as
    | "InStore"
    | "Roadside"
    | "Mobile";

  // Build slots for next 14 days
  const slots: Record<string, ReturnType<typeof generateSlots>> = {};
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    slots[dateStr] = generateSlots(locationId, dateStr, serviceType);
  }

  return NextResponse.json({ locationId, serviceType, slots });
}
