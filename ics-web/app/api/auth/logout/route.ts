import { NextResponse } from "next/server";
import { clearAuthenticatedCustomer } from "@/lib/auth";

export async function POST() {
  await clearAuthenticatedCustomer();
  return NextResponse.json({ ok: true });
}