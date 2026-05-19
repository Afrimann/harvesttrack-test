"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Download,
  Heart,
  Play,
  QrCode,
  TrendingUp,
} from "lucide-react";
import { motion, MotionConfig, useInView } from "framer-motion";
import {
  badgeVariants,
  buttonVariants,
  containerVariants,
  imageContainerVariants,
  itemVariants,
  sectionVariants,
} from "@/src/utils/animations/variants";

// ─── Content data ─────────────────────────────────────────────────────────────

const DASHBOARD_STATS = [
  { label: "Contacts (30D)", value: "412", delta: "+18%" },
  { label: "QR Scans", value: "1,284", delta: "+34%" },
  { label: "Discipled", value: "67", delta: "+9" },
] as const;

const ACTIVITY_FEED = [
  { name: "Amara Okafor", action: "moved to Discipleship" },
  { name: "David Mensah", action: "call follow-up due" },
  { name: "Grace Mwangi", action: "joined Sunday service" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroContent() {
  return (
    <motion.div className="space-y-9">
      {/* Badge — green-tinted, pulsing dot */}
      <motion.div
        className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#2E9E52]/20 backdrop-blur-md rounded-full border border-[#2E9E52]/35"
        variants={badgeVariants}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-[#4ADE80] tracking-wide">
          Built for evangelists &amp; churches
        </span>
      </motion.div>

      {/* Heading */}
      <motion.div className="space-y-5" variants={itemVariants}>
        <h1 className="text-5xl lg:text-[3.6rem] xl:text-[4rem] font-bold text-white leading-[1.1] tracking-tight">
          Turn outreach contacts
          <br className="hidden sm:block" /> into{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#2E9E52] to-[#4ADE80]">
            lasting disciples
          </span>
          .
        </h1>
        <p className="text-[1.05rem] text-white/75 leading-relaxed max-w-[30rem]">
          HarvestTrack gives missionaries a QR-powered contact capture flow,
          structured follow-up tasks, and a pipeline that mirrors the real
          spiritual journey — from first hello to joining a church.
        </p>
      </motion.div>

      {/* Primary CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        variants={buttonVariants}
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2E9E52] text-white font-semibold rounded-xl
                     hover:bg-[#268547] hover:shadow-2xl hover:shadow-green-600/30 hover:scale-[1.03]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                     focus-visible:ring-offset-2 focus-visible:ring-offset-black/60
                     transition-all duration-200"
        >
          Try the dashboard
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <Link
          href="#qr-demo"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold rounded-xl
                     hover:bg-white/20 hover:border-white/40 hover:scale-[1.03]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                     focus-visible:ring-offset-2 focus-visible:ring-offset-black/60
                     transition-all duration-200"
        >
          See a public QR form
        </Link>
      </motion.div>

      {/* Social proof + download links */}
      <motion.div className="space-y-4 pt-1" variants={itemVariants}>
        {/* Avatars + trust line */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2" aria-hidden="true">
            {(["A", "D", "G", "M"] as const).map((initial, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-black/30 bg-[#2E9E52] flex items-center justify-center text-[10px] font-bold text-white"
              >
                {initial}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/55">
            <span className="text-white/90 font-medium">150+</span> mission
            teams active worldwide
          </p>
        </div>

        {/* Download links — inline with divider */}
        <div className="flex items-center gap-1">
          <Link
            href="#"
            aria-label="Download HarvestTrack for iOS"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-white/60 text-sm font-medium rounded-lg
                       hover:text-white hover:bg-white/10
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                       transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            iOS
          </Link>
          <span className="w-px h-4 bg-white/20" aria-hidden="true" />
          <Link
            href="#"
            aria-label="Get HarvestTrack on Google Play"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-white/60 text-sm font-medium rounded-lg
                       hover:text-white hover:bg-white/10
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                       transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5" aria-hidden="true" />
            Google Play
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DashboardMockup() {
  return (
    <motion.div
      className="relative hidden lg:block"
      variants={imageContainerVariants}
    >
      {/* Floating notification card — independent bob, offset timing */}
      <motion.div
        className="absolute -top-10 -left-10 z-30 bg-white/96 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 w-56"
        aria-hidden="true"
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
          <QrCode className="w-4 h-4 text-[#2E9E52]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-900 leading-tight">
            New QR scan
          </p>
          <p className="text-xs text-gray-400 truncate">
            James Osei · just now
          </p>
        </div>
        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-pulse" />
      </motion.div>

      {/* Main mockup — clean vertical float */}
      <motion.div
        className="relative z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="bg-white/96 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/50"
          role="img"
          aria-label="Dashboard preview: 412 contacts, 1,284 QR scans, 67 discipled"
        >
          {/* Browser chrome — decorative */}
          <div
            className="bg-gray-50/90 backdrop-blur-md px-4 py-3 flex items-center gap-2 border-b border-gray-200/60"
            aria-hidden="true"
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-gray-400 ml-3 select-none">
              app.harvesttrack.app/dashboard
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {DASHBOARD_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-tight">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2 tabular-nums">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp
                      className="w-3 h-3 text-green-500"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-green-600 font-semibold">
                      {stat.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity feed */}
            <ul
              className="space-y-2 pt-5 border-t border-gray-100"
              aria-label="Recent contact activity"
            >
              {ACTIVITY_FEED.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-linear-to-r from-green-50/80 to-white border border-green-100/70"
                >
                  <div
                    className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#2E9E52]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight truncate">
                      {item.action}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Glow — two layers for depth */}
        <div
          className="absolute inset-0 bg-linear-to-br from-green-400/30 via-green-600/10 to-transparent rounded-2xl blur-2xl -z-10 scale-110"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-green-500/15 to-transparent rounded-2xl blur-xl -z-10"
          aria-hidden="true"
        />
      </motion.div>

      {/* Floating conversion-rate card — opposite bob phase */}
      <motion.div
        className="absolute -bottom-8 -right-8 z-30 bg-white/96 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 px-4 py-3 w-44"
        aria-hidden="true"
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.6,
        }}
      >
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          Conversion rate
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums">
          16.3%
        </p>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-green-500" aria-hidden="true" />
          <span className="text-xs text-green-600 font-semibold">
            +4.1% this month
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        ref={ref}
        aria-label="HarvestTrack — Turn outreach contacts into lasting disciples"
        className="relative overflow-hidden min-h-svh flex items-center"
        style={{
          backgroundImage: "url('/devotional_evangelism.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Left-to-right overlay — anchors left column text */}
        <div
          className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/15 pointer-events-none"
          aria-hidden="true"
        />
        {/* Bottom-to-top overlay — cinematic ground shadow */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <HeroContent />
            <DashboardMockup />
          </motion.div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}
