"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ClipboardList, QrCode, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Content data ─────────────────────────────────────────────────────────────

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconBackground: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Evangelist shares QR",
    description:
      "On a phone screen, a sticker, or a printed flyer at a crusade. Each missionary has their own code so credit is attributed automatically.",
    icon: QrCode,
    color: "#2E9E52",
    iconBackground: "#2E9E52",
  },
  {
    number: "02",
    title: "Prospect fills the form",
    description:
      "Name, phone, optional preferences and a prayer request — under 30 seconds, mobile-first, no typing on the field required.",
    icon: ClipboardList,
    color: "#10B981",
    iconBackground: "#10B981",
  },
  {
    number: "03",
    title: "Missionary follows up",
    description:
      "Tasks are scheduled at 1, 3, and 7 days automatically. The pipeline tracks the journey from first hello to Sunday service.",
    icon: Users,
    color: "#F59E0B",
    iconBackground: "#F59E0B",
  },
  {
    number: "04",
    title: "Disciple joins the church",
    description:
      "When a contact crosses into the Joined Church stage, your whole team sees the harvest grow in real time.",
    icon: Sparkles,
    color: "#EC4899",
    iconBackground: "linear-gradient(135deg, #EC4899 0%, #9333EA 100%)",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // 0 → target top hits viewport top  |  1 → target bottom hits viewport bottom
    offset: ["start start", "end end"],
  });

  /*
   * Map scroll progress to a step index.
   * The 400vh container gives each of the 4 steps ~75vh of scroll range before
   * the next step activates, which feels neither rushed nor sluggish.
   */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(STEPS.length - 1, Math.floor(latest * STEPS.length));
    setActiveStep(next);
  }); 

  const step = STEPS[activeStep];
  const Icon = step.icon;

  return (
    <section id="how-it-works">
      <div ref={containerRef} className="relative h-[400vh]">
        <MotionConfig reducedMotion="user">
          <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden flex flex-col bg-linear-to-br from-green-50/70 via-white to-green-50/30">
            {/* ── Section header ──────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
              <div className="flex items-end justify-between gap-6">
                {/* Badge + heading */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-green-200 bg-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E9E52]" aria-hidden="true" />
                    <span className="text-xs font-bold text-[#2E9E52] uppercase tracking-widest">
                      How it works
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-bold text-gray-900 leading-tight">
                    From scan to Sunday —{" "}
                    <span className="text-gray-400 font-medium">in four steps</span>
                  </h2>
                </div>

                {/* Animated progress dashes */}
                <div
                  className="hidden sm:flex items-center gap-2 shrink-0 pb-1"
                  aria-label={`Step ${activeStep + 1} of ${STEPS.length}`}
                  role="progressbar"
                  aria-valuenow={activeStep + 1}
                  aria-valuemin={1}
                  aria-valuemax={STEPS.length}
                >
                  {STEPS.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 rounded-full"
                      animate={{
                        width: i === activeStep ? 40 : 28,
                        backgroundColor: i <= activeStep ? "#2E9E52" : "#E5E7EB",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200/60" />
            </div>

            {/* ── Step content ─────────────────────────────────────────────── */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 items-center py-6 sm:py-8 lg:py-10 overflow-hidden">

              {/* Icon card — mobile: top (smaller), desktop: right column */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${activeStep}`}
                  className="lg:order-2 flex justify-center mb-4 sm:mb-6 lg:mb-0"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  aria-hidden="true"
                >
                  <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-[2rem] bg-white shadow-2xl shadow-gray-300/40 flex items-center justify-center">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-[1.25rem] flex items-center justify-center shadow-lg"
                      style={{ background: step.iconBackground }}
                    >
                      <Icon
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step text — mobile: bottom, desktop: left column */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeStep}`}
                  className="lg:order-1 space-y-3 lg:space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                >
                  <span
                    className="block font-black leading-none tabular-nums select-none text-[5rem] sm:text-[7rem] lg:text-[9rem]"
                    style={{ color: step.color }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-[1.85rem] font-bold text-gray-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xs sm:max-w-sm">
                    {step.description}
                  </p>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
