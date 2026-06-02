"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUserDetails } from "@/lib/hooks/useAuth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function DetailsPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"Personal" | "Church">("Personal");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    workspaceName: "",
  });
  const userDetails = useUserDetails();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    userDetails.mutate({
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      accountType,
      workspaceName: formData.workspaceName,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      {/* Background */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: "url('/homebg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="lg:hidden fixed inset-0 -z-10 bg-linear-to-b from-transparent via-white/75 to-white"
        aria-hidden="true"
      />

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-6 py-8 lg:px-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "#2E9E52" }}
            >
              ✓
            </span>
            <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: "#e8f5ee" }}>
              <div className="h-full w-1/2 rounded-full" style={{ backgroundColor: "#2E9E52" }} />
            </div>
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "#2E9E52" }}
            >
              2
            </span>
            <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: "#e5e7eb" }} />
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ backgroundColor: "#f3f4f6", color: "#9ca3af" }}
            >
              3
            </span>
          </div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <h1 className="text-2xl font-semibold text-gray-900">
              Set up your workspace
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Just a few more details to get you started.
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
              <label htmlFor="fullName" className="label">Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input h-12"
              />
            </motion.div>

            {/* Phone */}
            <motion.div className="flex flex-col gap-1.5" variants={itemVariants}>
              <label htmlFor="phoneNumber" className="label">Phone number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+234 90 XXX XXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="input h-12"
              />
            </motion.div>

            {/* Account type */}
            <motion.div className="flex flex-col gap-2" variants={itemVariants}>
              <p className="label">Account type</p>
              <div className="grid grid-cols-2 gap-2" role="group">
                {(["Personal", "Church"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={accountType === type}
                    onClick={() => setAccountType(type)}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      accountType === type
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
              <label htmlFor="workspaceName" className="label">Workspace name</label>
              <input
                id="workspaceName"
                name="workspaceName"
                type="text"
                placeholder="Your organisation or church name"
                value={formData.workspaceName}
                onChange={handleChange}
                required
                className="input h-12"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={userDetails.isPending}
              className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              variants={itemVariants}
              whileHover={{ scale: 0.99 }}
              whileTap={{ scale: 0.97 }}
            >
              {userDetails.isPending ? "Saving…" : "Continue"}
            </motion.button>
          </motion.form>

          <p className="mt-5 text-center text-sm text-gray-400">
            Need to log out?{" "}
            <button
              onClick={() => router.push("/auth")}
              className="text-[#2E9E52] font-semibold hover:underline"
            >
              Back to login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
