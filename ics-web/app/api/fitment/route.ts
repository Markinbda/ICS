import { NextRequest, NextResponse } from "next/server";
import { getFitmentForVehicle } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const yearStr = searchParams.get("year");
  const make = searchParams.get("make") ?? "";
  const model = searchParams.get("model") ?? "";

  if (!yearStr || !make || !model) {
    return NextResponse.json({ error: "year, make, and model are required" }, { status: 400 });
  }

  const year = parseInt(yearStr);
  if (isNaN(year)) {
    return NextResponse.json({ error: "year must be a number" }, { status: 400 });
  }

  const fitment = getFitmentForVehicle(year, make, model);
  if (!fitment) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({
    found: true,
    tireSizeFront: fitment.tireSizeFront,
    tireSizeRear: fitment.tireSizeRear ?? null,
    notes: fitment.notes ?? null,
  });
}
