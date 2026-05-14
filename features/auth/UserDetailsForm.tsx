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
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const buttonHoverVariants = {
  hover: { y: -4, transition: { duration: 0.2 } },
};

export default function UserDetailsForm({ setAuthStep }: UserDetailsFormProps) {
  const [accountType, setAccountType] = useState<"Personal" | "Church">(
    "Personal",
  );
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    workspaceName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call here to save user details
    console.log("User Details:", {
      ...formData,
      accountType,
    });
    // Navigate to next page after successful submission
  };

  return (
    <motion.div
      className="w-full max-w-[520px]"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.div
        className="bg-white lg:shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-8 py-6"
        layout
      >
        <motion.div
          className="mb-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-[24px] font-semibold">Fill in your details</h1>
          <p className="text-[14px] text-[#6B7280]">Sign up caption</p>
        </motion.div>

        <motion.form
          className="flex flex-col gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          {/* Name Field */}
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.label
              htmlFor="fullName"
              className="label text-[14px] font-medium text-[#1F2937]"
              variants={itemVariants}
            >
              Name
            </motion.label>
            <motion.input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input h-[48px] border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20"
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.span
              className="text-[12px] text-[#2E9E52]"
              variants={itemVariants}
            >
              Please enter your full name
            </motion.span>
          </motion.div>

          {/* Contact Detail Field */}
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.label
              htmlFor="phoneNumber"
              className="label text-[14px] font-medium text-[#1F2937]"
              variants={itemVariants}
            >
              Contact detail
            </motion.label>
            <motion.input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input h-[48px] border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20"
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.span
              className="text-[12px] text-[#2E9E52]"
              variants={itemVariants}
            >
              +234 90 XXX XXXX
            </motion.span>
          </motion.div>

          {/* Account Type Selector */}
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.label
              className="label text-[14px] font-medium text-[#1F2937]"
              variants={itemVariants}
            >
              Account type
            </motion.label>
            <motion.div className="flex gap-4" variants={itemVariants}>
              <motion.button
                type="button"
                onClick={() => setAccountType("Personal")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  accountType === "Personal"
                    ? "bg-[#2E9E52] text-white"
                    : "bg-[#E5E7EB] text-[#1F2937]"
                }`}
                whileHover="hover"
                variants={buttonHoverVariants}
              >
                Personal
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setAccountType("Church")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  accountType === "Church"
                    ? "bg-[#2E9E52] text-white"
                    : "bg-[#E5E7EB] text-[#1F2937]"
                }`}
                whileHover="hover"
                variants={buttonHoverVariants}
              >
                Church
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Workspace Name Field */}
          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.label
              htmlFor="workspaceName"
              className="label text-[14px] font-medium text-[#1F2937]"
              variants={itemVariants}
            >
              Workspace name
            </motion.label>
            <motion.input
              id="workspaceName"
              name="workspaceName"
              type="text"
              placeholder="Enter name"
              value={formData.workspaceName}
              onChange={handleInputChange}
              className="input h-[48px] border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20"
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.span
              className="text-[12px] text-[#6B7280]"
              variants={itemVariants}
            >
              Organization or Church name
            </motion.span>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="mt-4 h-[48px] bg-[#2E9E52] text-white rounded-lg font-semibold hover:bg-[#248A45] transition-colors"
            variants={itemVariants}
            whileHover="hover"
          >
            Submit
          </motion.button>
        </motion.form>

        {/* Back to Login Link */}
        <motion.div
          className="mt-4 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-[14px] text-[#6B7280]">
            Already have an account?{" "}
            <button
              onClick={() => setAuthStep("login")}
              className="text-[#2E9E52] font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
