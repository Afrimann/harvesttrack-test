"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type ContactMethod = "call" | "whatsapp" | "sms";

const CONTACT_METHODS: { id: ContactMethod; label: string }[] = [
  { id: "call", label: "Call" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "sms", label: "SMS" },
];

function SuccessScreen() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-[#f7fdf9] px-4">
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-16 h-16 rounded-full bg-[#2E9E52]/10 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-[#2E9E52]" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">You&apos;re connected!</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your evangelist will be in touch soon. God bless you.
        </p>
      </div>
    </div>
  );
}

export default function ContactCaptureForm() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("call");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [prayer, setPrayer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to /api/contacts
    setSubmitted(true);
  }

  if (submitted) return <SuccessScreen />;

  return (
    <div className="flex flex-col lg:flex-row">
      {/* ── Left panel — branding (desktop only, fixed) ───────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 lg:sticky lg:top-0 lg:h-svh relative flex-col justify-end p-12 overflow-hidden shrink-0"
        style={{
          backgroundImage: "url('/devotional_evangelism.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-black/65 via-black/40 to-[#2E9E52]/25 pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2E9E52]/20 backdrop-blur-md rounded-full border border-[#2E9E52]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#4ADE80] tracking-wide">HarvestTrack</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Connect with<br />your evangelist
          </h1>
          <p className="text-white/80 text-base font-medium leading-7 max-w-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            Fill in a few details and your evangelist will reach out to walk with
            you on your spiritual journey.
          </p>
        </div>
      </div>

      {/* ── Right panel — form (scrollable) ──────────────────────────────── */}
      <div
        className="flex-1 relative min-h-svh lg:min-h-0"
        style={{
          backgroundImage: "url('/homebg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Fade nature bg into white as the form starts */}
        <div
          className="absolute inset-0 bg-linear-to-b from-transparent via-white/88 to-white pointer-events-none lg:bg-white/95 lg:from-white/95 lg:via-white/95 lg:to-white/95"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center justify-center px-5 py-10 lg:px-12 lg:py-16">
          <div className="w-full max-w-md space-y-7">
            {/* Heading */}
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-gray-900">Let&apos;s Connect</h2>
              <p className="text-sm text-gray-500">
                Fill in a few details — takes less than 5 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-semibold text-[#2E9E52]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#2E9E52]/35 focus:border-[#2E9E52] transition-all duration-150"
                />
                <p className="text-xs text-gray-400">Please enter your full name</p>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-semibold text-[#2E9E52]">
                  Contact detail
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#2E9E52]/35 focus:border-[#2E9E52] transition-all duration-150"
                />
                <p className="text-xs text-gray-400">+234 90 XXX XXXX</p>
              </div>

              {/* Contact method */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#2E9E52]">Preferred contact method</p>
                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Preferred contact method">
                  {CONTACT_METHODS.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={contactMethod === id}
                      onClick={() => setContactMethod(id)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                        ${contactMethod === id
                          ? "bg-[#2E9E52] text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prayer request */}
              <div className="space-y-1.5">
                <label htmlFor="prayer" className="block text-sm font-semibold text-[#2E9E52]">
                  Prayer request
                </label>
                <textarea
                  id="prayer"
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  rows={3}
                  placeholder="Share a prayer request (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-sm resize-none
                             focus:outline-none focus:ring-2 focus:ring-[#2E9E52]/35 focus:border-[#2E9E52] transition-all duration-150"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2E9E52] text-white font-semibold text-sm
                           hover:bg-[#268547] hover:shadow-lg hover:shadow-green-500/25
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52] focus-visible:ring-offset-2
                           transition-all duration-200"
              >
                Continue
              </button>

              <p className="text-xs text-center text-gray-400 leading-relaxed">
                By submitting you agree that your evangelist may contact you for follow-up.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
