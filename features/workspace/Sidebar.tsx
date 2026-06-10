'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
  LogOut,
  ChevronsUpDown,
  Check,
  Plus,
} from 'lucide-react'
import { useWorkspaceStore } from '@/lib/stores/workspace.store'
import { useWorkspaces, useActivateWorkspace } from '@/lib/hooks/useWorkspace'

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
      { label: 'Signout', icon: LogOut, href: '/logout' },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const workspace = useWorkspaceStore((state) => state.workspace)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: workspaces } = useWorkspaces()
  const activate = useActivateWorkspace()

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [dropdownOpen])

  // Close dropdown when sidebar collapses
  useEffect(() => {
    if (!isOpen) setDropdownOpen(false)
  }, [isOpen])

  return (
    <aside
      className="flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
      style={{ width: isOpen ? '256px' : '64px', backgroundColor: '#162a1e' }}
    >
      {/* Workspace switcher */}
      <div className="shrink-0" ref={dropdownRef}>
        <button
          onClick={() => isOpen && setDropdownOpen((v) => !v)}
          className="w-full flex items-center gap-3 px-4 py-5 transition-colors duration-150"
          style={{ cursor: isOpen ? 'pointer' : 'default' }}
          onMouseEnter={(e) => { if (isOpen) e.currentTarget.style.backgroundColor = '#1e3d29' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{ width: 32, height: 32, backgroundColor: '#2E9E52' }}
          >
            <Wheat size={18} color="#ffffff" />
          </div>

          <div
            className="flex-1 min-w-0 text-left overflow-hidden transition-all duration-300"
            style={{ width: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, whiteSpace: 'nowrap' }}
          >
            <p className="text-white font-bold text-base leading-tight">HarvestTrack</p>
            <p className="truncate" style={{ color: '#86a898', fontSize: 12 }}>
              {workspace?.name ?? 'No workspace'}
            </p>
          </div>

          {isOpen && (
            <ChevronsUpDown
              size={14}
              color="#86a898"
              className="shrink-0"
              style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}
            />
          )}
        </button>

        {/* Dropdown */}
        {dropdownOpen && isOpen && (
          <div
            className="mx-2 mb-1 rounded-lg overflow-hidden"
            style={{ backgroundColor: '#1a3324', border: '1px solid #2a4d38' }}
          >
            {workspaces && workspaces.length > 0 && (
              <>
                {workspaces.map((ws) => {
                  const isActive = ws.id === workspace?.id
                  return (
                    <button
                      key={ws.id}
                      onClick={() => { activate(ws); setDropdownOpen(false) }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 transition-colors duration-150"
                      style={{ color: isActive ? '#ffffff' : '#9fbfaf' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#253e2d')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span className="shrink-0" style={{ width: 13 }}>
                        {isActive && <Check size={13} color="#2E9E52" />}
                      </span>
                      <span className="text-sm font-medium truncate flex-1 text-left">{ws.name}</span>
                    </button>
                  )
                })}
                <div className="mx-3 my-1" style={{ height: 1, backgroundColor: '#2a4d38' }} />
              </>
            )}

            <button
              onClick={() => { router.push('/workspace/create'); setDropdownOpen(false) }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 transition-colors duration-150"
              style={{ color: '#86a898' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#253e2d')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Plus size={13} className="shrink-0" />
              <span className="text-sm">Create workspace</span>
            </button>
          </div>
        )}
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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 mb-0.5 transition-colors duration-150"
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
                    className="shrink-0"
                    color={isActive ? '#2E9E52' : 'currentColor'}
                  />
                  <span
                    className="text-sm font-medium overflow-hidden transition-all duration-300 whitespace-nowrap"
                    style={{ maxWidth: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}
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
        className="shrink-0 mx-2 mb-4 rounded-lg p-3 transition-all duration-300"
        style={{ backgroundColor: '#1e3d29' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{ width: 28, height: 28, backgroundColor: '#2E9E52' }}
          >
            <span className="text-white font-bold" style={{ fontSize: 10 }}>F</span>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ width: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, whiteSpace: 'nowrap' }}
          >
            <p className="text-white font-semibold" style={{ fontSize: 13 }}>Free plan</p>
            <p style={{ color: '#86a898', fontSize: 11 }}>Up to 500 contacts • 30 used today</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
