import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "About ICS | Island Construction Services Bermuda",
  description: "Learn about Island Construction Services, its history, leadership, locations, and community involvement across Bermuda.",
};

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">{eyebrow}</p>
      <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-3 text-[#102033]">{title}</h2>
      {body && <p className="text-[#4b5d73] max-w-xl">{body}</p>}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[52vh] flex items-end pb-14 pt-24 text-white"
        style={{ backgroundImage: "linear-gradient(120deg,rgba(13,42,74,0.92),rgba(13,42,74,0.65)),url('/images/ics-staff.jpg')", backgroundSize: "cover", backgroundPosition: "center top" }}
      >
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 w-full">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors">
            <ArrowLeft size={14} /> Back to homepage
          </Link>
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-white/60 mb-2">About ICS</p>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-black uppercase leading-[1.02] mb-4 max-w-2xl">
            Built in Bermuda. Trusted for Generations.
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Island Construction Services has grown from a specialist excavation business into a multi-division Bermudian heavy-services company supporting residential, commercial, and government work across the island.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Company History</p>
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-6 text-[#102033]">From excavation roots to island-wide capability</h2>
              <div className="space-y-4 text-[#4b5d73] leading-relaxed">
                <p>Island Construction has been in business since 1961. Since then ICS has diversified into a multi-operational company. For whatever the need Island Construction almost certainly can provide it. There is no job too big or small for Island Construction to tackle and complete.</p>
                <p>With the opening of Island Quarry in 1991, the business expanded its ability to provide a full range of stone, sand, soil, and boulders. Beginning modestly with only a payloader, compressor, and one jeep, Island Construction grew into one of Bermuda's largest excavating, landscaping, and container haulage companies with a rental fleet of over 50 pieces of heavy machinery.</p>
                <p>Island Construction Services Ltd. (ICS) began its business specializing in excavation, demolition, and landscaping. Over the years ICS has become the island's leader in trenching, asbestos abatement, mould removal, crane services, container haulage, trucking, tree transplanting, aggregate supplies, project management and development.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/ics-staff.jpg" alt="ICS team" width={600} height={400} className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <SectionHead eyebrow="Leadership" title="ICS Management Team" body="Leadership at ICS combines long-standing family involvement with practical operational experience across the business." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Zane DeSilva", role: "President & CEO" },
              { name: "Allan DeSilva", role: "Senior Vice President" },
              { name: "Stephen Moniz", role: "Vice President" },
              { name: "Joanne DeSilva", role: "Senior Administration Officer" },
              { name: "Michael DeSilva", role: "Trenching and Asbestos Abatement" },
              { name: "Zane DeSilva Jr.", role: "Administration Officer" },
              { name: "Blake DeSilva", role: "Operations" },
              { name: "Barbara Phillips", role: "Administration" },
            ].map((l) => (
              <article key={l.name} className="bg-white rounded-2xl p-5 border border-[#e8edf5] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#0d2a4a] flex items-center justify-center text-white font-[var(--font-heading)] font-black text-base mb-3">
                  {l.name.charAt(0)}
                </div>
                <h3 className="font-[var(--font-heading)] font-black text-base uppercase text-[#102033]">{l.name}</h3>
                <p className="text-[#4b5d73] text-sm mt-1">{l.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <SectionHead eyebrow="Where We Are" title="Operating across Bermuda" body="ICS operates from Devonshire, with quarry operations in Hamilton Parish." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Island Construction Services", addr: "79 Middle Rd, Devonshire, DV 06, Bermuda", phone: "+14412363011", display: "441-236-3011", hours: "Mon – Sat: 7am – 7pm. Closed on public holidays." },
              { name: "Island Quarry Ltd.", addr: "9 Coney Island Road, Hamilton Parish, Bermuda", phone: "+14412933224", display: "441-293-3224", hours: "Mon – Sat: 7am – 4pm." },
            ].map((loc) => (
              <article key={loc.name} className="bg-white rounded-2xl p-7 border border-[#e8edf5] shadow-sm">
                <div className="w-10 h-1.5 bg-[#f4bf00] rounded mb-4" />
                <h3 className="font-[var(--font-heading)] font-black text-xl uppercase mb-3 text-[#102033]">{loc.name}</h3>
                <ul className="space-y-1.5 text-[#4b5d73] text-sm">
                  <li>{loc.addr}</li>
                  <li><a href={`tel:${loc.phone}`} className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">{loc.display}</a></li>
                  <li><a href="mailto:info@ics.bm" className="text-[#0d2a4a] font-semibold hover:text-[#f4bf00] transition-colors">info@ics.bm</a></li>
                  <li>{loc.hours}</li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <SectionHead eyebrow="In The Community" title="Supporting Bermuda beyond the job site" body="ICS has long supported local organisations, events, and community initiatives." />
          <div className="bg-white rounded-2xl p-8 border border-[#e8edf5] shadow-sm max-w-2xl">
            <ul className="space-y-3 text-[#4b5d73]">
              {[
                "Christmas Parade every year",
                "Worked with Keep Bermuda Beautiful on numerous occasions",
                "Helped Vernon Temple by clearing the back lot",
                "Supported the Maritime Museum on numerous occasions",
                "Supported various sports clubs including Rangers, St. David's Cricket Club, and Bermuda Athletic Association",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4bf00] mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d2a4a] text-white text-center">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-4">Need a partner with proven local experience?</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">Talk to the ICS team about your next project, material requirement, or specialist service need.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/#quote" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">
              Request a Quote
            </Link>
            <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
              <Phone size={16} /> Call 441-236-3011
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
