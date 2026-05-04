import type { Appointment } from "@/types/appointments";
import type { QuarryOrder } from "@/types/customer";

export function getAppointmentPoints(appointment: Appointment): number {
  switch (appointment.serviceRequestType) {
    case "Replace":
      return appointment.quantity * 25;
    case "Repair":
      return appointment.quantity * 15;
    case "Rotation":
      return 20;
    case "Balance":
      return 20;
    default:
      return 10;
  }
}

export function getAppointmentPointsDescription(appointment: Appointment): string {
  return `Completed ${appointment.serviceRequestType.toLowerCase()} service for ${appointment.make} ${appointment.model}`;
}

export function getQuarryOrderPoints(order: QuarryOrder): number {
  return Math.max(10, Math.floor(order.subtotal / 10));
}

export function getQuarryOrderPointsDescription(order: QuarryOrder): string {
  return `Completed quarry order for ${order.items.length} material line${order.items.length === 1 ? "" : "s"}`;
}