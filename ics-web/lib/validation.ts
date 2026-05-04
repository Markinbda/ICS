import type { CreateAppointmentRequest } from "@/types/appointments";

export type ValidationError = { field: string; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

export function validateAppointmentRequest(
  body: Partial<CreateAppointmentRequest>
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!body.serviceType || !["InStore", "Roadside", "Mobile"].includes(body.serviceType)) {
    errors.push({ field: "serviceType", message: "serviceType must be InStore, Roadside, or Mobile" });
  }

  if (body.serviceType === "InStore" && !body.locationId) {
    errors.push({ field: "locationId", message: "locationId is required for InStore appointments" });
  }

  if (!body.scheduledStart) {
    errors.push({ field: "scheduledStart", message: "scheduledStart is required" });
  } else {
    const dt = new Date(body.scheduledStart);
    if (isNaN(dt.getTime())) {
      errors.push({ field: "scheduledStart", message: "scheduledStart is not a valid ISO datetime" });
    } else if (dt < new Date()) {
      errors.push({ field: "scheduledStart", message: "scheduledStart must be in the future" });
    }
  }

  const name = (body.customerName ?? "").trim();
  if (!name || name.length < 2) {
    errors.push({ field: "customerName", message: "customerName is required (min 2 chars)" });
  }

  if (!body.email || !EMAIL_RE.test(body.email)) {
    errors.push({ field: "email", message: "Valid email is required" });
  }

  if (!body.phone || !PHONE_RE.test(body.phone)) {
    errors.push({ field: "phone", message: "Valid phone number is required" });
  }

  if (!body.vehicleType || !["Passenger","LightTruck","HeavyTruck","ConstructionEquipment"].includes(body.vehicleType)) {
    errors.push({ field: "vehicleType", message: "vehicleType must be Passenger, LightTruck, HeavyTruck, or ConstructionEquipment" });
  }

  if (!body.year) errors.push({ field: "year", message: "year is required" });
  if (!body.make?.trim()) errors.push({ field: "make", message: "make is required" });
  if (!body.model?.trim()) errors.push({ field: "model", message: "model is required" });

  if (!body.serviceRequestType || !["Replace","Repair","Rotation","Balance","Other"].includes(body.serviceRequestType)) {
    errors.push({ field: "serviceRequestType", message: "serviceRequestType must be Replace, Repair, Rotation, Balance, or Other" });
  }

  if (!body.quantity || body.quantity < 1 || body.quantity > 8) {
    errors.push({ field: "quantity", message: "quantity must be between 1 and 8" });
  }

  if (body.serviceType === "Mobile" || body.serviceType === "Roadside") {
    if (!body.serviceAddress?.trim()) {
      errors.push({ field: "serviceAddress", message: "serviceAddress is required for Roadside/Mobile" });
    }
  }

  return errors;
}
