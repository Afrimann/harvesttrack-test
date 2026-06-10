"use client";

import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Provider = "google" | "github" | "apple";

const providers: { id: Provider; label: string; icon: React.ReactNode }[] = [
  { id: "google", label: "Google", icon: <FcGoogle className="text-xl shrink-0" /> },
  { id: "github", label: "GitHub", icon: <FaGithub className="text-xl shrink-0" /> },
  { id: "apple", label: "Apple", icon: <FaApple className="text-xl shrink-0" /> },
];

function startOAuth(provider: Provider) {
  window.location.href = `${BASE_URL}/api/auth/oauth/${provider}`;
}

export default function OAuthButtons() {
  return (
    <div className="flex flex-col gap-2">
      {providers.map(({ id, label, icon }) => (
        <motion.button
          key={id}
          type="button"
          onClick={() => startOAuth(id)}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl
                     hover:bg-gray-50 hover:border-gray-300
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E52]/40
                     transition-all duration-200 shadow-sm"
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
        >
          {icon}
          Continue with {label}
        </motion.button>
      ))}
    </div>
  );
}
