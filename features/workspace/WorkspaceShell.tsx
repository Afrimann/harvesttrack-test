'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth.store'
import Sidebar from './Sidebar'
import WorkspaceHeader from './WorkspaceHeader'
import NewContactModal from './contacts/NewContactModal'
import EditContactModal from './contacts/EditContactModal'

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  // hasMounted gates the auth check until after Zustand has rehydrated from
  // localStorage. Without this, isAuthenticated is always false on the first
  // render, which causes a redirect loop: WorkspaceShell sends the user to
  // /auth, the middleware sees the cookie and bounces them back, repeat.
  const [hasMounted, setHasMounted] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.replace('/auth')
    }
  }, [hasMounted, isAuthenticated, router])

  if (!hasMounted || !isAuthenticated) return null

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <WorkspaceHeader
          sidebarOpen={sidebarOpen}
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
