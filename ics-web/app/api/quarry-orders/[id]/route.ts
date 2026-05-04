import { NextRequest, NextResponse } from "next/server";
import { addLoyaltyEntry, getCustomerById, quarryOrders } from "@/lib/store";
import { getQuarryOrderPoints, getQuarryOrderPointsDescription } from "@/lib/loyalty";

const VALID_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = quarryOrders.find((entry) => entry.id === id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  let body: { status?: (typeof VALID_STATUSES)[number] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid order status" }, { status: 422 });
  }

  if (body.status) order.status = body.status;
  order.updatedAt = new Date().toISOString();

  if (order.status === "Completed" && order.customerId && getCustomerById(order.customerId)) {
    addLoyaltyEntry({
      customerId: order.customerId,
      sourceType: "QuarryOrder",
      sourceId: order.id,
      points: getQuarryOrderPoints(order),
      description: getQuarryOrderPointsDescription(order),
    });
  }

  return NextResponse.json({ order });
}