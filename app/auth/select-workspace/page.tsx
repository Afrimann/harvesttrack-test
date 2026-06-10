"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wheat, ChevronRight } from "lucide-react";
import { useWorkspaces, useActivateWorkspace } from "@/lib/hooks/useWorkspace";
import { useUserStore } from "@/lib/stores/user.store";

export default function SelectWorkspacePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { data: workspaces, isLoading, isError } = useWorkspaces();
  const activate = useActivateWorkspace();

  // If only one workspace came back, skip this page entirely
  useEffect(() => {
    if (workspaces?.length === 1) activate(workspaces[0]);
  }, [workspaces]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="fixed inset-0 -z-10 bg-white/80 backdrop-blur-sm" aria-hidden="true" />

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Choose a workspace</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.username || user?.email}. Select a workspace to continue.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-[#e8f5ee] border-t-[#2E9E52] animate-spin" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-8">
            <p className="text-sm text-red-500 mb-2">Failed to load workspaces.</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="text-sm text-[#2E9E52] hover:underline"
            >
              Back to login
            </button>
          </div>
        )}

        {/* Workspace list */}
        {workspaces && workspaces.length > 1 && (
          <div className="flex flex-col gap-3">
            {workspaces.map((workspace, i) => (
              <motion.button
                key={workspace.id}
                onClick={() => activate(workspace)}
                className="w-full flex items-center gap-4 px-4 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-left
                           hover:border-[#2E9E52]/40 hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#e8f5ee" }}
                >
                  <Wheat size={18} color="#2E9E52" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{workspace.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {workspace.ownerId === user?.id ? "Owner" : "Member"}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
