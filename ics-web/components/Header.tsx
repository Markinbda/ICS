"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Our Divisions", href: "/#divisions" },
  { label: "Services", href: "/#services" },
  { label: "Fleet", href: "/fleet" },
  { label: "Orders", href: "/orders" },
  { label: "Book Appointment", href: "/book" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
  { label: "My Account", href: "/account" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/16 backdrop-blur-md bg-[#0d2a4a]/90">
      <div className="max-w-[1180px] mx-auto px-4 flex items-center justify-between gap-4 min-h-[74px]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="bg-[#f4bf00] text-[#09101c] font-[var(--font-heading)] font-black text-lg rounded-lg px-2 py-1 leading-none tracking-tight">
            ICS
          </span>
          <span className="text-white font-bold text-sm hidden sm:block">
            Island Construction Services
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5" aria-label="Main navigation">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                l.label === "My Account"
                  ? "bg-[#f4bf00] text-black no-underline font-bold text-sm px-4 py-2 rounded-full hover:shadow-[0_8px_22px_rgba(244,191,0,0.35)] hover:-translate-y-px transition-all"
                  : "text-white/90 no-underline font-semibold text-sm hover:text-[#f4bf00] transition-colors"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+14412363011"
            className="text-white/90 font-semibold text-sm hover:text-[#f4bf00] transition-colors flex items-center gap-1.5"
          >
            <Phone size={14} /> 441-236-3011
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0d2a4a] border-t border-white/10 px-4 pb-6">
          <nav className="flex flex-col gap-1 pt-4" aria-label="Mobile navigation">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  l.label === "My Account"
                    ? "mt-2 bg-[#f4bf00] text-black font-bold text-sm px-4 py-2.5 rounded-full text-center"
                    : "text-white/90 font-semibold py-2 border-b border-white/10 hover:text-[#f4bf00] transition-colors"
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-5">
            <a
              href="tel:+14412363011"
              className="text-white font-semibold flex items-center gap-2"
            >
              <Phone size={16} /> Call 441-236-3011
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
