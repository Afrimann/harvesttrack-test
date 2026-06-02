"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import ForgotPasswordLayout from "./ForgotPasswordLayout";
import { useForgotPassword } from "@/lib/hooks/useAuth";
import { HttpError } from "@/lib/types/api.types";

interface EnterEmailStepProps {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function EnterEmailStep({ setStep }: EnterEmailStepProps) {
  const [email, setEmail] = useState("");
  const forgotPassword = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword.mutateAsync({ email });
      setStep(2);
    } catch {
      // error shown via forgotPassword.error below
    }
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
        {/* API error */}
        {forgotPassword.error && (
          <motion.p
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            variants={itemVariants}
          >
            {forgotPassword.error instanceof HttpError
              ? forgotPassword.error.message
              : "Something went wrong. Please try again."}
          </motion.p>
        )}

        {/* Email Field */}
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <label
            htmlFor="email"
            className="label text-sm font-medium text-[#1F2937]"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input h-12 border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20"
          />
          <span className="text-xs text-[#6B7280]">
            We'll send a verification code to this email
          </span>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={forgotPassword.isPending}
          className="mt-4 h-12 bg-[#2E9E52] text-white rounded-lg font-semibold hover:bg-[#248A45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          variants={itemVariants}
        >
          {forgotPassword.isPending ? "Sending OTP…" : "Send OTP"}
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
