import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Fleet and Equipment | ICS Bermuda",
  description: "Explore the ICS fleet and equipment capability across construction, quarry operations, and material delivery in Bermuda.",
};

export default function FleetPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[52vh] flex items-end pb-14 pt-24 text-white"
        style={{ backgroundImage: "linear-gradient(120deg,rgba(13,42,74,0.92),rgba(13,42,74,0.6)),url('/images/ics-fleet-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 w-full">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={14} /> Back to homepage
          </Link>
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-white/60 mb-2">Fleet and Equipment</p>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-black uppercase leading-[1.02] mb-4">
            Fleet and Equipment Built for Bermuda
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Explore the people, equipment, and operating capability that support ICS projects across Bermuda every day.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/#quote" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">
              Request a Quote
            </Link>
            <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call ICS
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Fleet Gallery</p>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-3 text-[#102033]">Equipment and Operations in Action</h2>
            <p className="text-[#4b5d73] max-w-xl">A snapshot of ICS capability across construction, quarry supply, and fleet support services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="md:col-span-2 bg-[#f7f9fc] rounded-2xl overflow-hidden border border-[#e8edf5]">
              <div className="relative h-64 md:h-72">
                <Image src="/images/fleet-panel-excavation.jpg" alt="Construction workers and steel reinforcement on an active site" fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-1">Construction</p>
                <h3 className="font-[var(--font-heading)] text-xl font-black uppercase mb-2 text-[#102033]">Excavation and Site Equipment</h3>
                <p className="text-[#4b5d73] text-sm">ICS field equipment supporting coastal, civil, and general construction operations in Bermuda.</p>
              </div>
            </article>
            <div className="flex flex-col gap-5">
              {[
                { img: "/images/quarry.png", label: "Quarry", title: "Aggregate Supply Operations", desc: "Quarry production and material handling capability supporting island-wide supply." },
                { img: "/images/ics-tires-banner.jpg", label: "Support Division", title: "Fleet Support and Tire Supply", desc: "ICS Tires as part of the wider operating group." },
              ].map((card) => (
                <article key={card.title} className="bg-[#f7f9fc] rounded-2xl overflow-hidden border border-[#e8edf5] flex-1">
                  <div className="relative h-36">
                    <Image src={card.img} alt={card.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-1">{card.label}</p>
                    <h3 className="font-[var(--font-heading)] text-base font-black uppercase mb-1 text-[#102033]">{card.title}</h3>
                    <p className="text-[#4b5d73] text-xs">{card.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capability */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Capability Snapshot</p>
            <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase text-[#102033]">What the Fleet Supports</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Cranes and Lifting", desc: "Mobile crane support for structural, mechanical, marine-adjacent, and commercial works." },
              { title: "Excavation and Trenching", desc: "Site prep, trenching, demolition support, and excavation across residential to infrastructure-scale jobs." },
              { title: "Haulage and Delivery", desc: "Container movement, material transport, and island-wide logistics coordination." },
            ].map((c) => (
              <article key={c.title} className="bg-white rounded-2xl p-7 border border-[#e8edf5] shadow-sm">
                <div className="w-10 h-1.5 bg-[#f4bf00] rounded mb-4" />
                <h3 className="font-[var(--font-heading)] text-lg font-black uppercase mb-2 text-[#102033]">{c.title}</h3>
                <p className="text-[#4b5d73] text-sm leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d2a4a] text-white text-center">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-4">Need equipment-backed support for your next job?</h2>
          <p className="text-white/75 mb-8">Tell ICS what the project requires and we will route you to the right team quickly.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/#quote" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Request a Quote</Link>
            <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call 441-236-3011
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
