"use client";

import { useRef } from "react";
import { QrCode, Users, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, MotionConfig, useInView } from "framer-motion";
import {
  badgeVariants,
  containerVariantsSlow,
  itemVariants,
  sectionVariants,
} from "@/src/utils/animations/variants";


type Feature = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  tag: string;
};

const FEATURES: Feature[] = [
  {
    icon: QrCode,
    number: "01",
    title: "QR contact capture",
    description:
      "Each evangelist gets a personal QR code. Prospects scan, enter their name & phone, and the contact lands in your list — no typing on the field.",
    tag: "Under 10 seconds",
  },
  {
    icon: Users,
    number: "02",
    title: "Spiritual pipeline",
    description:
      "Move contacts through New → Contacted → Interested → Discipleship → Joined Church with drag-and-drop, tasks, and reminders.",
    tag: "5-stage pipeline",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Team & QR analytics",
    description:
      "See conversion rate per evangelist, scan-to-submission funnel per QR, and event-level outreach impact in real time.",
    tag: "Real-time data",
  },
];


function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <motion.div className="group h-full" variants={itemVariants}>
      <div
        className="relative h-full bg-white rounded-2xl border border-gray-200/80 p-7 overflow-hidden
                   transition-all duration-300
                   hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10 hover:border-green-500/25"
      >
        {/* Ghost number — fades to green-tinted on hover */}
        <span
          className="absolute top-5 right-6 text-[5.5rem] font-black leading-none select-none
                     text-gray-100 group-hover:text-green-50 transition-colors duration-300"
          aria-hidden="true"
        >
          {feature.number}
        </span>

        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6
                     bg-[#2E9E52]/10 group-hover:bg-[#2E9E52]/15 transition-colors duration-300"
        >
          <Icon className="w-6 h-6 text-[#2E9E52]" strokeWidth={1.5} />
        </div>

        {/* Text content */}
        <div className="space-y-3 mb-7">
          <h3 className="text-[16px] lg:text-[17px] font-bold text-gray-900 leading-snug">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Tag pill — always visible, reinforces the key benefit */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#2E9E52]"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold text-[#2E9E52]">
            {feature.tag}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        id="features"
        ref={ref}
        className="relative py-24 lg:py-32 bg-[#fafafa]"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Background blobs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-[#2E9E52]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#2E9E52]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header — centered for impact */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
            variants={containerVariantsSlow}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 rounded-full border border-green-100 mb-6"
              variants={badgeVariants}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#2E9E52]"
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-[#2E9E52] uppercase tracking-widest">
                What you get
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl lg:text-[2.5rem] font-bold text-gray-900 leading-tight mb-4"
              variants={itemVariants}
            >
              Built for the field,
              <br />
              not the boardroom
            </motion.h2>

            <motion.p
              className="text-base lg:text-[17px] text-gray-500 leading-relaxed"
              variants={itemVariants}
            >
              Sales CRMs use the wrong language. HarvestTrack speaks ministry —
              contacts, prayer requests, discipleship, and joining a church.
            </motion.p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariantsSlow}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.number} feature={feature} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}
