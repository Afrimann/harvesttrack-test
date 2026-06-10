'use client'

import { useState } from 'react'
import { useUserStore } from '@/lib/stores/user.store'
import { useUIStore } from '@/lib/stores/ui.store'
import { PanelLeft, Bell, Plus, Search, X } from 'lucide-react'

interface WorkspaceHeaderProps {
  sidebarOpen: boolean
  isMobile: boolean
  onToggle: () => void
}

export default function WorkspaceHeader({ sidebarOpen, isMobile, onToggle }: WorkspaceHeaderProps) {
  const user = useUserStore((state) => state.user)
  const openContactModal = useUIStore((state) => state.openContactModal)
  const [searchOpen, setSearchOpen] = useState(false)

  const initials = user?.email
    ? user.email.split('@')[0].split('.').map((n: string) => n[0]).join('').toUpperCase()
    : 'US'

  return (
    <header
      className="flex items-center gap-3 px-4 py-3 bg-white border-b shrink-0"
      style={{ borderColor: '#e5e5e5', height: 60 }}
    >
      {/* Sidebar toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center rounded-lg transition-colors duration-150 shrink-0"
        style={{ width: 36, height: 36, color: '#4b5563' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <PanelLeft size={20} />
      </button>

      {/* Search — full bar on desktop, expandable on mobile */}
      {isMobile ? (
        <>
          {searchOpen ? (
            <div className="flex-1 relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: '#9ca3af' }}
              />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full rounded-full py-2 pl-9 pr-9 text-sm outline-none"
                style={{
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #2E9E52',
                  boxShadow: '0 0 0 3px rgba(46,158,82,0.1)',
                }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
                style={{ color: '#9ca3af' }}
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center rounded-lg transition-colors duration-150"
              style={{ width: 36, height: 36, color: '#4b5563' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          )}
        </>
      ) : (
        <div className="flex-1 max-w-xl relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#9ca3af' }}
          />
          <input
            type="text"
            placeholder="Search contacts, tasks, events..."
            className="w-full rounded-full py-2 pl-9 pr-4 text-sm outline-none transition-colors duration-150"
            style={{
              backgroundColor: '#f3f4f6',
              border: '1px solid transparent',
              color: '#111827',
              fontSize: 14,
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff'
              e.currentTarget.style.border = '1px solid #2E9E52'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(46,158,82,0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
              e.currentTarget.style.border = '1px solid transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
      )}

      {/* Right actions */}
      <div className={`flex items-center gap-2 shrink-0 ${isMobile && searchOpen ? '' : 'ml-auto'}`}>
        {/* New contact — icon+label on desktop, icon-only on mobile */}
        <button
          onClick={openContactModal}
          className="flex items-center gap-1.5 rounded-full font-semibold text-white transition-all duration-150"
          style={{
            backgroundColor: '#2E9E52',
            fontSize: 14,
            padding: isMobile ? '8px' : '8px 16px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#268a47')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2E9E52')}
          aria-label="New contact"
        >
          <Plus size={16} strokeWidth={2.5} />
          {!isMobile && <span>New contact</span>}
        </button>

        {/* Bell */}
        <button
          className="relative flex items-center justify-center rounded-full transition-colors duration-150"
          style={{ width: 36, height: 36, color: '#4b5563' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span
            className="absolute rounded-full"
            style={{
              top: 7, right: 7,
              width: 8, height: 8,
              backgroundColor: '#ef4444',
              border: '2px solid #ffffff',
            }}
          />
        </button>

        {/* Avatar */}
        <button
          className="flex items-center justify-center rounded-full font-bold text-white shrink-0"
          style={{ width: 36, height: 36, backgroundColor: '#2E9E52', fontSize: 13 }}
          aria-label="User menu"
        >
          {initials}
        </button>
      </div>
    </header>
  )
}
