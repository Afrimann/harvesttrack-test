"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="HarvestTrack home"
          >
            <div className="w-7 h-7 rounded-lg bg-[#2E9E52] flex items-center justify-center shrink-0 group-hover:bg-[#268547] transition-colors duration-200">
              <Leaf className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-extrabold tracking-tight text-gray-900">
              Harvest<span className="text-[#2E9E52]">Track</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-3.5 py-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors duration-200 group"
              >
                {link.name}
                {/* Underline slide-in on hover */}
                <span
                  className="absolute bottom-1.5 left-3.5 right-3.5 h-px bg-[#2E9E52] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/auth"
              className="px-3.5 py-2 text-sm text-gray-600 font-medium rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52] focus-visible:ring-offset-2"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2E9E52] text-white text-sm font-semibold rounded-lg
                         hover:bg-[#268547] hover:shadow-md hover:shadow-green-500/20
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52] focus-visible:ring-offset-2
                         transition-all duration-200"
            >
              Open dashboard
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52]"
          >
            {isOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu — AnimatePresence for smooth slide-down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="px-4 py-3 space-y-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2.5 text-sm text-gray-700 font-medium rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-gray-100 space-y-1.5">
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2.5 text-sm text-gray-700 font-medium rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#2E9E52] text-white text-sm font-semibold rounded-lg hover:bg-[#268547] transition-colors duration-200"
                >
                  Open dashboard
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
