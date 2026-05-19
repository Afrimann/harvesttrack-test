"use client";

import Link from "next/link";
import { useRef } from "react";
import { Check } from "lucide-react";
import { motion, MotionConfig, useInView } from "framer-motion";
import {
  containerVariantsSlow,
  itemVariants,
  sectionVariants,
} from "@/src/utils/animations/variants";

// ─── Content data ─────────────────────────────────────────────────────────────

const FREE_FEATURES = [
  "Up to 500 contacts",
  "1 workspace, 5 members",
  "QR contact capture",
  "Basic pipeline & tasks",
] as const;

const PRO_FEATURES = [
  "Unlimited contacts",
  "Unlimited team members",
  "Advanced analytics & exports",
  "Priority support & training",
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <Check
            className="w-4 h-4 text-[#2E9E52] shrink-0"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <span className="text-sm text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        id="pricing"
        ref={ref}
        className="relative py-24 lg:py-32 bg-white"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Subtle background tint */}
        <div
          className="absolute inset-0 bg-linear-to-b from-[#f7fdf9] via-white to-white pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center max-w-xl mx-auto mb-14 lg:mb-16"
            variants={containerVariantsSlow}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl lg:text-[2.5rem] font-bold text-gray-900 leading-tight mb-3"
              variants={itemVariants}
            >
              Simple pricing for every ministry
            </motion.h2>
            <motion.p
              className="text-base lg:text-[17px] text-gray-500"
              variants={itemVariants}
            >
              Start free. Upgrade when your harvest grows.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
            variants={containerVariantsSlow}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* ── Free plan ─────────────────────────────────────────────── */}
            <motion.div
              className="relative bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-8
                         transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-200/60"
              variants={itemVariants}
            >
              {/* Plan info */}
              <div className="space-y-3">
                <p className="text-base font-bold text-gray-900">Free</p>
                <div className="flex items-end gap-1.5">
                  <span className="text-5xl font-black text-gray-900 leading-none">
                    $0
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Perfect for solo evangelists &amp; small teams.
                </p>
              </div>

              <FeatureList items={FREE_FEATURES} />

              <Link
                href="/auth"
                className="block text-center px-6 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900
                           hover:bg-gray-50 hover:border-gray-400
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52] focus-visible:ring-offset-2
                           transition-all duration-200"
              >
                Start free
              </Link>
            </motion.div>

            {/* ── Pro plan ──────────────────────────────────────────────── */}
            <motion.div
              className="relative bg-white rounded-2xl border-2 border-[#2E9E52] p-8 flex flex-col gap-8
                         transition-shadow duration-300 hover:shadow-xl hover:shadow-green-500/15"
              variants={itemVariants}
            >
              {/* Most popular badge — overlaps the top border */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                aria-label="Most popular plan"
              >
                <span className="inline-flex items-center px-4 py-1.5 bg-[#2E9E52] rounded-full text-xs font-bold text-white shadow-sm whitespace-nowrap">
                  Most popular
                </span>
              </div>

              {/* Plan info */}
              <div className="space-y-3">
                <p className="text-base font-bold text-gray-900">Pro</p>
                <div className="flex items-end gap-1.5">
                  <span className="text-5xl font-black text-gray-900 leading-none">
                    $19
                  </span>
                  <span className="text-base text-gray-400 mb-1">/mo</span>
                </div>
                <p className="text-sm text-gray-500">
                  For active churches running outreach campaigns.
                </p>
              </div>

              <FeatureList items={PRO_FEATURES} />

              <Link
                href="/dashboard"
                className="block text-center px-6 py-3 rounded-xl bg-[#2E9E52] text-white text-sm font-semibold
                           hover:bg-[#268547] hover:shadow-lg hover:shadow-green-500/30
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52] focus-visible:ring-offset-2
                           transition-all duration-200"
              >
                Start 14-day trial
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}
