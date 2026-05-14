"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EnterEmailStep from "@/features/auth/EnterEmailStep";
import VerifyOTPStep from "@/features/auth/VerifyOTPStep";
import ResetPasswordStep from "@/features/auth/ResetPasswordStep";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ForgotPasswordPage() {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [showPage, setShowPage] = React.useState(false);

  useEffect(() => {
    setShowPage(true);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/homebg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-275 overflow-hidden">
        <motion.div className="flex flex-col items-center lg:flex-row" layout>
          {/* Left Side - Static Content */}
          <motion.div
            className="lg:w-1/2 md:block hidden p-10 lg:p-16"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-black font-semibold text-[32px]"
              variants={textItemVariants}
            >
              Harvest Track
            </motion.h1>
            <motion.p
              className="mt-4 text-xl font-medium leading-relaxed max-w-105"
              variants={textItemVariants}
            >
              Regain Access to Your Account
            </motion.p>
            <motion.p
              className="mt-2 text-sm text-[#2E9E52] font-medium max-w-105 leading-relaxed"
              variants={textItemVariants}
            >
              We'll help you reset your password securely in just a few steps.
              Enter your email, verify your identity, and create a new password
              to get back to managing your contacts.
            </motion.p>

            {/* Step Indicators on Left */}
            <motion.div className="mt-8" variants={textItemVariants}>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "Enter Email",
                    desc: "Provide your email address",
                  },
                  {
                    num: 2,
                    title: "Verify OTP",
                    desc: "Confirm with the code we send",
                  },
                  {
                    num: 3,
                    title: "New Password",
                    desc: "Create your new password",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.num}
                    className={`flex gap-4 p-4 rounded-lg transition-all ${
                      step === item.num
                        ? "bg-[#2E9E52]/10 border-l-4 border-[#2E9E52]"
                        : step > item.num
                          ? "bg-[#2E9E52]/5"
                          : "opacity-50"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                        step >= item.num
                          ? "bg-[#2E9E52] text-white"
                          : "bg-[#E5E7EB] text-[#6B7280]"
                      }`}
                    >
                      {step > item.num ? "✓" : item.num}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#1F2937]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#6B7280]">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Dynamic Form */}
          <motion.div
            className="w-full lg:w-1/2 lg:px-12"
            layout
            animate={{ height: "auto" }}
            transition={{ duration: 0.35 }}
          >
            <AnimatePresence mode="wait">
              {showPage && step === 1 && (
                <EnterEmailStep key="email" setStep={setStep} />
              )}
              {showPage && step === 2 && (
                <VerifyOTPStep key="otp" setStep={setStep} />
              )}
              {showPage && step === 3 && (
                <ResetPasswordStep key="reset" setStep={setStep} />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
