"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, BellRing, Calendar, HeartHandshake, LogOut, Truck, Wrench } from "lucide-react";
import type { Appointment } from "@/types/appointments";
import type { CustomerVehicle, LoyaltyEntry, QuarryOrder, RewardOption, ServiceReminder } from "@/types/customer";

type CustomerSummary = {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyTier: string;
  points: number;
};

type Overview = {
  customer: CustomerSummary;
  vehicles: CustomerVehicle[];
  appointments: Appointment[];
  orders: QuarryOrder[];
  reminders: ServiceReminder[];
  ledger: LoyaltyEntry[];
  rewards: RewardOption[];
};

export default function AccountPage() {
  const [customer, setCustomer] = useState<CustomerSummary | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("register");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  async function loadAccount() {
    const me = await fetch("/api/auth/me");
    if (!me.ok) {
      setCustomer(null);
      setOverview(null);
      setLoading(false);
      return;
    }

    const meData = await me.json();
    setCustomer(meData.customer);
    const overviewRes = await fetch("/api/account/overview");
    const overviewData = await overviewRes.json();
    setOverview(overviewData);
    setLoading(false);
  }

  useEffect(() => {
    loadAccount();
  }, []);

  async function submitAuth() {
    setError("");
    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const payload = mode === "register"
      ? form
      : { email: form.email, password: form.password };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Unable to continue.");
      return;
    }
    await loadAccount();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setCustomer(null);
    setOverview(null);
  }

  if (loading) {
    return <div className="min-h-[70vh] grid place-items-center text-[#4b5d73]">Loading your customer space...</div>;
  }

  if (!customer || !overview) {
    return (
      <div className="min-h-screen bg-[#f7f4ea]">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,191,0,0.24),_transparent_32%),linear-gradient(135deg,#163456_0%,#0d2a4a_55%,#09192a_100%)] text-white">
          <div className="max-w-[1180px] mx-auto px-4 py-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-white/60 mb-3">ICS Customer Family</p>
              <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-black uppercase leading-[1.02] max-w-3xl">A single place to feel looked after across tires, quarry materials, and service care.</h1>
              <p className="mt-6 text-white/78 text-lg max-w-2xl">This portal is designed to feel personal. You can track rewards, view your work history, receive yearly tire care reminders, and stay connected to the wider ICS family of businesses.</p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-3xl">
                {[
                  { icon: HeartHandshake, title: "One family", text: "Tires, quarry, and service follow-up all in one account." },
                  { icon: Award, title: "Earn rewards", text: "Points build as completed work and orders are taken care of." },
                  { icon: BellRing, title: "Stay ahead", text: "Annual care reminders help customers avoid surprise wear." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                      <Icon size={18} className="text-[#f4bf00] mb-3" />
                      <p className="font-[var(--font-heading)] font-black uppercase text-lg">{item.title}</p>
                      <p className="text-white/72 text-sm mt-2">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white text-[#102033] rounded-[28px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.28)] border border-white/30">
              <div className="flex gap-2 mb-6 bg-[#f3f6fb] rounded-full p-1">
                <button type="button" onClick={() => setMode("register")} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${mode === "register" ? "bg-[#0d2a4a] text-white" : "text-[#4b5d73]"}`}>Create Account</button>
                <button type="button" onClick={() => setMode("login")} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${mode === "login" ? "bg-[#0d2a4a] text-white" : "text-[#4b5d73]"}`}>Sign In</button>
              </div>
              <h2 className="font-[var(--font-heading)] font-black uppercase text-2xl mb-2">{mode === "register" ? "Join the ICS customer family" : "Welcome back"}</h2>
              <p className="text-sm text-[#4b5d73] mb-6">Use your account to track care history, loyalty points, quarry orders, and yearly tire reminders.</p>
              <div className="grid gap-4">
                {mode === "register" && <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="border border-[#d1dae6] rounded-xl px-4 py-3" placeholder="Full name" />}
                {mode === "register" && <input value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="border border-[#d1dae6] rounded-xl px-4 py-3" placeholder="Phone" />}
                <input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="border border-[#d1dae6] rounded-xl px-4 py-3" placeholder="Email" />
                <input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} className="border border-[#d1dae6] rounded-xl px-4 py-3" placeholder="Password" />
                {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}
                <button type="button" onClick={submitAuth} className="bg-[#f4bf00] text-black font-bold rounded-full py-3.5 hover:shadow-[0_12px_30px_rgba(244,191,0,0.35)] transition-all">{mode === "register" ? "Create My Account" : "Sign In"}</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f2e9]">
      <section className="bg-[linear-gradient(135deg,#193757_0%,#0d2a4a_100%)] text-white">
        <div className="max-w-[1180px] mx-auto px-4 py-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-white/60 mb-2">Your ICS family space</p>
            <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-black uppercase leading-[1.02]">Welcome back, {customer.name.split(" ")[0]}.</h1>
            <p className="mt-4 text-white/80 text-lg max-w-2xl">Everything here is built to keep you cared for, informed, and connected across the wider ICS family of businesses. Your portal is not just a ledger. It is your service memory, rewards wallet, and care plan in one place.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:-translate-y-px transition-all">Book Tire Service</Link>
              <Link href="/orders" className="border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">Order Quarry Materials</Link>
            </div>
          </div>
          <div className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-[28px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-[1.5px]">Loyalty status</p>
                <p className="font-[var(--font-heading)] text-4xl font-black uppercase mt-2">{customer.loyaltyTier}</p>
                <p className="text-white/75 mt-2">{customer.points} points available</p>
              </div>
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white">
                <LogOut size={14} /> Sign out
              </button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-white/60 text-xs uppercase">Appointments</p>
                <p className="font-[var(--font-heading)] text-3xl font-black mt-2">{overview.appointments.length}</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-white/60 text-xs uppercase">Orders</p>
                <p className="font-[var(--font-heading)] text-3xl font-black mt-2">{overview.orders.length}</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-white/60 text-xs uppercase">Reminders</p>
                <p className="font-[var(--font-heading)] text-3xl font-black mt-2">{overview.reminders.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-4 py-10 space-y-8">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="bg-white rounded-[28px] p-8 border border-[#e6dcc7] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <HeartHandshake size={18} className="text-[#b8860b]" />
              <h2 className="font-[var(--font-heading)] font-black uppercase text-2xl text-[#102033]">Your care story</h2>
            </div>
            <p className="text-[#4b5d73] mb-6">We want this space to feel human. It keeps your vehicles, service history, materials orders, and tire-care reminders together so our team can look after you properly over time.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#f8f3e7] p-5">
                <p className="text-xs uppercase tracking-[1.4px] text-[#7c6b42] font-bold">Next care reminder</p>
                <p className="font-semibold text-[#102033] mt-2">{overview.reminders[0] ? new Date(overview.reminders[0].nextReminderAt).toLocaleDateString("en-GB", { dateStyle: "full" }) : "No reminder scheduled yet"}</p>
                <p className="text-sm text-[#4b5d73] mt-2">{overview.reminders[0]?.message ?? "Ask the team to set your yearly tire and alignment reminder from the admin side."}</p>
              </div>
              <div className="rounded-2xl bg-[#eef4f8] p-5">
                <p className="text-xs uppercase tracking-[1.4px] text-[#49657f] font-bold">Closest reward</p>
                <p className="font-semibold text-[#102033] mt-2">{overview.rewards[0]?.title}</p>
                <p className="text-sm text-[#4b5d73] mt-2">{Math.max(0, overview.rewards[0].pointsCost - customer.points)} more points to unlock.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#fff4cd] rounded-[28px] p-8 border border-[#f0d77d] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Award size={18} className="text-[#7f5a00]" />
              <h2 className="font-[var(--font-heading)] font-black uppercase text-2xl text-[#102033]">Reward wallet</h2>
            </div>
            <div className="space-y-3">
              {overview.rewards.map((reward) => (
                <div key={reward.id} className="rounded-2xl bg-white/75 p-4 border border-[#f0d77d]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[#102033]">{reward.title}</p>
                      <p className="text-sm text-[#4b5d73] mt-1">{reward.description}</p>
                    </div>
                    <span className="text-sm font-bold text-[#7f5a00] whitespace-nowrap">{reward.pointsCost} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[28px] p-8 border border-[#eadfca] shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Calendar size={18} className="text-[#0d2a4a]" />
              <h2 className="font-[var(--font-heading)] font-black uppercase text-2xl text-[#102033]">Recent tire service</h2>
            </div>
            <div className="space-y-4">
              {overview.appointments.length === 0 && <p className="text-[#4b5d73]">No appointments yet. Book your first visit and the history will start here.</p>}
              {overview.appointments.slice(0, 4).map((appointment) => (
                <div key={appointment.id} className="rounded-2xl bg-[#f7f9fc] p-4 border border-[#e8edf5]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[#102033]">{appointment.make} {appointment.model} • {appointment.serviceRequestType}</p>
                      <p className="text-sm text-[#4b5d73] mt-1">{new Date(appointment.scheduledStart).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0d2a4a]/10 text-[#0d2a4a]">{appointment.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-8 border border-[#eadfca] shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Wrench size={18} className="text-[#0d2a4a]" />
              <h2 className="font-[var(--font-heading)] font-black uppercase text-2xl text-[#102033]">Vehicles on file</h2>
            </div>
            <div className="space-y-3">
              {overview.vehicles.length === 0 && <p className="text-[#4b5d73]">Your vehicles will appear here after your first booking or reminder is saved.</p>}
              {overview.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="rounded-2xl bg-[#f7f9fc] p-4 border border-[#e8edf5]">
                  <p className="font-semibold text-[#102033]">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                  <p className="text-sm text-[#4b5d73] mt-1">{vehicle.tireSize || "Tire size to be confirmed"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
          <div className="bg-white rounded-[28px] p-8 border border-[#eadfca] shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <Truck size={18} className="text-[#0d2a4a]" />
              <h2 className="font-[var(--font-heading)] font-black uppercase text-2xl text-[#102033]">Quarry orders</h2>
            </div>
            <div className="space-y-4">
              {overview.orders.length === 0 && <p className="text-[#4b5d73]">No quarry orders yet. When you submit one, the family record will live here.</p>}
              {overview.orders.slice(0, 4).map((order) => (
                <div key={order.id} className="rounded-2xl bg-[#f7f9fc] p-4 border border-[#e8edf5]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[#102033]">{order.items.map((item) => item.material).join(", ")}</p>
                      <p className="text-sm text-[#4b5d73] mt-1">{new Date(order.createdAt).toLocaleDateString("en-GB", { dateStyle: "medium" })} • ${order.subtotal.toFixed(2)}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0d2a4a]/10 text-[#0d2a4a]">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-8 border border-[#eadfca] shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <BellRing size={18} className="text-[#0d2a4a]" />
              <h2 className="font-[var(--font-heading)] font-black uppercase text-2xl text-[#102033]">Care activity</h2>
            </div>
            <div className="space-y-4">
              {overview.ledger.length === 0 && <p className="text-[#4b5d73]">Points activity will show up after the team completes your service or delivery.</p>}
              {overview.ledger.slice(0, 6).map((entry) => (
                <div key={entry.id} className="rounded-2xl bg-[#f7f9fc] p-4 border border-[#e8edf5] flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#102033]">{entry.description}</p>
                    <p className="text-sm text-[#4b5d73] mt-1">{new Date(entry.createdAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</p>
                  </div>
                  <span className="font-bold text-[#0d2a4a] whitespace-nowrap">{entry.points > 0 ? "+" : ""}{entry.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#102033] text-white rounded-[32px] p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[1.5px] text-white/55 font-bold">Always looked after</p>
              <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase mt-2">Need us to take the next step for you?</h2>
              <p className="text-white/72 mt-3 max-w-2xl">Book tire service, submit a materials order, or talk to the team. The goal is simple: make customers feel remembered and well cared for every time they return.</p>
            </div>
            <Link href="/book" className="inline-flex items-center justify-center gap-2 bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:-translate-y-px transition-all">
              Book Next Visit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}