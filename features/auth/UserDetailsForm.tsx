"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

interface UserDetailsFormProps {
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

export default function UserDetailsForm({ setAuthStep }: UserDetailsFormProps) {
  const [accountType, setAccountType] = useState<"Personal" | "Church">("Personal");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    workspaceName: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST user details to API
  }

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
            Fill in your details
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Just a few more things to set up your workspace.
          </p>
        </motion.div>

        <motion.form
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          {/* Full name */}
          <motion.div className="flex flex-col gap-1.5" variants={itemVariants}>
            <label htmlFor="fullName" className="label">
              Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input h-12"
            />
          </motion.div>

          {/* Phone */}
          <motion.div className="flex flex-col gap-1.5" variants={itemVariants}>
            <label htmlFor="phoneNumber" className="label">
              Phone number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+234 90 XXX XXXX"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input h-12"
            />
          </motion.div>

          {/* Account type */}
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <p className="label">Account type</p>
            <div
              className="grid grid-cols-2 gap-2"
              role="group"
              aria-label="Account type"
            >
              {(["Personal", "Church"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={accountType === type}
                  onClick={() => setAccountType(type)}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                    ${accountType === type
                      ? "bg-[#2E9E52] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Workspace name */}
          <motion.div className="flex flex-col gap-1.5" variants={itemVariants}>
            <label htmlFor="workspaceName" className="label">
              Workspace name
            </label>
            <input
              id="workspaceName"
              name="workspaceName"
              type="text"
              placeholder="Your organisation or church name"
              value={formData.workspaceName}
              onChange={handleInputChange}
              className="input h-12"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="btn-primary w-full mt-2"
            variants={itemVariants}
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 0.97 }}
          >
            Get started
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          className="mt-6 text-center text-sm text-gray-500"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Need to go back?{" "}
          <button
            onClick={() => setAuthStep("signup")}
            className="text-[#2E9E52] font-semibold hover:underline focus-visible:outline-none"
          >
            Return to sign up
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
