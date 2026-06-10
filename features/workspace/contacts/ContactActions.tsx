'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDeleteContact } from '@/lib/hooks/useContacts'
import { useUIStore } from '@/lib/stores/ui.store'
import type { Contact } from '@/lib/types/contact.types'

interface Props {
  contact: Contact
}

export function ContactActions({ contact }: Props) {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const deleteContact = useDeleteContact()
  const openEditContact = useUIStore((state) => state.openEditContact)

  useEffect(() => { setMounted(true) }, [])

  function openMenu() {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    // flip upward if near bottom of viewport
    const spaceBelow = window.innerHeight - rect.bottom
    const menuHeight = confirmDelete ? 100 : 156
    const top = spaceBelow < menuHeight ? rect.top - menuHeight - 4 : rect.bottom + 4
    setPos({ top, left: rect.right - 176 })
    setConfirmDelete(false)
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    function onOutside(e: MouseEvent) {
      if (
        menuRef.current?.contains(e.target as Node) ||
        btnRef.current?.contains(e.target as Node)
      ) return
      close()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function close() {
    setOpen(false)
    setConfirmDelete(false)
  }

  function handleDelete() {
    deleteContact.mutate(contact.id, {
      onSettled: () => close(),
    })
  }

  const displayName = [contact.firstName, contact.lastName].filter(Boolean).join(' ')

  const menu = (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        width: 176,
        zIndex: 9999,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {confirmDelete ? (
        <div className="p-3.5">
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#374151' }}>
            Delete <strong>{displayName}</strong>? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors duration-150"
              style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteContact.isPending}
              className="flex-1 rounded-lg py-1.5 text-xs font-semibold text-white transition-colors duration-150 disabled:opacity-60"
              style={{ backgroundColor: '#ef4444' }}
              onMouseEnter={(e) => { if (!deleteContact.isPending) e.currentTarget.style.backgroundColor = '#dc2626' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ef4444' }}
            >
              {deleteContact.isPending ? '…' : 'Delete'}
            </button>
          </div>
        </div>
      ) : (
        <div className="py-1">
          <MenuItem
            icon={<Eye size={14} />}
            label="View contact"
            onClick={() => { close(); router.push(`/workspace/contacts/${contact.id}`) }}
          />
          <MenuItem
            icon={<Pencil size={14} />}
            label="Edit contact"
            onClick={() => { close(); openEditContact(contact) }}
          />
          <div style={{ height: 1, backgroundColor: '#f3f4f6', margin: '2px 8px' }} />
          <MenuItem
            icon={<Trash2 size={14} />}
            label="Delete contact"
            danger
            onClick={() => setConfirmDelete(true)}
          />
        </div>
      )}
    </div>
  )

  return (
    <>
      <button
        ref={btnRef}
        onClick={openMenu}
        className="flex items-center justify-center rounded-lg transition-colors duration-150"
        style={{ width: 32, height: 32, color: '#9ca3af' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        aria-label="Contact actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {mounted && open && createPortal(menu, document.body)}
    </>
  )
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-150"
      style={{ color: danger ? '#ef4444' : '#374151' }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = danger ? '#fef2f2' : '#f9fafb')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {icon}
      {label}
    </button>
  )
}
