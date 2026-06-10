"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useResendVerification } from "@/lib/hooks/useAuth";

export default function CheckEmailPage() {
  const router = useRouter();
  const { pendingEmail } = useAuthStore();
  const resend = useResendVerification();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
        className="fixed inset-0 -z-10 bg-white/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] px-8 py-10 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated envelope */}
        <motion.div
          className="mx-auto mb-6 flex items-center justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#e8f5ee" }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2E9E52"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
        </motion.div>

        {/* Pulsing dot indicator */}
        <div className="flex justify-center gap-1.5 mb-5">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#2E9E52" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, delay }}
            />
          ))}
        </div>

        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          Check your inbox!
        </motion.h2>

        <motion.p
          className="text-sm text-gray-500 mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          We sent a verification link to
        </motion.p>

        {/* Email pill */}
        <motion.div
          className="inline-block px-4 py-2 rounded-xl text-sm font-semibold mb-5"
          style={{ backgroundColor: "#e8f5ee", color: "#166534" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.35 }}
        >
          {pendingEmail ?? "your email address"}
        </motion.div>

        <motion.p
          className="text-sm text-gray-400 mb-7 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          Click the link in the email to verify your account and continue
          setting up your workspace.
        </motion.p>

        {/* Resend */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          <button
            onClick={() => pendingEmail && resend.mutate(pendingEmail)}
            disabled={resend.isPending || !pendingEmail}
            className="w-full h-11 rounded-xl border border-[#2E9E52] text-[#2E9E52] text-sm font-semibold hover:bg-[#e8f5ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resend.isPending ? "Resending…" : "Resend verification email"}
          </button>

          <button
            onClick={() => router.push("/auth")}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Wrong email? Go back to sign up
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
