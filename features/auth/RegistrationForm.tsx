"use client";

import { Dispatch, SetStateAction } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

interface RegistrationFormProps {
  setAuthStep: Dispatch<SetStateAction<"login" | "signup" | "details">>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function RegistrationForm({ setAuthStep }: RegistrationFormProps) {
  return (
    <motion.div
      className="w-full max-w-130"
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -60, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.div className="bg-white lg:shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-4 py-6 lg:px-8" layout>
        {/* Header */}
        <motion.div
          className="mb-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            We&apos;re delighted to have you on board.
          </p>
        </motion.div>

        <motion.form
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={(e) => {
            e.preventDefault();
            setAuthStep("details");
          }}
        >
          {/* Email */}
          <motion.div className="flex flex-col gap-1.5" variants={itemVariants}>
            <label htmlFor="signup-email" className="label">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Enter email address"
              className="input h-12"
            />
          </motion.div>

          {/* Password */}
          <motion.div className="flex flex-col gap-1.5" variants={itemVariants}>
            <label htmlFor="signup-password" className="label">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="Enter password"
              className="input h-12"
            />
          </motion.div>

          {/* Actions */}
          <motion.div className="flex flex-col gap-3 pt-1" variants={itemVariants}>
            <motion.button
              type="submit"
              className="btn-primary w-full"
              whileHover={{ scale: 0.99 }}
              whileTap={{ scale: 0.97 }}
            >
              Sign up
            </motion.button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <motion.button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl
                         hover:bg-gray-50 hover:border-gray-300
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52]/40
                         transition-all duration-200 shadow-sm"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FcGoogle className="text-xl shrink-0" />
              Continue with Google
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Footer */}
        <motion.p
          className="mt-6 text-center text-sm text-gray-500"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Already have an account?{" "}
          <button
            onClick={() => setAuthStep("login")}
            className="text-[#2E9E52] font-semibold hover:underline focus-visible:outline-none"
          >
            Log in
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
