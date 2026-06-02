"use client";

import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import ForgotPasswordLayout from "./ForgotPasswordLayout";
import { useForgotPassword, useVerifyOTP } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/stores/auth.store";
import { HttpError } from "@/lib/types/api.types";

interface VerifyOTPStepProps {
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

export default function VerifyOTPStep({ setStep }: VerifyOTPStepProps) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { pendingEmail, setPendingOtp } = useAuthStore();
  const verifyOTP = useVerifyOTP();
  const forgotPassword = useForgotPassword();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6 || !pendingEmail) return;
    try {
      await verifyOTP.mutateAsync({ email: pendingEmail, otp: otpString });
      setPendingOtp(otpString);
      setStep(3);
    } catch {
      // error shown via verifyOTP.error below
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) return;
    setOtp(Array(6).fill(""));
    setTimer(120);
    forgotPassword.mutate({ email: pendingEmail });
  };

  const isComplete = otp.every((digit) => digit !== "");
  const error = verifyOTP.error ?? forgotPassword.error;

  return (
    <ForgotPasswordLayout
      currentStep={2}
      totalSteps={3}
      title="Verify OTP"
      description="Enter the 6-digit code we sent to your email"
    >
      <motion.form
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
      >
        {/* API error */}
        {error && (
          <motion.p
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            variants={itemVariants}
          >
            {error instanceof HttpError
              ? error.message
              : "Something went wrong. Please try again."}
          </motion.p>
        )}

        {/* OTP Input Fields */}
        <motion.div variants={itemVariants}>
          <label className="label text-sm font-medium text-[#1F2937] block mb-3">
            Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#2E9E52] focus:ring-2 focus:ring-[#2E9E52]/20 transition-all"
                whileFocus={{ scale: 1.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          className="text-center text-sm text-[#6B7280]"
          variants={itemVariants}
        >
          {timer > 0 ? (
            <p>
              Code expires in:{" "}
              <span className="font-semibold text-[#2E9E52]">{timer}s</span>
            </p>
          ) : (
            <p className="text-red-500">
              Code expired. Please request a new one.
            </p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isComplete || verifyOTP.isPending}
          className="mt-4 h-12 bg-[#2E9E52] text-white rounded-lg font-semibold hover:bg-[#248A45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          variants={itemVariants}
        >
          {verifyOTP.isPending ? "Verifying…" : "Verify OTP"}
        </motion.button>

        {/* Resend Code */}
        <motion.div className="text-center text-sm" variants={itemVariants}>
          <p className="text-[#6B7280]">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={forgotPassword.isPending}
              className="text-[#2E9E52] font-semibold hover:underline disabled:opacity-50"
            >
              {forgotPassword.isPending ? "Resending…" : "Resend"}
            </button>
          </p>
        </motion.div>

        {/* Back */}
        <motion.div className="text-center text-sm" variants={itemVariants}>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-[#2E9E52] font-semibold hover:underline"
          >
            Back to Email
          </button>
        </motion.div>
      </motion.form>
    </ForgotPasswordLayout>
  );
}
