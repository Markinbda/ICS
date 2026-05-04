import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, hashPassword } from "@/lib/auth";
import { createSession, getCustomerByEmail, getOrCreateCustomer } from "@/lib/store";

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; phone?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";
  const password = body.password ?? "";

  if (!name || !email || !phone || password.length < 6) {
    return NextResponse.json(
      { error: "Provide name, email, phone, and a password with at least 6 characters." },
      { status: 422 }
    );
  }

  const existing = getCustomerByEmail(email);
  if (existing?.passwordHash) {
    return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
  }

  const customer = getOrCreateCustomer({
    name,
    email,
    phone,
    passwordHash: hashPassword(password),
  });

  customer.passwordHash = hashPassword(password);
  customer.name = name;
  customer.phone = phone;

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