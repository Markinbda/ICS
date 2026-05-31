import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Island Quarry | ICS Group",
  description: "Bermuda's only hard-rock quarry. Sand, screenings, 5/8 rock, gabion rock, soil, and boulders — island-wide delivery or pickup.",
};

export default function QuarryDivisionPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[56vh] flex items-end pb-14 pt-24 text-white"
        style={{ backgroundImage: "linear-gradient(120deg,rgba(13,42,74,0.82),rgba(13,42,74,0.5)),url('/images/quarry.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 w-full">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={14} /> Back to ICS Group
          </Link>
          <Image src="/images/logo-island-quarry.png" alt="Island Quarry" width={220} height={60} className="object-contain object-left h-14 w-auto mb-4" />
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-black uppercase leading-[1.02] mb-4">Island Quarry Ltd.</h1>
          <p className="text-white/80 text-lg max-w-2xl">Bermuda's only hard-rock quarry, operating since 1991. Sand, screenings, rock, soil, and boulders — supplied island-wide.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/orders" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Order Materials</Link>
            <a href="tel:+14412933224" className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call Quarry 441-293-3224
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">About This Division</p>
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-6 text-[#102033]">Bermuda&apos;s only hard-rock quarry since 1991</h2>
              <p className="text-[#4b5d73] mb-4 leading-relaxed">Island Quarry Ltd. operates from Coney Island Road, Hamilton Parish and is the island's only source of locally produced hard-rock aggregate. From construction fill to specialist stone products, Island Quarry supplies builders, contractors, and homeowners across Bermuda.</p>
              <p className="text-[#4b5d73] leading-relaxed">Whether you need sand for a small residential job or gabion rock for a major coastal project, the Island Quarry team will help you select the right product and arrange bulk delivery or customer pickup.</p>
              <Link href="/orders" className="inline-block mt-6 bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Order Materials Online</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "1991", label: "Year established" },
                { stat: "Only", label: "Hard-rock quarry in Bermuda" },
                { stat: "Island-wide", label: "Delivery coverage" },
                { stat: "6", label: "Aggregate product types" },
              ].map((s) => (
                <div key={s.stat} className="bg-[#f7f9fc] rounded-2xl p-6 border border-[#e8edf5] text-center">
                  <strong className="block font-[var(--font-heading)] text-3xl font-black text-[#0d2a4a]">{s.stat}</strong>
                  <span className="text-[#4b5d73] text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Materials Available</p>
          <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase mb-8 text-[#102033]">Aggregate Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Sand","Screenings","5/8 Rock","Gabion Rock","Soil","Boulders"].map((mat) => (
              <div key={mat} className="bg-white rounded-2xl p-5 border border-[#e8edf5] shadow-sm text-center">
                <div className="w-10 h-10 rounded-full bg-[#0d2a4a]/10 flex items-center justify-center mx-auto mb-3">
                  <span className="w-3 h-3 rounded-full bg-[#f4bf00]" />
                </div>
                <span className="font-[var(--font-heading)] font-black text-sm uppercase text-[#102033]">{mat}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/orders" className="inline-flex items-center gap-2 bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">
              Place a Material Order →
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Quarry Location</p>
              <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase mb-5 text-[#102033]">Find Island Quarry</h2>
              <ul className="space-y-2 text-[#4b5d73]">
                <li><strong className="text-[#102033]">Address:</strong> 9 Coney Island Road, Hamilton Parish, Bermuda</li>
                <li><strong className="text-[#102033]">Phone:</strong> <a href="tel:+14412933224" className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">441-293-3224</a></li>
                <li><strong className="text-[#102033]">Email:</strong> <a href="mailto:info@ics.bm" className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">info@ics.bm</a></li>
                <li><strong className="text-[#102033]">Hours:</strong> Monday–Saturday, 7am–4pm</li>
              </ul>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/orders" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Order Online</Link>
                <a href="tel:+14412933224" className="inline-flex items-center gap-2 border-2 border-[#0d2a4a] text-[#0d2a4a] font-bold px-6 py-3 rounded-full hover:-translate-y-px transition-all">
                  <Phone size={16} /> Call Quarry
                </a>
              </div>
            </div>
            <div className="bg-[#f7f9fc] rounded-2xl overflow-hidden border border-[#e8edf5]">
              <Image src="/images/ics-quarry-banner.jpg" alt="Island Quarry operations" width={600} height={300} className="w-full object-cover h-64" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d2a4a] text-white text-center">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-4">Need aggregate materials in Bermuda?</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">Order online or call the Island Quarry team to confirm availability and delivery scheduling.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/orders" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Order Materials</Link>
            <a href="tel:+14412933224" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call Quarry
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
