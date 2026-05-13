"use client";
import LoginForm from "@/features/auth/LoginForm";
import RegistrationForm from "@/features/auth/RegistrationForm";
import React, { useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function RegisterPage() {
  const [showPage, setShowPage] = React.useState(false);
  useEffect(() => {
    setShowPage(true);
  }, []);
  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: "url('/homebg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-275 overflow-hidden">
        <motion.div className="flex flex-col items-center lg:flex-row" layout>
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
              className="mt-4 text-[20px] font-[500] leading-[1.4] max-w-[420px]"
              variants={textItemVariants}
            >
              Every connection can change a life
            </motion.p>
            <motion.p
              className="mt-2 text-[14px] text-[#2E9E52] font-[500] max-w-[420px] leading-[1.6]"
              variants={textItemVariants}
            >
              Harvest Track helps evangelists capture contacts, follow up with
              care, and see more people grow in their faith
            </motion.p>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 lg:px-12"
            layout
            animate={{ height: "auto" }}
            transition={{ duration: 0.35 }}
          >
            <AnimatePresence mode="wait">
              {showPage ? (
                <RegistrationForm key="signup" setShowPage={setShowPage} />
              ) : (
                <LoginForm key="login" setShowPage={setShowPage} />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
