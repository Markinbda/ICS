import { NextResponse } from "next/server";
import { LOCATIONS } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ locations: LOCATIONS });
}
