"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wheat } from "lucide-react";
import { useCreateWorkspace } from "@/lib/hooks/useAuth";
import { HttpError } from "@/lib/types/api.types";

export default function CreateWorkspacePage() {
  const [name, setName] = useState("");
  const createWorkspace = useCreateWorkspace();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createWorkspace.mutate({ name });
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ backgroundColor: "#e8f5ee" }}
        >
          <Wheat size={22} color="#2E9E52" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Create a new workspace
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Each workspace is a separate environment for a team or organisation.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {createWorkspace.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {createWorkspace.error instanceof HttpError
                ? createWorkspace.error.message
                : "Something went wrong. Please try again."}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="label">
              Workspace name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Grace Community Church"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input h-12"
              autoFocus
            />
          </div>

          <motion.button
            type="submit"
            disabled={createWorkspace.isPending}
            className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 0.97 }}
          >
            {createWorkspace.isPending ? "Creating…" : "Create workspace"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
