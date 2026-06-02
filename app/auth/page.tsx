"use client";

import LoginForm from "@/features/auth/LoginForm";
import RegistrationForm from "@/features/auth/RegistrationForm";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AuthPage() {
  const [authStep, setAuthStep] = React.useState<"login" | "signup">("signup");

  return (
    <div className="min-h-screen">
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: "url('/homebg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      <div
        className="lg:hidden fixed inset-0 -z-10 bg-linear-to-b from-transparent via-white/75 to-white"
        aria-hidden="true"
      />

      <div className="lg:min-h-screen lg:flex lg:items-center lg:justify-center">
        <div className="w-full lg:max-w-275 lg:overflow-hidden">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center"
            layout
          >
            {/* Left side — branding */}
            <motion.div
              className="hidden lg:block lg:w-1/2 p-10 lg:p-16"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-black font-semibold text-[32px]"
                variants={textItemVariants}
              >
                HarvestTrack
              </motion.h1>
              <motion.p
                className="mt-4 text-xl font-medium leading-relaxed max-w-105"
                variants={textItemVariants}
              >
                Every connection can change a life
              </motion.p>
              <motion.p
                className="mt-2 text-sm text-[#2E9E52] font-medium max-w-105 leading-relaxed"
                variants={textItemVariants}
              >
                HarvestTrack helps evangelists capture contacts, follow up with
                care, and see more people grow in their faith.
              </motion.p>
            </motion.div>

            {/* Right side — auth forms */}
            <motion.div
              className="w-full lg:w-1/2 pt-10 px-4 pb-10 lg:pt-0 lg:py-6 lg:px-12"
              layout
              animate={{ height: "auto" }}
              transition={{ duration: 0.35 }}
            >
              <AnimatePresence mode="wait">
                {authStep === "signup" && (
                  <RegistrationForm key="signup" setAuthStep={setAuthStep} />
                )}
                {authStep === "login" && (
                  <LoginForm key="login" setAuthStep={setAuthStep} />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
