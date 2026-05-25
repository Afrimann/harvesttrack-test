'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Calendar,
  Heart,
  QrCode,
  TrendingUp,
  BarChart2,
  UserCheck,
  Wheat,
  CreditCard,
  type LucideIcon,
} from 'lucide-react'

interface NavItem {
  label: string
  icon: LucideIcon
  href: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/workspace/dashboard' },
      { label: 'Contacts', icon: Users, href: '/workspace/contacts' },
      { label: 'Pipeline', icon: GitBranch, href: '/workspace/pipeline' },
      { label: 'Events', icon: Calendar, href: '/workspace/events' },
      { label: 'Prayer Board', icon: Heart, href: '/workspace/prayer-board' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { label: 'QR Analytics', icon: QrCode, href: '/workspace/qr-analytics' },
      { label: 'Pipeline Analytics', icon: TrendingUp, href: '/workspace/pipeline-analytics' },
      { label: 'Team Analytics', icon: BarChart2, href: '/workspace/team-analytics' },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Team', icon: UserCheck, href: '/workspace/team' },
      { label: 'Billing', icon: CreditCard, href: '/workspace/billing' },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className="flex flex-col h-full flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
      style={{
        width: isOpen ? '256px' : '64px',
        backgroundColor: '#162a1e',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0">
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ width: 32, height: 32, backgroundColor: '#2E9E52' }}
        >
          <Wheat size={18} color="#ffffff" />
        </div>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            width: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
            whiteSpace: 'nowrap',
          }}
        >
          <p className="text-white font-bold text-base leading-tight">HarvestTrack</p>
          <p style={{ color: '#86a898', fontSize: 12 }}>Grace Workspace</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-2 scrollbar-none">
        {navSections.map((section) => (
          <div key={section.title} className="mb-4">
            {isOpen && (
              <p
                className="uppercase tracking-wider font-semibold px-3 mb-1"
                style={{ color: '#5a7a67', fontSize: 11 }}
              >
                {section.title}
              </p>
            )}
            {!isOpen && <div className="h-4" />}
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!isOpen ? item.label : undefined}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 mb-0.5 transition-colors duration-150 group"
                  style={{
                    backgroundColor: isActive ? '#1e3d29' : 'transparent',
                    color: isActive ? '#ffffff' : '#9fbfaf',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#1a3324'
                      e.currentTarget.style.color = '#ffffff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#9fbfaf'
                    }
                  }}
                >
                  <item.icon
                    size={18}
                    className="flex-shrink-0"
                    color={isActive ? '#2E9E52' : 'currentColor'}
                  />
                  <span
                    className="text-sm font-medium overflow-hidden transition-all duration-300 whitespace-nowrap"
                    style={{
                      maxWidth: isOpen ? 200 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Plan badge */}
      <div
        className="flex-shrink-0 mx-2 mb-4 rounded-lg p-3 transition-all duration-300"
        style={{ backgroundColor: '#1e3d29' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 28, height: 28, backgroundColor: '#2E9E52' }}
          >
            <span className="text-white font-bold" style={{ fontSize: 10 }}>
              F
            </span>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              width: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
              whiteSpace: 'nowrap',
            }}
          >
            <p className="text-white font-semibold" style={{ fontSize: 13 }}>
              Free plan
            </p>
            <p style={{ color: '#86a898', fontSize: 11 }}>
              Up to 500 contacts • 30 used today
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
