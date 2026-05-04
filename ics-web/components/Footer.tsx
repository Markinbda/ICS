import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0d2a4a] text-white">
      <div className="max-w-[1180px] mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company info */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="bg-[#f4bf00] text-[#09101c] font-black text-lg rounded-lg px-2 py-1 leading-none">
              ICS
            </span>
            <span className="font-bold text-sm">Island Construction Services</span>
          </div>
          <ul className="space-y-2 text-white/75 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[#f4bf00]" />
              79 Middle Rd, Devonshire, DV 06, Bermuda
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="shrink-0 text-[#f4bf00]" />
              <a href="tel:+14412363011" className="hover:text-[#f4bf00] transition-colors">
                441-236-3011
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="shrink-0 text-[#f4bf00]" />
              <a href="mailto:info@ics.bm" className="hover:text-[#f4bf00] transition-colors">
                info@ics.bm
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-[#f4bf00]" />
              Mon – Sat: 7am – 7pm
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-[var(--font-heading)] font-bold text-base uppercase tracking-wide mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-white/75 text-sm">
            {[
              { label: "Services", href: "/#services" },
              { label: "Our Divisions", href: "/#divisions" },
              { label: "Fleet", href: "/fleet" },
              { label: "Materials Orders", href: "/orders" },
              { label: "Book Appointment", href: "/book" },
              { label: "About ICS", href: "/about" },
              { label: "Request a Quote", href: "/#quote" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#f4bf00] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h4 className="font-[var(--font-heading)] font-bold text-base uppercase tracking-wide mb-4">
            Need Urgent Support?
          </h4>
          <p className="text-white/75 text-sm mb-4">
            The ICS team is available Monday to Saturday. Call us directly for fast response.
          </p>
          <a
            href="tel:+14412363011"
            className="inline-flex items-center gap-2 bg-[#f4bf00] text-black font-bold px-5 py-2.5 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all"
          >
            <Phone size={14} /> Tap to Call ICS
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-white/40 text-xs">
        © {new Date().getFullYear()} Island Construction Services Ltd. All rights reserved.
      </div>
    </footer>
  );
}
