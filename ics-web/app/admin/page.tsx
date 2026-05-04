"use client";

import { useState, useEffect, useCallback } from "react";
import type { Appointment, AppointmentStatus } from "@/types/appointments";
import type { QuarryOrder, ServiceReminder } from "@/types/customer";
import { Search, Download, Check, X, RefreshCw, BellRing, Truck } from "lucide-react";

function statusColor(s: AppointmentStatus) {
  return {
    Pending: "bg-amber-100 text-amber-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  }[s];
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [quarryOrders, setQuarryOrders] = useState<QuarryOrder[]>([]);
  const [reminders, setReminders] = useState<ServiceReminder[]>([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | "">("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reminderSaving, setReminderSaving] = useState(false);
  const [reminderNotice, setReminderNotice] = useState("");
  const [reminderForm, setReminderForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    tireSize: "",
    nextReminderAt: "",
    message: "",
  });

  const loadOperations = useCallback(async () => {
    const res = await fetch("/api/admin/reminders");
    const data = await res.json();
    setQuarryOrders(data.quarryOrders ?? []);
    setReminders(data.reminders ?? []);
  }, []);

  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  const search = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    const isEmail = query.includes("@");
    const param = isEmail ? `email=${encodeURIComponent(query)}` : `phone=${encodeURIComponent(query)}`;
    try {
      const res = await fetch(`/api/appointments?${param}`);
      const data = await res.json();
      setAppointments(data.appointments ?? []);
    } finally {
      setLoading(false);
    }
  }, [query]);

  async function patch(id: string, payload: Partial<{ status: AppointmentStatus; scheduledStart: string }>) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments((prev) => prev.map((a) => (a.id === id ? data.appointment : a)));
      }
    } finally {
      setActionLoading(null);
    }
  }

  async function patchQuarryOrder(id: string, status: QuarryOrder["status"]) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/quarry-orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setQuarryOrders((prev) => prev.map((order) => (order.id === id ? data.order : order)));
      }
    } finally {
      setActionLoading(null);
    }
  }

  async function createReminder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setReminderSaving(true);
    setReminderNotice("");
    try {
      const res = await fetch("/api/admin/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reminderForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setReminderNotice(data.error ?? "Unable to save reminder.");
        return;
      }
      setReminderNotice("Yearly reminder saved.");
      setReminderForm({
        customerName: "",
        email: "",
        phone: "",
        year: "",
        make: "",
        model: "",
        tireSize: "",
        nextReminderAt: "",
        message: "",
      });
      await loadOperations();
    } finally {
      setReminderSaving(false);
    }
  }

  function exportCsv() {
    const rows = [
      ["ID","Status","Type","Scheduled","Customer","Email","Phone","Vehicle","Tire Size","Service","Qty","Address"].join(","),
      ...filtered.map((a) =>
        [
          a.id, a.status, a.serviceType,
          new Date(a.scheduledStart).toLocaleString("en-GB"),
          `"${a.customerName}"`, a.email, a.phone,
          `"${a.year} ${a.make} ${a.model}"`,
          a.tireSize, a.serviceRequestType, a.quantity,
          `"${a.serviceAddress ?? ""}"`
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ics-appointments-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = appointments.filter((a) => {
    if (filterStatus && a.status !== filterStatus) return false;
    if (filterType && a.serviceType !== filterType) return false;
    return true;
  });

  const todayStr = new Date().toISOString().split("T")[0];
  const todayAppts = appointments.filter((a) => a.scheduledStart.startsWith(todayStr));

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Admin header */}
      <div className="bg-[#0d2a4a] text-white px-6 py-5">
        <p className="text-xs font-bold uppercase tracking-[1.5px] text-white/60 mb-1">ICS Tires — Staff Dashboard</p>
        <h1 className="font-[var(--font-heading)] text-2xl font-black uppercase">Appointment Manager</h1>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 py-10 space-y-8">
        {/* Today summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(["Pending", "Confirmed", "Completed", "Cancelled"] as AppointmentStatus[]).map((s) => (
            <div key={s} className="bg-white rounded-2xl p-5 border border-[#e8edf5] shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-1">Today&apos;s {s}</p>
              <p className="font-[var(--font-heading)] text-3xl font-black text-[#102033]">
                {todayAppts.filter((a) => a.status === s).length}
              </p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8edf5] shadow-sm">
          <p className="font-[var(--font-heading)] font-black text-base uppercase text-[#102033] mb-4">Search Appointments</p>
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Email or phone number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              className="flex-1 min-w-[240px] border border-[#d1dae6] rounded-lg px-3 py-2.5 text-[#102033] focus:outline-none focus:border-[#0d2a4a]"
            />
            <button
              onClick={search}
              disabled={loading || !query}
              className="inline-flex items-center gap-2 bg-[#0d2a4a] text-white font-bold px-5 py-2.5 rounded-full hover:shadow-md transition-all disabled:opacity-40"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
              Search
            </button>
          </div>
        </div>

        {/* Filters + table */}
        {appointments.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-sm overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-[#e8edf5]">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as AppointmentStatus | "")} className="border border-[#d1dae6] rounded-lg px-3 py-2 text-sm text-[#102033] focus:outline-none">
                <option value="">All statuses</option>
                {(["Pending","Confirmed","Completed","Cancelled"] as AppointmentStatus[]).map((s) => <option key={s}>{s}</option>)}
              </select>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border border-[#d1dae6] rounded-lg px-3 py-2 text-sm text-[#102033] focus:outline-none">
                <option value="">All types</option>
                <option>InStore</option>
                <option>Roadside</option>
                <option>Mobile</option>
              </select>
              <button onClick={exportCsv} className="ml-auto inline-flex items-center gap-2 border-2 border-[#0d2a4a] text-[#0d2a4a] font-bold px-4 py-2 rounded-full text-sm hover:-translate-y-px transition-all">
                <Download size={14} /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f7f9fc] text-[#4b5d73] text-xs font-bold uppercase tracking-wide">
                    <th className="text-left px-5 py-3">Time</th>
                    <th className="text-left px-5 py-3">Customer</th>
                    <th className="text-left px-5 py-3">Vehicle</th>
                    <th className="text-left px-5 py-3">Service</th>
                    <th className="text-left px-5 py-3">Type</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-left px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4f9]">
                  {filtered.map((a) => (
                    <tr key={a.id} className="hover:bg-[#f7f9fc]">
                      <td className="px-5 py-3 whitespace-nowrap text-[#102033]">
                        {new Date(a.scheduledStart).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-semibold text-[#102033]">{a.customerName}</p>
                        <p className="text-[#4b5d73] text-xs">{a.phone}</p>
                      </td>
                      <td className="px-5 py-3 text-[#4b5d73]">
                        {a.year} {a.make} {a.model}<br />
                        <span className="text-xs">{a.tireSize}</span>
                      </td>
                      <td className="px-5 py-3 text-[#4b5d73]">
                        {a.serviceRequestType} × {a.quantity}
                      </td>
                      <td className="px-5 py-3">
                        <span className="bg-[#0d2a4a]/10 text-[#0d2a4a] text-xs font-semibold px-2.5 py-1 rounded-full">{a.serviceType}</span>
                        {a.isUrgent && <span className="ml-1 bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">Urgent</span>}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(a.status)}`}>{a.status}</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          {a.status === "Pending" && (
                            <button
                              onClick={() => patch(a.id, { status: "Confirmed" })}
                              disabled={actionLoading === a.id}
                              className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                              title="Confirm"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          {a.status !== "Cancelled" && a.status !== "Completed" && (
                            <button
                              onClick={() => patch(a.id, { status: "Cancelled" })}
                              disabled={actionLoading === a.id}
                              className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {appointments.length === 0 && !loading && (
          <div className="text-center text-[#4b5d73] py-16">
            Search by customer email or phone to view appointments.
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e8edf5] flex items-center gap-2">
              <Truck size={18} className="text-[#0d2a4a]" />
              <h2 className="font-[var(--font-heading)] font-black text-base uppercase text-[#102033]">Quarry Orders</h2>
            </div>
            <div className="divide-y divide-[#f0f4f9]">
              {quarryOrders.length === 0 && <p className="px-6 py-8 text-sm text-[#4b5d73]">No quarry orders yet.</p>}
              {quarryOrders.map((order) => (
                <div key={order.id} className="px-6 py-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[#102033]">{order.customerName}</p>
                      <p className="text-xs text-[#4b5d73]">{order.email} • {order.phone}</p>
                      <p className="text-xs text-[#4b5d73] mt-1">{order.items.map((item) => `${item.material} (${item.tons} tons)`).join(", ")}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0d2a4a]/10 text-[#0d2a4a]">{order.status}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <p className="text-[#4b5d73]">Subtotal: <span className="font-semibold text-[#102033]">${order.subtotal.toFixed(2)}</span></p>
                    <div className="flex gap-2">
                      {order.status === "Pending" && <button onClick={() => patchQuarryOrder(order.id, "Confirmed")} className="px-3 py-1.5 rounded-full border border-[#d1dae6] text-[#102033] font-semibold text-xs">Confirm</button>}
                      {order.status !== "Completed" && order.status !== "Cancelled" && <button onClick={() => patchQuarryOrder(order.id, "Completed")} className="px-3 py-1.5 rounded-full bg-[#f4bf00] text-black font-semibold text-xs">Complete + Award Points</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e8edf5] flex items-center gap-2">
              <BellRing size={18} className="text-[#0d2a4a]" />
              <h2 className="font-[var(--font-heading)] font-black text-base uppercase text-[#102033]">Annual Tire Care Reminders</h2>
            </div>
            <form onSubmit={createReminder} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#e8edf5]">
              <input value={reminderForm.customerName} onChange={(e) => setReminderForm((prev) => ({ ...prev, customerName: e.target.value }))} placeholder="Customer name" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm" required />
              <input value={reminderForm.phone} onChange={(e) => setReminderForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="Phone" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm" required />
              <input value={reminderForm.email} onChange={(e) => setReminderForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm sm:col-span-2" required />
              <input value={reminderForm.year} onChange={(e) => setReminderForm((prev) => ({ ...prev, year: e.target.value }))} placeholder="Vehicle year" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm" />
              <input value={reminderForm.make} onChange={(e) => setReminderForm((prev) => ({ ...prev, make: e.target.value }))} placeholder="Make" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm" required />
              <input value={reminderForm.model} onChange={(e) => setReminderForm((prev) => ({ ...prev, model: e.target.value }))} placeholder="Model" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm" required />
              <input value={reminderForm.tireSize} onChange={(e) => setReminderForm((prev) => ({ ...prev, tireSize: e.target.value }))} placeholder="Tire size" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm" />
              <input type="date" value={reminderForm.nextReminderAt} onChange={(e) => setReminderForm((prev) => ({ ...prev, nextReminderAt: e.target.value ? `${e.target.value}T09:00:00.000Z` : "" }))} className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm" />
              <textarea value={reminderForm.message} onChange={(e) => setReminderForm((prev) => ({ ...prev, message: e.target.value }))} placeholder="Optional custom message" className="border border-[#d1dae6] rounded-lg px-3 py-2.5 text-sm sm:col-span-2 min-h-[96px]" />
              {reminderNotice && <p className="sm:col-span-2 text-sm font-semibold text-[#0d2a4a]">{reminderNotice}</p>}
              <button type="submit" disabled={reminderSaving} className="sm:col-span-2 bg-[#0d2a4a] text-white font-bold py-3 rounded-full disabled:opacity-50">{reminderSaving ? "Saving..." : "Save Yearly Reminder"}</button>
            </form>
            <div className="divide-y divide-[#f0f4f9]">
              {reminders.length === 0 && <p className="px-6 py-8 text-sm text-[#4b5d73]">No reminders scheduled yet.</p>}
              {reminders.map((reminder) => (
                <div key={reminder.id} className="px-6 py-4">
                  <p className="font-semibold text-[#102033]">{reminder.title}</p>
                  <p className="text-sm text-[#4b5d73] mt-1">{reminder.message}</p>
                  <p className="text-xs text-[#4b5d73] mt-2">Next send date: {new Date(reminder.nextReminderAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
