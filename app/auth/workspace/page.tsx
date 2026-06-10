"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWorkspaceSetup } from "@/lib/hooks/useAuth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function WorkspacePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const workspaceSetup = useWorkspaceSetup();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    workspaceSetup.mutate({ name });
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
              <div className="h-full w-full rounded-full" style={{ backgroundColor: "#2E9E52" }} />
            </div>
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "#2E9E52" }}
            >
              ✓
            </span>
            <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: "#e8f5ee" }}>
              <div className="h-full w-full rounded-full" style={{ backgroundColor: "#2E9E52" }} />
            </div>
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "#2E9E52" }}
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
              Name your workspace
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              This is how your workspace will appear to your team.
            </p>
          </motion.div>

          <motion.form
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
          >
            <motion.div className="flex flex-col gap-1.5" variants={itemVariants}>
              <label htmlFor="name" className="label">Workspace name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Grace Community Church"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input h-12"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={workspaceSetup.isPending}
              className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              variants={itemVariants}
              whileHover={{ scale: 0.99 }}
              whileTap={{ scale: 0.97 }}
            >
              {workspaceSetup.isPending ? "Saving…" : "Continue"}
            </motion.button>
          </motion.form>

          <p className="mt-5 text-center text-sm text-gray-400">
            Need to go back?{" "}
            <button
              onClick={() => router.push("/auth/details")}
              className="text-[#2E9E52] font-semibold hover:underline"
            >
              Previous step
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
