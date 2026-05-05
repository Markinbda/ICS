"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Calendar, Car, Wrench, Clock, User, AlertTriangle } from "lucide-react";
import type {
  ServiceType,
  VehicleType,
  ServiceRequestType,
  AvailabilitySlot,
} from "@/types/appointments";

// ── Types ───────────────────────────────────────────────────────────────────

interface BookingState {
  // Step 1
  serviceType: ServiceType | "";
  // Step 2
  vehicleType: VehicleType | "";
  year: string;
  make: string;
  model: string;
  tireSize: string;
  tirePicture: File | null;
  // Step 3
  serviceRequestType: ServiceRequestType | "";
  quantity: number;
  notes: string;
  // Step 3 – service-type-specific
  locationId: string;
  serviceAddress: string;
  serviceParish: string;
  accessInstructions: string;
  isUrgent: boolean;
  safeContact: boolean;
  preferredTimeWindow: string;
  // Step 4
  scheduledStart: string;
  // Step 5
  customerName: string;
  email: string;
  phone: string;
}

const INITIAL: BookingState = {
  serviceType: "",
  vehicleType: "",
  year: "",
  make: "",
  model: "",
  tireSize: "",
  tirePicture: null,
  serviceRequestType: "",
  quantity: 1,
  notes: "",
  locationId: "loc-devonshire",
  serviceAddress: "",
  serviceParish: "",
  accessInstructions: "",
  isUrgent: false,
  safeContact: false,
  preferredTimeWindow: "",
  scheduledStart: "",
  customerName: "",
  email: "",
  phone: "",
};

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 26 }, (_, i) => CURRENT_YEAR - i);
const MAKES = [
  "Toyota",
  "Honda",
  "Nissan",
  "Mazda",
  "Mitsubishi",
  "Suzuki",
  "Hyundai",
  "Kia",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Renault",
  "Peugeot",
  "MG",
  "Isuzu",
  "UD Trucks",
  "Other",
];
const PARISHES = ["City of Hamilton","Devonshire","Hamilton Parish","Paget","Pembroke","Sandys","Smith's","Southampton","St. George's","Warwick"];
const TIME_WINDOWS = ["Morning (7am – 11am)","Midday (11am – 2pm)","Afternoon (2pm – 5pm)"];

const STEP_LABELS = [
  { icon: Wrench, label: "Service Type" },
  { icon: Car, label: "Vehicle" },
  { icon: Wrench, label: "Service Details" },
  { icon: Clock, label: "Date & Time" },
  { icon: User, label: "Contact & Confirm" },
];

function inputCls(error?: boolean) {
  return `w-full border ${error ? "border-red-400" : "border-[#d1dae6]"} rounded-lg px-3 py-2.5 text-[#102033] focus:outline-none focus:border-[#0d2a4a] bg-white`;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#102033]">{children}</label>;
}

// ── Step components ──────────────────────────────────────────────────────────

function Step1({ state, set }: { state: BookingState; set: (s: Partial<BookingState>) => void }) {
  const cards: { type: ServiceType; title: string; desc: string; icon: string }[] = [
    { type: "InStore", title: "In-Store", desc: "Visit the ICS Tires workshop at 79 Middle Rd, Devonshire. Select a date and time slot.", icon: "🏪" },
    { type: "Roadside", title: "Roadside", desc: "Stuck with a flat or blowout? ICS will dispatch a technician to your breakdown location.", icon: "🚨" },
    { type: "Mobile", title: "Mobile Installation", desc: "We come to you. Provide your address and we'll bring the equipment to your site.", icon: "🔧" },
  ];

  return (
    <div>
      <p className="text-[#4b5d73] mb-6">How would you like us to serve you?</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <button
            key={c.type}
            type="button"
            onClick={() => set({ serviceType: c.type })}
            className={`text-left rounded-2xl p-6 border-2 transition-all ${
              state.serviceType === c.type
                ? "border-[#f4bf00] bg-[#f4bf00]/5"
                : "border-[#e8edf5] hover:border-[#0d2a4a]"
            }`}
          >
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-[var(--font-heading)] font-black text-lg uppercase text-[#102033] mb-2">{c.title}</h3>
            <p className="text-[#4b5d73] text-sm leading-relaxed">{c.desc}</p>
            {state.serviceType === c.type && (
              <div className="mt-3 flex items-center gap-1.5 text-[#0d2a4a] font-semibold text-sm">
                <Check size={14} /> Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ state, set }: { state: BookingState; set: (s: Partial<BookingState>) => void }) {
  const [fitment, setFitment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const lookupFitment = useCallback(async () => {
    if (!state.year || !state.make || !state.model) return;
    setLoading(true);
    try {
      // Client-side lookup against static fitment data
      const res = await fetch(`/api/fitment?year=${state.year}&make=${encodeURIComponent(state.make)}&model=${encodeURIComponent(state.model)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.tireSizeFront) {
          setFitment(data.tireSizeFront);
          set({ tireSize: data.tireSizeFront });
        } else {
          setFitment(null);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [state.year, state.make, state.model, set]);

  useEffect(() => {
    if (!state.year || !state.make || !state.model) return;

    // Debounce lookups so typing/selecting does not retrigger search on every render.
    const timer = setTimeout(() => {
      lookupFitment();
    }, 300);

    return () => clearTimeout(timer);
  }, [state.year, state.make, state.model, lookupFitment]);

  const vehicleTypes: { type: VehicleType; label: string }[] = [
    { type: "Passenger", label: "Passenger Vehicle" },
    { type: "LightTruck", label: "Light Truck / Van" },
    { type: "HeavyTruck", label: "Heavy Truck / Commercial" },
    { type: "ConstructionEquipment", label: "Construction Equipment" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#102033] mb-3">Vehicle Type</p>
        <div className="grid grid-cols-2 gap-3">
          {vehicleTypes.map((v) => (
            <button
              key={v.type}
              type="button"
              onClick={() => set({ vehicleType: v.type })}
              className={`text-left rounded-xl p-4 border-2 text-sm font-semibold transition-all ${
                state.vehicleType === v.type
                  ? "border-[#f4bf00] bg-[#f4bf00]/5 text-[#102033]"
                  : "border-[#e8edf5] hover:border-[#0d2a4a] text-[#4b5d73]"
              }`}
            >
              {state.vehicleType === v.type && <Check size={12} className="inline mr-1" />}
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FieldLabel>
          Year
          <select value={state.year} onChange={(e) => set({ year: e.target.value })} className={inputCls()}>
            <option value="">Select year</option>
            {YEARS.map((y) => <option key={y}>{y}</option>)}
            <option value="Older">Older</option>
          </select>
        </FieldLabel>
        <FieldLabel>
          Make
          <select value={state.make} onChange={(e) => set({ make: e.target.value })} className={inputCls()}>
            <option value="">Select make</option>
            {MAKES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </FieldLabel>
        <FieldLabel>
          Model
          <input type="text" placeholder="e.g. Corolla" value={state.model} onChange={(e) => set({ model: e.target.value })} className={inputCls()} />
        </FieldLabel>
      </div>

      {loading && <p className="text-sm text-[#4b5d73]">Looking up tire size…</p>}
      {fitment && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          <strong>Recommended tire size:</strong> {fitment}
        </div>
      )}

      <FieldLabel>
        Tire Size
        <input
          type="text"
          placeholder={fitment ?? "e.g. 205/55R16 — enter manually if not found"}
          value={state.tireSize}
          onChange={(e) => set({ tireSize: e.target.value })}
          className={inputCls()}
        />
        {!fitment && <span className="text-xs text-[#4b5d73] font-normal mt-1">No match found — please enter manually. Check your tyre sidewall or owner&apos;s manual.</span>}
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-1 font-normal leading-snug">
          ⚠️ This is the expected size of the tire. Please confirm by looking at your tire or sending us a picture.
        </p>
      </FieldLabel>

      {/* Tire photo upload */}
      <div>
        <p className="text-sm font-semibold text-[#102033] mb-1.5">Upload a Photo of Your Tire <span className="text-[#4b5d73] font-normal">(optional)</span></p>
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#d1dae6] rounded-xl p-6 cursor-pointer hover:border-[#0d2a4a] transition-colors bg-[#f7f9fc]">
          {state.tirePicture ? (
            <>
              <span className="text-2xl">📷</span>
              <span className="text-sm font-semibold text-[#102033]">{state.tirePicture.name}</span>
              <span className="text-xs text-[#4b5d73]">Click to replace</span>
            </>
          ) : (
            <>
              <span className="text-2xl">📷</span>
              <span className="text-sm font-semibold text-[#102033]">Click to upload a tire photo</span>
              <span className="text-xs text-[#4b5d73]">JPG, PNG or HEIC · max 10 MB</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => set({ tirePicture: e.target.files?.[0] ?? null })}
          />
        </label>
        {state.tirePicture && (
          <button
            type="button"
            onClick={() => set({ tirePicture: null })}
            className="mt-2 text-xs text-red-500 hover:text-red-700 font-semibold"
          >
            Remove photo
          </button>
        )}
      </div>
    </div>
  );
}

function Step3({ state, set }: { state: BookingState; set: (s: Partial<BookingState>) => void }) {
  const serviceRequests: { type: ServiceRequestType; label: string }[] = [
    { type: "Replace", label: "Tire Replacement" },
    { type: "Repair", label: "Puncture Repair" },
    { type: "Rotation", label: "Tire Rotation" },
    { type: "Balance", label: "Wheel Balance" },
    { type: "Other", label: "Other" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#102033] mb-3">What do you need?</p>
        <div className="flex flex-wrap gap-3">
          {serviceRequests.map((r) => (
            <button
              key={r.type}
              type="button"
              onClick={() => set({ serviceRequestType: r.type })}
              className={`rounded-full px-5 py-2 text-sm font-semibold border-2 transition-all ${
                state.serviceRequestType === r.type
                  ? "border-[#f4bf00] bg-[#f4bf00] text-black"
                  : "border-[#e8edf5] text-[#4b5d73] hover:border-[#0d2a4a]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldLabel>
          Number of Tires
          <input type="number" min={1} max={8} value={state.quantity} onChange={(e) => set({ quantity: parseInt(e.target.value) || 1 })} className={inputCls()} />
        </FieldLabel>
        <FieldLabel>
          Additional Notes (optional)
          <input type="text" placeholder="Any other details" value={state.notes} onChange={(e) => set({ notes: e.target.value })} className={inputCls()} />
        </FieldLabel>
      </div>

      {/* InStore */}
      {state.serviceType === "InStore" && (
        <div className="bg-[#f7f9fc] rounded-xl p-5 border border-[#e8edf5]">
          <p className="font-semibold text-[#102033] mb-1">Location</p>
          <p className="text-[#4b5d73] text-sm">ICS Tires – 79 Middle Rd, Devonshire, DV 06, Bermuda</p>
        </div>
      )}

      {/* Roadside */}
      {state.serviceType === "Roadside" && (
        <div className="space-y-4 bg-orange-50 border border-orange-200 rounded-xl p-5">
          <div className="flex items-center gap-2 text-orange-700 font-semibold text-sm">
            <AlertTriangle size={16} /> Roadside breakdown — we will dispatch a technician
          </div>
          <FieldLabel>
            Breakdown Location / Address
            <input type="text" placeholder="Road name, landmark, or parish" value={state.serviceAddress} onChange={(e) => set({ serviceAddress: e.target.value })} className={inputCls()} />
          </FieldLabel>
          <FieldLabel>
            Parish
            <select value={state.serviceParish} onChange={(e) => set({ serviceParish: e.target.value })} className={inputCls()}>
              <option value="">Select parish</option>
              {PARISHES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </FieldLabel>
          <label className="flex items-center gap-3 text-sm text-[#102033] cursor-pointer">
            <input type="checkbox" checked={state.isUrgent} onChange={(e) => set({ isUrgent: e.target.checked })} className="accent-[#f4bf00]" />
            <span className="font-semibold">Mark as urgent</span>
          </label>
          <label className="flex items-center gap-3 text-sm text-[#102033] cursor-pointer">
            <input type="checkbox" checked={state.safeContact} onChange={(e) => set({ safeContact: e.target.checked })} className="accent-[#f4bf00]" />
            I confirm I am in a safe location to receive a technician
          </label>
        </div>
      )}

      {/* Mobile */}
      {state.serviceType === "Mobile" && (
        <div className="space-y-4 bg-[#f7f9fc] rounded-xl border border-[#e8edf5] p-5">
          <FieldLabel>
            Service Address
            <input type="text" placeholder="Street address" value={state.serviceAddress} onChange={(e) => set({ serviceAddress: e.target.value })} className={inputCls()} />
          </FieldLabel>
          <FieldLabel>
            Parish
            <select value={state.serviceParish} onChange={(e) => set({ serviceParish: e.target.value })} className={inputCls()}>
              <option value="">Select parish</option>
              {PARISHES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </FieldLabel>
          <FieldLabel>
            Preferred Time Window
            <select value={state.preferredTimeWindow} onChange={(e) => set({ preferredTimeWindow: e.target.value })} className={inputCls()}>
              <option value="">Flexible</option>
              {TIME_WINDOWS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FieldLabel>
          <FieldLabel>
            Access Instructions (optional)
            <input type="text" placeholder="Gate code, parking, landmarks" value={state.accessInstructions} onChange={(e) => set({ accessInstructions: e.target.value })} className={inputCls()} />
          </FieldLabel>
        </div>
      )}
    </div>
  );
}

function Step4({ state, set }: { state: BookingState; set: (s: Partial<BookingState>) => void }) {
  const [slots, setSlots] = useState<Record<string, AvailabilitySlot[]>>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(true);

  useEffect(() => {
    setLoadingSlots(true);
    fetch(`/api/availability?locationId=${state.locationId}&serviceType=${state.serviceType}`)
      .then((r) => r.json())
      .then((d) => { setSlots(d.slots ?? {}); setLoadingSlots(false); })
      .catch(() => setLoadingSlots(false));
  }, [state.locationId, state.serviceType]);

  const dates = Object.keys(slots).sort();

  function fmtDate(dateStr: string) {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  }

  function fmtTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }

  if (loadingSlots) {
    return <div className="py-12 text-center text-[#4b5d73]">Loading available times…</div>;
  }

  return (
    <div className="space-y-6">
      <p className="text-[#4b5d73] text-sm">Select an available date and time for your appointment.</p>

      {/* Date picker */}
      <div className="flex flex-wrap gap-2">
        {dates.map((d) => {
          const daySlots = slots[d] ?? [];
          const hasAvailable = daySlots.some((s) => s.available);
          return (
            <button
              key={d}
              type="button"
              disabled={!hasAvailable}
              onClick={() => { setSelectedDate(d); set({ scheduledStart: "" }); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                selectedDate === d
                  ? "border-[#f4bf00] bg-[#f4bf00] text-black"
                  : hasAvailable
                  ? "border-[#e8edf5] text-[#102033] hover:border-[#0d2a4a]"
                  : "border-[#e8edf5] text-[#d1dae6] cursor-not-allowed"
              }`}
            >
              {fmtDate(d)}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <p className="text-sm font-semibold text-[#102033] mb-3">Available times on {fmtDate(selectedDate)}</p>
          <div className="flex flex-wrap gap-2">
            {(slots[selectedDate] ?? []).map((slot) => (
              <button
                key={slot.start}
                type="button"
                disabled={!slot.available}
                onClick={() => set({ scheduledStart: slot.start })}
                className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                  state.scheduledStart === slot.start
                    ? "border-[#f4bf00] bg-[#f4bf00] text-black"
                    : slot.available
                    ? "border-[#e8edf5] text-[#102033] hover:border-[#0d2a4a]"
                    : "border-[#e8edf5] text-[#d1dae6] cursor-not-allowed line-through"
                }`}
              >
                {fmtTime(slot.start)}
              </button>
            ))}
          </div>
        </div>
      )}

      {state.scheduledStart && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800 font-semibold flex items-center gap-2">
          <Check size={16} />
          Selected: {new Date(state.scheduledStart).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}
        </div>
      )}
    </div>
  );
}

function Step5({ state, set, submitting, error }: { state: BookingState; set: (s: Partial<BookingState>) => void; submitting: boolean; error: string }) {
  const svcLabel = { InStore: "In-Store", Roadside: "Roadside", Mobile: "Mobile Installation" }[state.serviceType as ServiceType] ?? "";
  const reqLabel = { Replace: "Tire Replacement", Repair: "Puncture Repair", Rotation: "Tire Rotation", Balance: "Wheel Balance", Other: "Other" }[state.serviceRequestType as ServiceRequestType] ?? "";

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-[#f7f9fc] rounded-xl border border-[#e8edf5] p-5 text-sm space-y-1.5">
        <p className="font-[var(--font-heading)] font-black text-base uppercase text-[#102033] mb-2">Booking Summary</p>
        <p><span className="text-[#4b5d73]">Service type:</span> <strong>{svcLabel}</strong></p>
        <p><span className="text-[#4b5d73]">Vehicle:</span> <strong>{state.year} {state.make} {state.model}</strong></p>
        <p><span className="text-[#4b5d73]">Tire size:</span> <strong>{state.tireSize || "—"}</strong></p>
        <p><span className="text-[#4b5d73]">Service:</span> <strong>{reqLabel} × {state.quantity}</strong></p>
        <p><span className="text-[#4b5d73]">Date & time:</span> <strong>{state.scheduledStart ? new Date(state.scheduledStart).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" }) : "—"}</strong></p>
        {state.serviceAddress && <p><span className="text-[#4b5d73]">Location:</span> <strong>{state.serviceAddress}{state.serviceParish ? `, ${state.serviceParish}` : ""}</strong></p>}
        {state.isUrgent && <p className="text-orange-700 font-semibold flex items-center gap-1"><AlertTriangle size={12} /> Marked urgent</p>}
      </div>

      {/* Contact details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldLabel>
          Full Name
          <input type="text" placeholder="Full name" required value={state.customerName} onChange={(e) => set({ customerName: e.target.value })} className={inputCls()} />
        </FieldLabel>
        <FieldLabel>
          Phone
          <input type="tel" placeholder="441-000-0000" required value={state.phone} onChange={(e) => set({ phone: e.target.value })} className={inputCls()} />
        </FieldLabel>
        <div className="sm:col-span-2">
          <FieldLabel>
            Email
            <input type="email" placeholder="you@example.com" required value={state.email} onChange={(e) => set({ email: e.target.value })} className={inputCls()} />
          </FieldLabel>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-semibold">
          {error}
        </div>
      )}

      {submitting && (
        <div className="text-center text-[#4b5d73] text-sm">Submitting your booking…</div>
      )}
    </div>
  );
}

// ── Wizard wrapper ───────────────────────────────────────────────────────────

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<BookingState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmed, setConfirmed] = useState<{ id: string; scheduledStart: string } | null>(null);

  const set = useCallback((partial: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  function canAdvance(): boolean {
    switch (step) {
      case 0: return !!state.serviceType;
      case 1: return !!(state.vehicleType && state.year && state.make && state.model);
      case 2:
        if (!state.serviceRequestType) return false;
        if (state.serviceType === "Roadside" && !state.serviceAddress) return false;
        if (state.serviceType === "Mobile" && !state.serviceAddress) return false;
        return true;
      case 3: return !!state.scheduledStart;
      case 4: return !!(state.customerName && state.email && state.phone);
      default: return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const body = {
        serviceType: state.serviceType,
        locationId: state.serviceType === "InStore" ? state.locationId : undefined,
        scheduledStart: state.scheduledStart,
        customerName: state.customerName,
        email: state.email,
        phone: state.phone,
        vehicleType: state.vehicleType,
        year: state.year,
        make: state.make,
        model: state.model,
        tireSize: state.tireSize,
        serviceRequestType: state.serviceRequestType,
        quantity: state.quantity,
        notes: state.notes,
        serviceAddress: state.serviceAddress || undefined,
        serviceParish: state.serviceParish || undefined,
        accessInstructions: state.accessInstructions || undefined,
        isUrgent: state.isUrgent,
        safeContact: state.safeContact,
        preferredTimeWindow: state.preferredTimeWindow || undefined,
      };
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data.errors
          ? data.errors.map((e: { message: string }) => e.message).join(" | ")
          : data.error ?? "Booking failed. Please try again.";
        setSubmitError(msg);
      } else {
        setConfirmed({ id: data.appointment.id, scheduledStart: data.appointment.scheduledStart });
      }
    } catch {
      setSubmitError("Network error. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f7f9fc] px-4">
        <div className="bg-white rounded-2xl p-10 border border-[#e8edf5] shadow-md max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="font-[var(--font-heading)] text-2xl font-black uppercase text-[#102033] mb-3">Booking Confirmed!</h1>
          <p className="text-[#4b5d73] mb-2">Your appointment has been submitted to ICS Tires.</p>
          <p className="text-sm text-[#4b5d73] mb-1"><strong>Booking ID:</strong> {confirmed.id}</p>
          <p className="text-sm text-[#4b5d73] mb-6">
            <strong>Time:</strong> {new Date(confirmed.scheduledStart).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}
          </p>
          <p className="text-sm text-[#4b5d73] mb-8">The ICS team will confirm your booking by phone or email. For urgent help, call <a href="tel:+14412363011" className="text-[#0d2a4a] font-semibold">441-236-3011</a>.</p>
          <Link href="/" className="inline-block bg-[#f4bf00] text-black font-bold px-8 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    <Step1 key="s1" state={state} set={set} />,
    <Step2 key="s2" state={state} set={set} />,
    <Step3 key="s3" state={state} set={set} />,
    <Step4 key="s4" state={state} set={set} />,
    <Step5 key="s5" state={state} set={set} submitting={submitting} error={submitError} />,
  ];

  return (
    <>
      {/* Hero with embedded step progress */}
      <section
        className="relative bg-[#0d2a4a] pt-16 pb-0 text-white"
        style={{ backgroundImage: "linear-gradient(120deg,rgba(13,42,74,0.97),rgba(13,42,74,0.80)),url('/images/division-tires-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="max-w-[1180px] mx-auto px-4 pb-10">
          <Link href="/divisions/tires" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={14} /> ICS Tires
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={20} className="text-[#f4bf00]" />
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-white/60">Appointment Booking</p>
          </div>
          <h1 className="font-[var(--font-heading)] text-3xl md:text-5xl font-black uppercase mb-1">Book a Tire Appointment</h1>
          <p className="text-white/60 text-sm mt-2">Select your service type, vehicle, and preferred time slot.</p>
        </div>

        {/* Yellow accent rule */}
        <div className="h-1 bg-[#f4bf00]" />

        {/* Step tracker bar – navy-dark strip */}
        <div className="bg-[#091e35]">
          <div className="max-w-[820px] mx-auto px-4 py-5">
            <div className="flex items-center gap-0 overflow-x-auto">
              {STEP_LABELS.map((s, i) => {
                const Icon = s.icon;
                const done = i < step;
                const active = i === step;
                return (
                  <div key={i} className="flex items-center flex-shrink-0">
                    <div className={`flex items-center gap-2 text-xs font-semibold transition-all ${active ? "text-[#f4bf00]" : done ? "text-white/90" : "text-white/35"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-all ${active ? "bg-[#f4bf00] border-[#f4bf00] text-black" : done ? "bg-white/10 border-white/50 text-white" : "bg-transparent border-white/20 text-white/30"}`}>
                        {done ? <Check size={14} /> : <Icon size={14} />}
                      </div>
                      <span className="hidden sm:block">{s.label}</span>
                    </div>
                    {i < STEP_LABELS.length - 1 && (
                      <div className={`w-8 sm:w-16 h-0.5 mx-2 transition-all ${i < step ? "bg-[#f4bf00]/60" : "bg-white/15"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-12 bg-[#f0f4fa] min-h-[70vh]">
        <div className="max-w-[820px] mx-auto px-4">

          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-md overflow-hidden">
            {/* Card header stripe */}
            <div className="bg-[#0d2a4a] px-8 py-4 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#f4bf00] rounded-full" />
              <h2 className="font-[var(--font-heading)] text-lg font-black uppercase text-white">
                Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step].label}
              </h2>
            </div>
            <div className="p-8">
            {steps[step]}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[#e8edf5]">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 border-2 border-[#e8edf5] text-[#4b5d73] font-bold px-5 py-2.5 rounded-full hover:border-[#0d2a4a] hover:text-[#0d2a4a] transition-all"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <span />
              )}

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  disabled={!canAdvance()}
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 bg-[#f4bf00] text-black font-bold px-6 py-2.5 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canAdvance() || submitting}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 bg-[#0d2a4a] text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Check size={16} /> Confirm Booking
                </button>
              )}
            </div>
            </div>{/* /p-8 content */}
          </div>{/* /card */}
        </div>
      </section>
    </>
  );
}
