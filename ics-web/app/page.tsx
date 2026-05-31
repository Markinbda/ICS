import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[1.5px] text-blue-300/80 mb-2">
      {children}
    </p>
  );
}

function SectionHead({
  eyebrow,
  title,
  body,
  light,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10">
      <p className={`text-xs font-bold uppercase tracking-[1.5px] mb-2 ${light ? "text-white/60" : "text-[#4b5d73]"}`}>
        {eyebrow}
      </p>
      <h2 className={`font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-3 ${light ? "text-white" : "text-[#102033]"}`}>
        {title}
      </h2>
      {body && (
        <p className={`text-base max-w-xl ${light ? "text-white/75" : "text-[#4b5d73]"}`}>{body}</p>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[72vh] flex items-end pb-14 pt-24 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg,rgba(13,42,74,0.94),rgba(13,42,74,0.7)),url('/images/hero-excavation.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#07152660] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 w-full">
          <Eyebrow>Serving Bermuda Since 1961</Eyebrow>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.02] mb-4 max-w-3xl">
            Bermuda&apos;s Heavy-Industry Partner for Over 60 Years
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-2xl mb-6">
            Three specialist divisions — Island Construction Services, Island Quarry, and ICS Tires — delivering excavation, crane operations, haulage, quarry aggregates, and specialist services under one experienced Bermudian team.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/#quote" className="bg-[#f4bf00] text-black font-bold px-6 py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">
              Request a Quote
            </Link>
            <Link href="/#services" className="border-2 border-white/40 text-white font-bold px-6 py-3 rounded-full hover:border-white transition-all">
              Our Services
            </Link>
          </div>
          <ul className="grid grid-cols-3 gap-3 max-w-lg list-none p-0 m-0">
            {[
              { stat: "1961", label: "Established" },
              { stat: "60+", label: "Years in operation" },
              { stat: "Island-wide", label: "Residential, commercial, government" },
            ].map((s) => (
              <li key={s.stat} className="bg-white/10 border border-white/20 rounded-2xl p-3">
                <strong className="block text-xl font-[var(--font-heading)] font-black">{s.stat}</strong>
                <span className="text-xs text-white/70">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Divisions */}
      <section id="divisions" className="bg-[#0d2a4a] py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <SectionHead eyebrow="Three Divisions. One Trusted Group." title="The ICS Group of Companies" body="ICS operates three specialist businesses covering construction services, quarry supply, and tire sales across Bermuda." light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                href: "/divisions/construction",
                logo: "/images/logo-ics-construction.png",
                alt: "Island Construction Services",
                name: "Island Construction Services",
                desc: "Bermuda's leading heavy-services operator since 1961. Excavation, demolition, cranes, haulage, trenching, asbestos abatement, landscaping, and project management.",
                items: ["Excavation & site preparation","Crane & heavy equipment","Container & haulage","Environmental & specialist"],
              },
              {
                href: "/divisions/quarry",
                logo: "/images/logo-island-quarry.png",
                alt: "Island Quarry",
                name: "Island Quarry Ltd.",
                desc: "Bermuda's only hard-rock quarry, operating since 1991 from Coney Island Road, Hamilton Parish. Supplying aggregate materials island-wide.",
                items: ["Sand & screenings","5/8 rock & gabion rock","Soil & boulders","Bulk delivery or pickup"],
              },
              {
                href: "/divisions/tires",
                logo: "/images/logo-ics-tires.png",
                alt: "ICS Tires",
                name: "ICS Tires",
                desc: "Over 20 years supplying quality tire brands to Bermuda. Passenger, commercial, and fleet tires from trusted names.",
                items: ["Bridgestone & Firestone","Goodyear & Interstate","Kenda & more","Fleet purchasing support"],
              },
            ].map((d) => (
              <Link key={d.href} href={d.href} className="border border-white/12 rounded-2xl p-6 flex flex-col gap-3 bg-[#0d2a4a] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:brightness-110 transition-all no-underline text-white group">
                <Image src={d.logo} alt={d.alt} width={200} height={56} className="object-contain object-left h-14 w-auto" />
                <h3 className="font-[var(--font-heading)] text-xl font-black uppercase">{d.name}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{d.desc}</p>
                <ul className="text-white/65 text-sm space-y-1 list-none p-0 m-0">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f4bf00] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 bg-[#f4bf00] text-black font-bold text-sm px-4 py-2 rounded-full self-start group-hover:shadow-[0_4px_14px_rgba(244,191,0,0.35)] transition-all">
                  View Division <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <SectionHead eyebrow="Core Services" title="Everything required to move projects forward" body="Choose a service area to connect with the right ICS team quickly." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Construction and Excavation", desc: "Site prep, trenching, demolition support, and groundwork for all project scales.", href: "/#quote", cta: "Request service" },
              { title: "Crane and Heavy Equipment", desc: "Safe lifting operations with experienced operators and reliable equipment access.", href: "/#quote", cta: "Request service" },
              { title: "Container and Haulage", desc: "Efficient transport logistics for materials, equipment, and container movement.", href: "/#quote", cta: "Request service" },
              { title: "Aggregates and Quarry", desc: "Sand, screenings, 5/8 rock, soil, and associated aggregate products island-wide.", href: "/orders", cta: "Order materials" },
              { title: "ICS Tires", desc: "Commercial and heavy-duty tire sales from trusted brands with local support.", href: "/divisions/tires", cta: "Learn more" },
              { title: "Environmental and Specialist", desc: "Asbestos abatement, mould removal, and specialist site services with compliance focus.", href: "/#quote", cta: "Request service" },
            ].map((s) => (
              <article key={s.title} className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8edf5] hover:shadow-md hover:-translate-y-px transition-all">
                <h3 className="font-[var(--font-heading)] text-lg font-black uppercase mb-2 text-[#102033]">{s.title}</h3>
                <p className="text-[#4b5d73] text-sm mb-4 leading-relaxed">{s.desc}</p>
                <Link href={s.href} className="text-[#0d2a4a] font-semibold text-sm hover:text-[#f4bf00] transition-colors">
                  {s.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet teaser */}
      <section id="fleet" className="py-20">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#4b5d73] mb-2">Fleet and Capability</p>
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-4 text-[#102033]">
                Built to handle Bermuda&apos;s toughest site conditions
              </h2>
              <p className="text-[#4b5d73] mb-6">Our cranes, trucks, excavation machinery, and specialist equipment are deployed across civil, commercial, and residential work daily.</p>
              <Link href="/fleet" className="inline-flex items-center gap-2 border-2 border-[#0d2a4a] text-[#0d2a4a] font-bold px-6 py-3 rounded-full hover:-translate-y-px hover:shadow-md transition-all">
                View fleet details <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-3">
              {[
                { img: "/images/division-construction-hero.jpg", label: "Cranes & Lifting", desc: "Mobile cranes and experienced operators" },
                { img: "/images/fleet-panel-haulage.jpg", label: "Haulage", desc: "Container and heavy-load transport" },
                { img: "/images/fleet-panel-cranes.jpg", label: "Excavation", desc: "Site prep, trenching, demolition" },
              ].map((p) => (
                <div key={p.label} className="relative rounded-xl overflow-hidden h-28" style={{ backgroundImage: `linear-gradient(90deg,rgba(13,42,74,0.8),rgba(13,42,74,0.3)),url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="absolute inset-0 flex items-center px-5">
                    <div>
                      <p className="font-[var(--font-heading)] font-black text-white text-lg uppercase leading-none">{p.label}</p>
                      <p className="text-white/75 text-xs mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-[#f7f9fc]">
        <div className="max-w-[1180px] mx-auto px-4">
          <SectionHead eyebrow="Selected Work" title="Project Highlights" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Commercial Site Preparation", desc: "End-to-end excavation and haulage coordination to meet a compressed timeline." },
              { title: "Government Infrastructure Support", desc: "Heavy equipment deployment and material logistics with strict safety standards." },
              { title: "Residential Development Enablement", desc: "Trenching, aggregate delivery, and staged support through critical build phases." },
            ].map((p) => (
              <article key={p.title} className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8edf5]">
                <div className="w-10 h-1.5 bg-[#f4bf00] rounded mb-4" />
                <h3 className="font-[var(--font-heading)] text-lg font-black uppercase mb-2 text-[#102033]">{p.title}</h3>
                <p className="text-[#4b5d73] text-sm leading-relaxed">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="py-20 bg-[#0d2a4a] text-white">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Eyebrow>Request a Quote</Eyebrow>
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-black uppercase mb-4">
                Looking for more information? No matter what the service, we have the answers.
              </h2>
              <p className="text-white/75 mb-6">Submit your details and we will route your enquiry to the relevant ICS division.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+14412363011" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-5 py-2.5 rounded-full hover:border-[#f4bf00] hover:text-[#f4bf00] transition-all">
                  <Phone size={16} /> Call 441-236-3011
                </a>
              </div>
            </div>
            <form className="bg-white/5 border border-white/15 rounded-2xl p-7 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Request a quote form">
              <label className="flex flex-col gap-1.5 text-sm font-semibold col-span-2">
                Service Required
                <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white font-normal focus:outline-none focus:border-[#f4bf00]">
                  {["Construction and Excavation","Crane and Heavy Equipment","Container and Haulage","Aggregates and Quarry","ICS Tires","Environmental and Specialist"].map(o => <option key={o} className="text-black">{o}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Name
                <input type="text" placeholder="Full name" required className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 font-normal focus:outline-none focus:border-[#f4bf00]" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Phone
                <input type="tel" placeholder="441-000-0000" required className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 font-normal focus:outline-none focus:border-[#f4bf00]" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold col-span-2">
                Email
                <input type="email" placeholder="you@example.com" required className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 font-normal focus:outline-none focus:border-[#f4bf00]" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold col-span-2">
                Scope details
                <textarea rows={4} placeholder="Tell us how we can help..." className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 font-normal focus:outline-none focus:border-[#f4bf00] resize-none" />
              </label>
              <button type="submit" className="col-span-2 bg-[#f4bf00] text-black font-bold py-3 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

