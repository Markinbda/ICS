import { NextRequest, NextResponse } from "next/server";
import {
  MATERIAL_PRICING,
  generateId,
  getCustomerByEmail,
  getOrCreateCustomer,
  quarryOrders,
} from "@/lib/store";

type QuarryOrderRequest = {
  customerName?: string;
  email?: string;
  phone?: string;
  deliveryAddress?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  items?: Array<{
    material?: string;
    tons?: number;
    truck?: string;
    notes?: string;
  }>;
};

export async function POST(request: NextRequest) {
  let body: QuarryOrderRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.customerName || !body.email || !body.phone || !body.deliveryAddress || !body.items?.length) {
    return NextResponse.json({ error: "Customer, contact, address, and at least one order item are required." }, { status: 422 });
  }

  const items = body.items.map((item) => {
    const material = item.material?.trim() ?? "";
    const tons = Number(item.tons ?? 0);
    const unitPrice = MATERIAL_PRICING[material];

    if (!material || !item.truck || !unitPrice || tons <= 0) {
      throw new Error("Each order item must include a known material, tonnage, and truck size.");
    }

    return {
      material,
      tons,
      truck: item.truck.trim(),
      notes: item.notes?.trim(),
      unitPrice,
      lineTotal: Math.round(unitPrice * tons * 100) / 100,
    };
  });

  const existingCustomer = getCustomerByEmail(body.email);
  const customer = existingCustomer ?? getOrCreateCustomer({
    name: body.customerName,
    email: body.email,
    phone: body.phone,
  });
  const subtotal = Math.round(items.reduce((total, item) => total + item.lineTotal, 0) * 100) / 100;
  const now = new Date().toISOString();

  const order = {
    id: generateId(),
    customerId: customer.id,
    customerName: body.customerName.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    deliveryAddress: body.deliveryAddress.trim(),
    preferredDate: body.preferredDate?.trim(),
    preferredTime: body.preferredTime?.trim(),
    notes: body.notes?.trim(),
    items,
    subtotal,
    status: "Pending" as const,
    createdAt: now,
    updatedAt: now,
  };

  quarryOrders.push(order);
  return NextResponse.json({ order }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ orders: quarryOrders });
}