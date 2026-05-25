'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import WorkspaceHeader from './WorkspaceHeader'

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
    </div>
  )
}
