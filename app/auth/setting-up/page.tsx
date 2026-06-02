"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { label: "Creating your profile", duration: 1200 },
  { label: "Setting up your workspace", duration: 1500 },
  { label: "Preparing your contacts", duration: 1300 },
  { label: "Finalising your setup", duration: 1000 },
] as const;

const MIN_MS = 5000;

export default function SettingUpPage() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const doneRef = useRef(false);

  // Sequence through steps
  useEffect(() => {
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((step, i) => {
      elapsed += step.duration;
      const t = setTimeout(() => {
        setCompletedSteps(i + 1);
      }, elapsed);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Smooth progress bar over MIN_MS
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / MIN_MS) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Redirect once all steps done AND min time elapsed
  useEffect(() => {
    if (completedSteps < STEPS.length || doneRef.current) return;
    doneRef.current = true;

    const elapsed = Date.now() - startRef.current;
    const remaining = Math.max(0, MIN_MS - elapsed);
    const t = setTimeout(() => router.push("/workspace/dashboard"), remaining);
    return () => clearTimeout(t);
  }, [completedSteps, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#f0fdf4" }}
    >
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold" style={{ color: "#166534" }}>
            HarvestTrack
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#4ade80" }}>
            Getting things ready for you…
          </p>
        </motion.div>

        {/* Spinner ring */}
        <div className="relative mx-auto mb-8 w-20 h-20">
          <svg
            className="absolute inset-0 -rotate-90"
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#bbf7d0"
              strokeWidth="6"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#2E9E52"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - progress / 100)}
              transition={{ ease: "linear" }}
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-sm font-bold"
            style={{ color: "#2E9E52" }}
          >
            {Math.round(progress)}%
          </span>
        </div>

        {/* Steps list */}
        <div className="flex flex-col gap-3 text-left mb-8">
          {STEPS.map((step, i) => {
            const isDone = completedSteps > i;
            const isActive = completedSteps === i;

            return (
              <motion.div
                key={step.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: isDone
                    ? "#dcfce7"
                    : isActive
                      ? "#f0fdf4"
                      : "transparent",
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#2E9E52" }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <polyline points="1.5 5 4 7.5 8.5 2.5" />
                      </svg>
                    </motion.span>
                  ) : isActive ? (
                    <motion.span
                      key="spinner"
                      className="w-5 h-5 rounded-full border-2 border-t-[#2E9E52] border-[#bbf7d0] animate-spin shrink-0"
                    />
                  ) : (
                    <span
                      key="dot"
                      className="w-5 h-5 rounded-full border-2 shrink-0"
                      style={{ borderColor: "#d1d5db" }}
                    />
                  )}
                </AnimatePresence>

                <span
                  className="text-sm font-medium"
                  style={{
                    color: isDone ? "#166534" : isActive ? "#374151" : "#9ca3af",
                  }}
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-xs" style={{ color: "#86efac" }}>
          Please don&apos;t close this page
        </p>
      </motion.div>
    </div>
  );
}
