'use client'
import { Plus } from 'lucide-react'
import StatCards from '@/features/workspace/dashboard/StatCards'
import QRScansChart from '@/features/workspace/dashboard/QRScansChart'
import RecentActivity from '@/features/workspace/dashboard/RecentActivity'
import TeamPerformanceChart from '@/features/workspace/dashboard/TeamPerformanceChart'
import UpcomingFollowUps from '@/features/workspace/dashboard/UpcomingFollowUps'
import RecentContacts from '@/features/workspace/dashboard/RecentContacts'
import { useUserStore } from '@/lib/stores/user.store'
import { useWorkspaceStore } from '@/lib/stores/workspace.store'

export default function Dashboard() {
  const user = useUserStore((state) => state.user)
  const workspace = useWorkspaceStore((state) => state.workspace)
  const workspaceName = workspace?.name ?? user?.workspaceName
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5">
      {/* Welcome header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-bold text-2xl sm:text-[26px]" style={{ color: '#111827' }}>
            Welcome back, {user?.username || user?.email || 'User'}!
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            Here&apos;s what&apos;s happening in the {workspaceName} workspace today.
          </p>
        </div>
        <button
          className="md:flex items-center gap-1.5 hidden rounded-xl px-4 py-2.5 font-semibold text-white text-sm trans  ition-colors duration-150 shrink-0 bg-[#2E9E52] hover:bg-[#268a47]"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add contact
        </button>
      </div>

      {/* Stat cards */}
      <StatCards />

      {/* QR chart + Recent activity */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-[1fr_340px]">
        <QRScansChart />
        <RecentActivity />
      </div>

      {/* Team performance + Upcoming follow-ups */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-[1fr_340px]">
        <TeamPerformanceChart />
        <UpcomingFollowUps />
      </div>

      {/* Recent contacts */}
      <RecentContacts />
    </div>
  )
}
