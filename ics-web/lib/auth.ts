import { cookies } from "next/headers";
import { createHash } from "crypto";
import { customerSessions, deleteSession, getCustomerById, getSession } from "@/lib/store";

export const SESSION_COOKIE_NAME = "ics_customer_session";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export async function getAuthenticatedCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = getSession(token);
  if (!session) return null;

  return getCustomerById(session.customerId) ?? null;
}

export async function clearAuthenticatedCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) deleteSession(token);
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function hasSessionToken(token: string): boolean {
  return customerSessions.some((session) => session.token === token);
}