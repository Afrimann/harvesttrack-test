"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import ForgotPasswordLayout from "./ForgotPasswordLayout";

interface EnterEmailStepProps {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const buttonHoverVariants = {
  hover: { y: -4, transition: { duration: 0.2 } },
};

export default function EnterEmailStep({ setStep }: EnterEmailStepProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <ForgotPasswordLayout
      currentStep={1}
      totalSteps={3}
      title="Forgot Password?"
      description="Enter your email address and we'll send you an OTP to reset your password"
    >
      <motion.form
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
      >
        {/* Email Field */}
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <motion.label
            htmlFor="email"
            className="label text-sm font-medium text-[#1F2937]"
            variants={itemVariants}
          >
            Email Address
          </motion.label>
          <motion.input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input h-12 border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20"
            variants={itemVariants}
            whileFocus={{ scale: 1.01 }}
          />
          <motion.span
            className="text-xs text-[#6B7280]"
            variants={itemVariants}
          >
            We'll send a verification code to this email
          </motion.span>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          className="mt-4 h-12 bg-[#2E9E52] text-white rounded-lg font-semibold hover:bg-[#248A45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          variants={itemVariants}
          whileHover={!loading ? "hover" : {}}
          animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </motion.button>

        {/* Back to Login */}
        <motion.div className="text-center mt-4" variants={itemVariants}>
          <p className="text-sm text-[#6B7280]">
            Remember your password?{" "}
            <a
              href="/auth"
              className="text-[#2E9E52] font-semibold hover:underline"
            >
              Back to Login
            </a>
          </p>
        </motion.div>
      </motion.form>
    </ForgotPasswordLayout>
  );
}
