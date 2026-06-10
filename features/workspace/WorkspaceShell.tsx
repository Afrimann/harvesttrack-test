'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth.store'
import Sidebar from './Sidebar'
import WorkspaceHeader from './WorkspaceHeader'
import NewContactModal from './contacts/NewContactModal'
import EditContactModal from './contacts/EditContactModal'

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setHasMounted(true)
    const mq = window.matchMedia('(max-width: 1024px)')
    const mobile = mq.matches
    setIsMobile(mobile)
    setSidebarOpen(!mobile)

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      setSidebarOpen(!e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Close drawer on route change (mobile only)
  useEffect(() => {
    if (isMobile) setSidebarOpen(false)
  }, [pathname, isMobile])

  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.replace('/auth')
    }
  }, [hasMounted, isAuthenticated, router])

  if (!hasMounted || !isAuthenticated) return null

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Desktop sidebar (inline) ── */}
      {!isMobile && <Sidebar isOpen={sidebarOpen} />}

      {/* ── Mobile drawer + backdrop ── */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 transition-opacity duration-300"
            style={{
              backgroundColor: 'rgba(0,0,0,0.45)',
              opacity: sidebarOpen ? 1 : 0,
              pointerEvents: sidebarOpen ? 'auto' : 'none',
            }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            className="fixed left-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out"
            style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <Sidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* ── Main content ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <WorkspaceHeader
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f9fafb' }}>
          {children}
        </main>
      </div>

      <NewContactModal />
      <EditContactModal />
    </div>
  )
}
