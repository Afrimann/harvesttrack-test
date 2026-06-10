'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Wheat, LogOut, Loader2 } from 'lucide-react'
import { useLogout } from '@/lib/hooks/useAuth'

export default function LogoutPage() {
  const router = useRouter()
  const { mutate: logout, isPending } = useLogout()

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#0d1f16' }}
    >
      {/* Radial glow behind the card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(46,158,82,0.12) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#162a1e', border: '1px solid #1e3d29' }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: '#2E9E52' }} />

        <div className="flex flex-col items-center px-8 pt-8 pb-9 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 self-start">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ width: 28, height: 28, backgroundColor: '#2E9E52' }}
            >
              <Wheat size={15} color="#fff" />
            </div>
            <span className="text-white font-bold text-sm">HarvestTrack</span>
          </div>

          {/* Icon */}
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
            className="flex items-center justify-center rounded-full"
            style={{ width: 64, height: 64, backgroundColor: '#1e3d29' }}
          >
            <LogOut size={28} color="#2E9E52" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="text-center"
          >
            <h2 className="text-white font-semibold text-xl mb-2">Sign out?</h2>
            <p style={{ color: '#86a898', fontSize: 14, lineHeight: '1.5' }}>
              You&apos;ll need to sign back in to access your workspace and data.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.35 }}
            className="flex flex-col gap-3 w-full"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => logout()}
              disabled={isPending}
              className="flex items-center justify-center gap-2 w-full rounded-xl py-3 font-semibold text-sm transition-opacity"
              style={{
                backgroundColor: '#2E9E52',
                color: '#ffffff',
                opacity: isPending ? 0.8 : 1,
              }}
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing out…
                </>
              ) : (
                'Yes, sign me out'
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.back()}
              disabled={isPending}
              className="w-full rounded-xl py-3 font-semibold text-sm transition-colors"
              style={{
                backgroundColor: '#1e3d29',
                color: '#9fbfaf',
                border: '1px solid #2a4d38',
              }}
            >
              Cancel
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
