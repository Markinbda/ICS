import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, hashPassword } from "@/lib/auth";
import { createSession, getCustomerByEmail } from "@/lib/store";

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const customer = getCustomerByEmail(email);

  if (!customer || !customer.passwordHash || customer.passwordHash !== hashPassword(password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = createSession(customer.id);
  const response = NextResponse.json({ customer });
  response.cookies.set(SESSION_COOKIE_NAME, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}