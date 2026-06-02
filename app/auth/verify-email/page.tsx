"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useVerifyEmail } from "@/lib/hooks/useAuth";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verifyEmail = useVerifyEmail();
  const called = useRef(false);

  useEffect(() => {
    if (!token || called.current) return;
    called.current = true;
    verifyEmail.mutate(token);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
        className="fixed inset-0 -z-10 bg-white/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] px-8 py-12 w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Always show verifying state — hook navigates away on success or failure */}
        <div className="w-14 h-14 rounded-full border-4 border-[#e8f5ee] border-t-[#2E9E52] animate-spin mx-auto mb-5" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Verifying your email…
        </h2>
        <p className="text-sm text-gray-400">
          {!token
            ? "No token found in this link."
            : "This will only take a moment."}
        </p>
      </motion.div>
    </div>
  );
}
