'use client'
import { Plus } from 'lucide-react'
import StatCards from '@/features/workspace/dashboard/StatCards'
import QRScansChart from '@/features/workspace/dashboard/QRScansChart'
import RecentActivity from '@/features/workspace/dashboard/RecentActivity'
import TeamPerformanceChart from '@/features/workspace/dashboard/TeamPerformanceChart'
import UpcomingFollowUps from '@/features/workspace/dashboard/UpcomingFollowUps'
import RecentContacts from '@/features/workspace/dashboard/RecentContacts'
import { useAuthStore } from '@/lib/stores/auth.store'

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const email = user?.email 
  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Welcome header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: 26, color: '#111827' }}>
            Welcome back, {email}
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Here&apos;s what&apos;s happening in the Grace workspace today.
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-white text-sm transition-colors duration-150 shrink-0 bg-[#2E9E52] hover:bg-[#268a47]"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add contact
        </button>
      </div>

      {/* Stat cards */}
      <StatCards />

      {/* QR chart + Recent activity */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 340px' }}>
        <QRScansChart />
        <RecentActivity />
      </div>

      {/* Team performance + Upcoming follow-ups */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 340px' }}>
        <TeamPerformanceChart />
        <UpcomingFollowUps />
      </div>

      {/* Recent contacts */}
      <RecentContacts />
    </div>
  )
}
