"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import ForgotPasswordLayout from "./ForgotPasswordLayout";

interface ResetPasswordStepProps {
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

interface FormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordStep({ setStep }: ResetPasswordStepProps) {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to login or success page
      window.location.href = "/auth";
    }, 1500);
  };

  const passwordsMatch =
    formData.password && formData.password === formData.confirmPassword;

  return (
    <ForgotPasswordLayout
      currentStep={3}
      totalSteps={3}
      title="Reset Password"
      description="Create a new password for your account"
    >
      <motion.form
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
      >
        {/* Error Message */}
        {error && (
          <motion.div
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            variants={itemVariants}
          >
            {error}
          </motion.div>
        )}

        {/* New Password Field */}
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <motion.label
            htmlFor="password"
            className="label text-sm font-medium text-[#1F2937]"
            variants={itemVariants}
          >
            New Password
          </motion.label>
          <div className="relative">
            <motion.input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full h-12 border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20 transition-all"
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#2E9E52]"
              whileHover={{ scale: 1.1 }}
            >
              {showPassword ? "Hide" : "Show"}
            </motion.button>
          </div>
          <motion.span
            className="text-xs text-[#6B7280]"
            variants={itemVariants}
          >
            Must be at least 8 characters
          </motion.span>
        </motion.div>

        {/* Confirm Password Field */}
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <motion.label
            htmlFor="confirmPassword"
            className="label text-sm font-medium text-[#1F2937]"
            variants={itemVariants}
          >
            Confirm Password
          </motion.label>
          <div className="relative">
            <motion.input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full h-12 border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20 transition-all"
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#2E9E52]"
              whileHover={{ scale: 1.1 }}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </motion.button>
          </div>
          {passwordsMatch && formData.password && (
            <motion.span
              className="text-xs text-[#2E9E52]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              variants={itemVariants}
            >
              ✓ Passwords match
            </motion.span>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!passwordsMatch || loading}
          className="mt-4 h-12 bg-[#2E9E52] text-white rounded-lg font-semibold hover:bg-[#248A45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          variants={itemVariants}
          whileHover={passwordsMatch && !loading ? "hover" : {}}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </motion.button>

        {/* Back */}
        <motion.div className="text-center text-sm" variants={itemVariants}>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="text-[#2E9E52] font-semibold hover:underline"
          >
            Back
          </button>
        </motion.div>
      </motion.form>
    </ForgotPasswordLayout>
  );
}
