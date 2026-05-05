import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "ICS Tires | ICS Group",
  description: "ICS Tires supplies Bridgestone, Firestone, Goodyear, Interstate, and Kenda tires in Bermuda. Passenger, commercial, and fleet tire purchasing.",
};

export default function TiresDivisionPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[56vh] flex items-end pb-14 pt-24 text-white"
        style={{ backgroundImage: "linear-gradient(120deg,rgba(13,42,74,0.92),rgba(13,42,74,0.6)),url('/images/division-tires-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 w-full">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={14} /> Back to ICS Group
          </Link>
          <Image src="/images/logo-ics-tires.png" alt="ICS Tires" width={220} height={60} className="object-contain object-left h-14 w-auto mb-4" />
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-black uppercase leading-[1.02] mb-4">ICS Tires</h1>
          <p className="text-white/80 text-lg max-w-2xl">Over 20 years supplying quality tire brands to Bermuda. Passenger, commercial, and fleet tires from the world's most trusted names — with practical local service.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/#quote" className="border-2 border-white/50 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">Enquire About Tires</Link>
            <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> 441-236-3011
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
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-6 text-[#102033]">Quality tires. Local expertise. Over 20 years.</h2>
              <p className="text-[#4b5d73] mb-4 leading-relaxed">ICS Tires has been part of the Island Construction Services group for over two decades, supplying passenger, commercial, and heavy-duty tires to Bermuda residents and businesses.</p>
              <p className="text-[#4b5d73] leading-relaxed">We stock many of the top quality brands and can guide you to the right product for your vehicle, usage conditions, and budget. Whether you need a single replacement or fleet supply, the ICS Tires team is ready to help.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/#quote" className="border-2 border-[#0d2a4a] text-[#0d2a4a] font-bold px-6 py-3 rounded-full hover:-translate-y-px transition-all">Enquire Now</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "20+", label: "Years in operation" },
                { stat: "5+", label: "Major tire brands stocked" },
                { stat: "Passenger", label: "to commercial supply" },
                { stat: "Fleet", label: "purchasing support" },
              ].map((s) => (
                <div key={s.label} className="bg-[#f7f9fc] rounded-2xl p-6 border border-[#e8edf5] text-center">
                  <strong className="block font-[var(--font-heading)] text-3xl font-black text-[#0d2a4a]">{s.stat}</strong>
                  <span className="text-[#4b5d73] text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Brands We Stock</p>
          <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase mb-8 text-[#102033]">Trusted Names in Tires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Bridgestone", desc: "World's largest tire manufacturer. Renowned for longevity and performance in all conditions." },
              { name: "Firestone", desc: "Trusted North American brand with a wide range of passenger and commercial products." },
              { name: "Goodyear", desc: "Iconic brand covering passenger, light truck, and commercial categories." },
              { name: "Interstate", desc: "Value and performance tires for everyday passenger and utility vehicles." },
              { name: "Kenda", desc: "Practical range of passenger and specialty tires suited to island conditions." },
              { name: "Fleet Supply", desc: "Volume purchasing support for business fleets and commercial vehicle operators." },
            ].map((b) => (
              <article key={b.name} className="bg-white rounded-2xl p-6 border border-[#e8edf5] shadow-sm">
                <div className="w-10 h-1.5 bg-[#f4bf00] rounded mb-4" />
                <h3 className="font-[var(--font-heading)] text-lg font-black uppercase mb-2 text-[#102033]">{b.name}</h3>
                <p className="text-[#4b5d73] text-sm leading-relaxed">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>



      {/* Location */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Visit Us</p>
              <h2 className="font-[var(--font-heading)] text-3xl font-black uppercase mb-5 text-[#102033]">ICS Tires Location</h2>
              <ul className="space-y-2 text-[#4b5d73]">
                <li><strong className="text-[#102033]">Address:</strong> 79 Middle Rd, Devonshire, DV 06, Bermuda</li>
                <li><strong className="text-[#102033]">Phone:</strong> <a href="tel:+14412363011" className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">441-236-3011</a></li>
                <li><strong className="text-[#102033]">Email:</strong> <a href="mailto:info@ics.bm" className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">info@ics.bm</a></li>
                <li><strong className="text-[#102033]">Hours:</strong> Monday–Saturday, 7am–7pm</li>
              </ul>
            </div>
            <div className="bg-[#f7f9fc] rounded-2xl p-7 border border-[#e8edf5]">
              <p className="text-[#4b5d73] leading-relaxed">Come in and speak to the ICS Tires team about the right product for your vehicle. Bulk and fleet enquiries welcome — contact us for pricing. You can also book a service appointment online for tire replacement, repair, rotation, or balancing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d2a4a] text-white text-center">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-4">Need tires in Bermuda?</h2>
          <p className="text-white/75 mb-8">Enquire now and the ICS Tires team will confirm availability and arrange a time.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call ICS Tires
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
