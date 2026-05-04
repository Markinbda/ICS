import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Island Construction Services Division | ICS Group",
  description: "Bermuda's leading heavy-services operator since 1961. Excavation, demolition, cranes, haulage, and specialist services.",
};

export default function ConstructionDivisionPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[56vh] flex items-end pb-14 pt-24 text-white"
        style={{ backgroundImage: "linear-gradient(120deg,rgba(13,42,74,0.92),rgba(13,42,74,0.6)),url('/images/division-construction-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 w-full">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={14} /> Back to ICS Group
          </Link>
          <Image src="/images/logo-ics-construction.png" alt="Island Construction Services" width={220} height={60} className="object-contain object-left h-14 w-auto mb-4" />
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-black uppercase leading-[1.02] mb-4">Island Construction Services</h1>
          <p className="text-white/80 text-lg max-w-2xl">Bermuda's leading heavy-services operator since 1961. Excavation, demolition, cranes, haulage, trenching, asbestos abatement, landscaping, and project management.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/#quote" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Request a Quote</Link>
            <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call 441-236-3011
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
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-6 text-[#102033]">Heavy services built for Bermuda since 1961</h2>
              <p className="text-[#4b5d73] mb-4 leading-relaxed">Island Construction Services is the core operating division of the ICS Group, delivering excavation, demolition, crane services, and haulage across residential, commercial, and government projects island-wide.</p>
              <p className="text-[#4b5d73] leading-relaxed">Beginning modestly with only a payloader, compressor, and one jeep, ICS grew into one of Bermuda's largest excavating, landscaping, and container haulage companies with a fleet of over 50 pieces of heavy machinery.</p>
              <Link href="/#quote" className="inline-block mt-6 bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Request a Quote</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "1961", label: "Year established" },
                { stat: "50+", label: "Pieces of heavy machinery" },
                { stat: "Island-wide", label: "Coverage" },
                { stat: "100%", label: "Bermudian staffed" },
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

      {/* Services */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">What We Do</p>
          <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase mb-8 text-[#102033]">Our Service Range</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Excavation & Site Preparation", desc: "Site clearing, excavation, and groundwork for all residential and commercial scales." },
              { title: "Demolition Support", desc: "Controlled demolition and debris clearance with proper safety protocols." },
              { title: "Crane & Lifting Services", desc: "Mobile crane operations with experienced certified operators." },
              { title: "Container & Haulage", desc: "Container movement and material transport across Bermuda." },
              { title: "Trenching", desc: "Utility trenching and foundation work for infrastructure projects." },
              { title: "Asbestos Abatement", desc: "Licensed asbestos removal and disposal with full compliance documentation." },
              { title: "Mould Removal", desc: "Specialist mould remediation for residential and commercial properties." },
              { title: "Landscaping", desc: "Tree transplanting, grading, and landscape restoration services." },
              { title: "Project Management", desc: "End-to-end coordination from site assessment through completion." },
            ].map((s) => (
              <article key={s.title} className="bg-white rounded-2xl p-6 border border-[#e8edf5] shadow-sm">
                <h3 className="font-[var(--font-heading)] text-base font-black uppercase mb-2 text-[#102033]">{s.title}</h3>
                <p className="text-[#4b5d73] text-sm leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Visit Us</p>
              <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase mb-5 text-[#102033]">ICS Location</h2>
              <ul className="space-y-2 text-[#4b5d73]">
                <li><strong className="text-[#102033]">Address:</strong> 79 Middle Rd, Devonshire, DV 06, Bermuda</li>
                <li><strong className="text-[#102033]">Phone:</strong> <a href="tel:+14412363011" className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">441-236-3011</a></li>
                <li><strong className="text-[#102033]">Email:</strong> <a href="mailto:info@ics.bm" className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">info@ics.bm</a></li>
                <li><strong className="text-[#102033]">Hours:</strong> Monday–Saturday, 7am–7pm</li>
              </ul>
              <Link href="/#quote" className="inline-block mt-6 bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Enquire Now</Link>
            </div>
            <div className="bg-[#f7f9fc] rounded-2xl p-7 border border-[#e8edf5]">
              <p className="text-[#4b5d73] leading-relaxed">Come in and speak to the ICS team about your excavation, crane, haulage, or specialist service need. All project sizes are welcome — the ICS team will assess your requirements and provide a practical, competitive quote.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d2a4a] text-white text-center">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-4">Ready to start your project?</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">Enquire now and the Island Construction Services team will confirm availability and arrange a time.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/#quote" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">Request a Quote</Link>
            <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call ICS
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
