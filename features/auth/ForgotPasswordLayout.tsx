"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ForgotPasswordLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  children: ReactNode;
}

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.5 },
  },
};

export default function ForgotPasswordLayout({
  currentStep,
  totalSteps,
  title,
  description,
  children,
}: ForgotPasswordLayoutProps) {
  return (
    <motion.div
      className="w-full max-w-130"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="bg-white lg:shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-4 py-6 lg:px-8"
        layout
      >
        {/* Progress Indicator */}
        <motion.div className="mb-6" initial="hidden" animate="visible">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <motion.div
                key={i}
                className={`text-xs font-medium ${
                  i < currentStep
                    ? "text-[#2E9E52]"
                    : i === currentStep - 1
                      ? "text-[#2E9E52]"
                      : "text-[#D1D5DB]"
                }`}
                variants={progressVariants}
              >
                Step {i + 1}
              </motion.div>
            ))}
          </div>
          {/* Progress Bar */}
          <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#2E9E52]"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-semibold text-[#1F2937]">{title}</h1>
          <p className="text-sm text-[#6B7280] mt-2">{description}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
