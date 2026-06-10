"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useOAuthCallback } from "@/lib/hooks/useAuth";

function OAuthCallbackInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const oauthCallback = useOAuthCallback();
  const called = useRef(false);

  useEffect(() => {
    if (!token || called.current) return;
    called.current = true;
    oauthCallback.mutate(token);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] px-8 py-12 w-full max-w-sm text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {oauthCallback.isError ? (
        <>
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign-in failed</h2>
          <p className="text-sm text-gray-400">Redirecting you back…</p>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-full border-4 border-[#e8f5ee] border-t-[#2E9E52] animate-spin mx-auto mb-5" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Signing you in…</h2>
          <p className="text-sm text-gray-400">
            {!token ? "No token found in this link." : "This will only take a moment."}
          </p>
        </>
      )}
    </motion.div>
  );
}

export default function OAuthCallbackPage() {
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
      <Suspense
        fallback={
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] px-8 py-12 w-full max-w-sm text-center">
            <div className="w-14 h-14 rounded-full border-4 border-[#e8f5ee] border-t-[#2E9E52] animate-spin mx-auto mb-5" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Signing you in…</h2>
            <p className="text-sm text-gray-400">This will only take a moment.</p>
          </div>
        }
      >
        <OAuthCallbackInner />
      </Suspense>
    </div>
  );
}
