"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, ShoppingCart, Trash2, X } from "lucide-react";

type CartItem = {
  material: string;
  tons: number;
  truck: string;
  notes: string;
};

const MATERIALS = ["Sand","Screenings","5/8 Rock","Gabion Rock","Soil","Boulders","Mixed Aggregate Load"];
const TRUCKS = ["Small Truck","Big Truck"];

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <label className={`flex flex-col gap-1.5 text-sm font-semibold text-[#102033] ${className}`}>{children}</label>;
}

function inputCls() {
  return "border border-[#d1dae6] rounded-lg px-3 py-2.5 font-normal text-[#102033] focus:outline-none focus:border-[#0d2a4a] bg-white";
}

export default function OrdersPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [material, setMaterial] = useState("");
  const [tons, setTons] = useState("");
  const [truck, setTruck] = useState("");
  const [itemNotes, setItemNotes] = useState("");
  const [addError, setAddError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderTotal, setOrderTotal] = useState<number | null>(null);

  const addToCart = useCallback(() => {
    if (!material || !tons || !truck) {
      setAddError("Select material, tonnage, and truck size before adding.");
      return;
    }
    setAddError("");
    setCart((prev) => [...prev, { material, tons: parseFloat(tons), truck, notes: itemNotes }]);
    setMaterial("");
    setTons("");
    setTruck("");
    setItemNotes("");
  }, [material, tons, truck, itemNotes]);

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const tel = data.get("telephone") as string;
    const email = data.get("billing-email") as string;
    const address = data.get("delivery-address") as string;
    const date = data.get("delivery-date") as string;
    const time = data.get("delivery-time") as string;
    const notes = data.get("notes") as string;
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/quarry-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          email,
          phone: tel,
          deliveryAddress: address,
          preferredDate: date || undefined,
          preferredTime: time || undefined,
          notes: notes || undefined,
          items: cart,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setSubmitError(payload.error ?? "Unable to submit order right now.");
        return;
      }

      setOrderId(payload.order.id);
      setOrderTotal(payload.order.subtotal);
      setSubmitted(true);
      setCart([]);
      form.reset();
    } catch {
      setSubmitError("Network error. Please try again or call the quarry team directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[44vh] flex items-end pb-14 pt-24 text-white"
        style={{ backgroundImage: "linear-gradient(120deg,rgba(13,42,74,0.82),rgba(13,42,74,0.5)),url('/images/quarry.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 w-full">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={14} /> Back to homepage
          </Link>
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-white/60 mb-2">Material Order Form</p>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-black uppercase leading-[1.02] mb-4">Order Quarry Materials for Bermuda Delivery</h1>
          <p className="text-white/80 text-lg max-w-2xl">Place a material request with Island Quarry by sharing your quantity, truck size, and delivery details. The ICS team will confirm availability and scheduling.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="#order-form" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Start Your Order</a>
            <a href="tel:+14412933224" className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call 441-293-3224
            </a>
          </div>
        </div>
      </section>

      {/* Order form */}
      <section id="order-form" className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form card */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-[#e8edf5]">
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-1">Please Complete This Form</p>
              <h2 className="font-[var(--font-heading)] text-2xl font-black uppercase mb-2 text-[#102033]">Material Order Details</h2>
              <p className="text-[#4b5d73] text-sm mb-6">Build your order, submit it online, and start earning family loyalty points once completed.</p>

              <div className="bg-[#0d2a4a]/5 border border-[#0d2a4a]/15 rounded-xl p-4 mb-6 text-sm text-[#0d2a4a] font-semibold">
                Add each material and tonnage to the cart, then submit one combined order for the quarry team to confirm.
              </div>

              {/* Add-to-cart */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Label>
                  Material
                  <select value={material} onChange={(e) => setMaterial(e.target.value)} className={inputCls()}>
                    <option value="">Select material</option>
                    {MATERIALS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </Label>
                <Label>
                  Tonnage
                  <input type="number" min={0.5} step={0.5} placeholder="e.g. 10" value={tons} onChange={(e) => setTons(e.target.value)} className={inputCls()} />
                </Label>
                <Label>
                  Truck Size
                  <select value={truck} onChange={(e) => setTruck(e.target.value)} className={inputCls()}>
                    <option value="">Select truck size</option>
                    {TRUCKS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Label>
                <Label>
                  Item Notes (optional)
                  <input type="text" placeholder="Placement or handling notes" value={itemNotes} onChange={(e) => setItemNotes(e.target.value)} className={inputCls()} />
                </Label>
              </div>
              {addError && <p className="text-red-600 text-sm mb-3">{addError}</p>}
              <button type="button" onClick={addToCart} className="inline-flex items-center gap-2 border-2 border-[#0d2a4a] text-[#0d2a4a] font-bold px-5 py-2.5 rounded-full hover:-translate-y-px hover:shadow-md transition-all mb-8">
                <ShoppingCart size={16} /> Add to Cart
              </button>

              {/* Cart */}
              <div className="bg-[#f7f9fc] rounded-xl p-5 mb-8 border border-[#e8edf5]" aria-live="polite">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[var(--font-heading)] font-black text-base uppercase text-[#102033]">Virtual Cart</h3>
                  {cart.length > 0 && (
                    <button type="button" onClick={() => setCart([])} className="text-xs text-red-500 font-semibold hover:text-red-700 flex items-center gap-1">
                      <Trash2 size={12} /> Clear all
                    </button>
                  )}
                </div>
                {cart.length === 0 ? (
                  <p className="text-[#4b5d73] text-sm">No items added yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {cart.map((item, i) => (
                      <li key={i} className="flex items-start justify-between bg-white rounded-lg px-4 py-3 border border-[#e8edf5]">
                        <div>
                          <strong className="text-[#102033] font-semibold text-sm">{item.material}</strong>
                          <p className="text-[#4b5d73] text-xs mt-0.5">{item.tons} tons | {item.truck}{item.notes ? ` | ${item.notes}` : ""}</p>
                        </div>
                        <button type="button" onClick={() => removeItem(i)} className="text-[#4b5d73] hover:text-red-500 ml-3 mt-0.5">
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Contact & delivery */}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Label>
                  Name
                  <input type="text" name="name" placeholder="Full name" required className={inputCls()} />
                </Label>
                <Label>
                  Telephone
                  <input type="tel" name="telephone" placeholder="441-000-0000" required className={inputCls()} />
                </Label>
                <Label className="sm:col-span-2">
                  Email for Billing
                  <input type="email" name="billing-email" placeholder="accounts@example.com" required className={inputCls()} />
                </Label>
                <Label className="sm:col-span-2">
                  Delivery Address
                  <textarea name="delivery-address" rows={3} placeholder="Street, parish, site access details" required className={`${inputCls()} resize-none`} />
                </Label>
                <Label>
                  Preferred Delivery Date
                  <input type="date" name="delivery-date" className={inputCls()} />
                </Label>
                <Label>
                  Preferred Delivery Time
                  <select name="delivery-time" className={inputCls()}>
                    <option value="">Flexible</option>
                    <option>Morning (7am – 11am)</option>
                    <option>Midday (11am – 2pm)</option>
                    <option>Afternoon (2pm – 5pm)</option>
                  </select>
                </Label>
                <Label className="sm:col-span-2">
                  Suggestions / Notes
                  <textarea name="notes" rows={4} placeholder="Access instructions, placement notes, or anything else we should know" className={`${inputCls()} resize-none`} />
                </Label>
                <label className="sm:col-span-2 flex items-start gap-3 text-sm text-[#4b5d73] cursor-pointer">
                  <input type="checkbox" name="confirm-access" required className="mt-0.5 accent-[#f4bf00]" />
                  I confirm delivery access is suitable for the selected truck size.
                </label>
                {cart.length === 0 && <p className="sm:col-span-2 text-amber-600 text-sm font-semibold">Add at least one item to your cart before submitting.</p>}
                {submitError && <p className="sm:col-span-2 text-red-600 text-sm font-semibold">{submitError}</p>}
                {submitted && (
                  <div className="sm:col-span-2 bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-sm">
                    <p className="font-semibold">Order received. The quarry team will confirm availability and delivery timing.</p>
                    <p className="mt-1">Reference: {orderId}</p>
                    {orderTotal !== null && <p>Estimated subtotal: ${orderTotal.toFixed(2)}</p>}
                    <p className="mt-1">Sign in through My Account to track points, reminders, and family care updates.</p>
                  </div>
                )}
                <p className="sm:col-span-2 text-xs text-[#4b5d73]">Completed quarry orders can earn loyalty points in the shared ICS customer portal.</p>
                <button type="submit" disabled={cart.length === 0 || submitting} className="sm:col-span-2 bg-[#f4bf00] text-black font-bold py-3.5 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Submitting Order..." : "Submit Quarry Order"}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5">
              <article className="bg-white rounded-2xl p-6 border border-[#e8edf5] shadow-sm">
                <h3 className="font-[var(--font-heading)] font-black text-base uppercase mb-3 text-[#102033]">Need Help Choosing Materials?</h3>
                <p className="text-[#4b5d73] text-sm mb-4">Call the Island Quarry team for practical guidance on quantity and product selection.</p>
                <a href="tel:+14412933224" className="inline-flex items-center gap-2 bg-[#f4bf00] text-black font-bold px-5 py-2.5 rounded-full hover:shadow-[0_4px_14px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all text-sm">
                  <Phone size={14} /> Call 441-293-3224
                </a>
              </article>

              <article className="bg-white rounded-2xl p-6 border border-[#e8edf5] shadow-sm">
                <h3 className="font-[var(--font-heading)] font-black text-base uppercase mb-3 text-[#102033]">Quarry Contact</h3>
                <ul className="space-y-1.5 text-[#4b5d73] text-sm">
                  <li><strong className="text-[#102033]">Address:</strong> 9 Coney Island Road, Hamilton Parish</li>
                  <li><strong className="text-[#102033]">Phone:</strong> <a href="tel:+14412933224" className="text-[#0d2a4a] hover:text-[#f4bf00] transition-colors font-semibold">441-293-3224</a></li>
                  <li><strong className="text-[#102033]">Email:</strong> <a href="mailto:info@ics.bm" className="text-[#0d2a4a] hover:text-[#f4bf00] transition-colors font-semibold">info@ics.bm</a></li>
                  <li><strong className="text-[#102033]">Hours:</strong> Mon – Sat, 7am – 4pm</li>
                </ul>
              </article>

              <article className="bg-[#0d2a4a] rounded-2xl p-6 text-white">
                <h3 className="font-[var(--font-heading)] font-black text-base uppercase mb-3">Common Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.slice(0, 6).map((m) => (
                    <span key={m} className="bg-white/10 border border-white/15 text-white/85 text-xs font-semibold px-3 py-1 rounded-full">{m}</span>
                  ))}
                </div>
              </article>

              <article className="bg-[#fff6d6] rounded-2xl p-6 border border-[#f4bf00]/30 shadow-sm">
                <h3 className="font-[var(--font-heading)] font-black text-base uppercase mb-3 text-[#102033]">Customer Family Perks</h3>
                <p className="text-[#4b5d73] text-sm mb-4">Create a customer account to keep quarry orders, tire appointments, rewards, and yearly care reminders together in one warm service portal.</p>
                <Link href="/account" className="inline-flex items-center gap-2 bg-[#0d2a4a] text-white font-bold px-5 py-2.5 rounded-full hover:shadow-md transition-all text-sm">
                  Visit My Account
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
