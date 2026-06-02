"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import ForgotPasswordLayout from "./ForgotPasswordLayout";
import { useResetPassword } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/stores/auth.store";
import { HttpError } from "@/lib/types/api.types";

interface ResetPasswordStepProps {
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
  const [validationError, setValidationError] = useState("");
  const { pendingEmail, pendingOtp } = useAuthStore();
  const resetPassword = useResetPassword();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword() || !pendingEmail || !pendingOtp) return;
    resetPassword.mutate({
      email: pendingEmail,
      otp: pendingOtp,
      newPassword: formData.password,
    });
  };

  const passwordsMatch =
    formData.password && formData.password === formData.confirmPassword;

  const displayError =
    validationError ||
    (resetPassword.error instanceof HttpError
      ? resetPassword.error.message
      : resetPassword.error
        ? "Something went wrong. Please try again."
        : "");

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
        {displayError && (
          <motion.div
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {displayError}
          </motion.div>
        )}

        {/* New Password Field */}
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <label
            htmlFor="password"
            className="label text-sm font-medium text-[#1F2937]"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full h-12 border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#2E9E52]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <span className="text-xs text-[#6B7280]">
            Must be at least 8 characters
          </span>
        </motion.div>

        {/* Confirm Password Field */}
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <label
            htmlFor="confirmPassword"
            className="label text-sm font-medium text-[#1F2937]"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full h-12 border border-[#D1D5DB] rounded-lg px-4 py-2 focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#2E9E52]"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passwordsMatch && (
            <motion.span
              className="text-xs text-[#2E9E52]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✓ Passwords match
            </motion.span>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!passwordsMatch || resetPassword.isPending}
          className="mt-4 h-12 bg-[#2E9E52] text-white rounded-lg font-semibold hover:bg-[#248A45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          variants={itemVariants}
        >
          {resetPassword.isPending ? "Resetting…" : "Reset Password"}
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
