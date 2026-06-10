'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Download, Upload, Plus } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { useContacts } from '@/lib/hooks/useContacts'
import { useUIStore } from '@/lib/stores/ui.store'
import { timeAgo, initials } from '@/lib/utils'
import { ContactActions } from './ContactActions'
import type { Contact } from '@/lib/types/contact.types'

type StageFilter = 'All' | 'New Contact' | 'Contacted' | 'Interested' | 'Discipleship' | 'Joined Church'

const filterStages: StageFilter[] = [
  'All', 'New Contact', 'Contacted', 'Interested', 'Discipleship', 'Joined Church',
]

type Stage = Exclude<StageFilter, 'All'>

const stageStyles: Record<Stage, { bg: string; dot: string; text: string }> = {
  'New Contact':   { bg: '#f3f4f6', dot: '#6b7280', text: '#374151' },
  'Contacted':     { bg: '#fefce8', dot: '#d97706', text: '#92400e' },
  'Interested':    { bg: '#f0fdfa', dot: '#0d9488', text: '#0f766e' },
  'Discipleship':  { bg: '#f5f3ff', dot: '#7c3aed', text: '#5b21b6' },
  'Joined Church': { bg: '#e8f5ee', dot: '#2E9E52', text: '#166534' },
}

function StagePill({ stage }: { stage: Stage }) {
  const s = stageStyles[stage]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium"
      style={{ backgroundColor: s.bg, color: s.text, fontSize: 12 }}
    >
      <span className="rounded-full shrink-0" style={{ width: 6, height: 6, backgroundColor: s.dot }} />
      {stage}
    </span>
  )
}

function SourceChip({ source }: { source: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 font-medium"
      style={{ backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: 11, letterSpacing: '0.04em' }}
    >
      {source}
    </span>
  )
}

function ContactRow({ contact }: { contact: Contact }) {
  const abbr = initials(contact.firstName, contact.lastName)
  const displayName = [contact.firstName, contact.lastName].filter(Boolean).join(' ')

  return (
    <TableRow style={{ borderColor: '#f3f4f6' }}>
      {/* Name */}
      <TableCell>
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex items-center justify-center rounded-full font-bold shrink-0"
            style={{ width: 40, height: 40, backgroundColor: '#e8f5ee', color: '#2E9E52', fontSize: 13 }}
          >
            {abbr}
          </div>
          <span className="font-semibold truncate" style={{ fontSize: 14, color: '#111827' }}>
            {displayName}
          </span>
        </div>
      </TableCell>

      {/* Phone */}
      <TableCell style={{ color: '#6b7280', fontSize: 14 }}>
        {contact.phone || '—'}
      </TableCell>

      {/* Stage */}
      <TableCell>
        <StagePill stage="New Contact" />
      </TableCell>

      {/* Source */}
      <TableCell>
        <SourceChip source="MANUAL" />
      </TableCell>

      {/* Evangelist */}
      <TableCell style={{ color: '#374151', fontSize: 14 }}>
        —
      </TableCell>

      {/* Last interaction */}
      <TableCell style={{ color: '#9ca3af', fontSize: 14 }}>
        {timeAgo(contact.createdAt)}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <ContactActions contact={contact} />
      </TableCell>
    </TableRow>
  )
}

export default function ContactsPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<StageFilter>('All')
  const openContactModal = useUIStore((state) => state.openContactModal)
  const { data, isLoading, isError } = useContacts()

  const contacts = data?.data ?? []

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return contacts.filter((c) => {
      const name = [c.firstName, c.lastName].filter(Boolean).join(' ').toLowerCase()
      const matchesSearch = name.includes(q) || (c.phone ?? '').includes(q)
      return matchesSearch
    })
  }, [contacts, search])

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: 26, color: '#111827' }}>
            Contacts
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            {isLoading ? 'Loading…' : `${contacts.length} total contact${contacts.length !== 1 ? 's' : ''} in your workspace`}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-150">
            <Download size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-150">
            <Upload size={15} />
            Import
          </button>
          <button
            onClick={openContactModal}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-[#2E9E52] hover:bg-[#268a47] transition-colors duration-150"
          >
            <Plus size={15} strokeWidth={2.5} />
            New contact
          </button>
        </div>
      </div>

      {/* Search + stage filters */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0" style={{ width: 240 }}>
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#9ca3af' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full rounded-full py-2.5 pl-9 pr-4 text-sm outline-none transition-all duration-150 border"
            style={{
              backgroundColor: '#f9fafb',
              borderColor: search ? '#2E9E52' : '#e5e7eb',
              boxShadow: search ? '0 0 0 3px rgba(46,158,82,0.1)' : 'none',
            }}
          />
        </div>

        <button
          className="flex items-center justify-center rounded-full transition-colors duration-150"
          style={{ width: 36, height: 36, color: '#6b7280' }}
          title="Advanced filters"
        >
          <Filter size={16} />
        </button>

        <div className="flex items-center gap-2">
          {filterStages.map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveFilter(stage)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150"
              style={
                activeFilter === stage
                  ? { backgroundColor: '#2E9E52', color: '#ffffff', border: '1px solid #2E9E52', fontSize: 12 }
                  : { backgroundColor: '#ffffff', color: '#374151', border: '1px solid #e5e7eb', fontSize: 12 }
              }
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #f0f0f0' }}>
        <Table>
          <TableHeader style={{ borderColor: '#f3f4f6' }}>
            <TableRow style={{ borderColor: '#f3f4f6' }}>
              {['NAME', 'PHONE', 'STAGE', 'SOURCE', 'EVANGELIST', 'LAST INTERACTION', ''].map((col) => (
                <TableHead
                  key={col}
                  style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.06em' }}
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center py-12">
                    <div className="w-7 h-7 rounded-full border-4 border-[#e8f5ee] border-t-[#2E9E52] animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell colSpan={6}>
                  <p className="text-center py-12 text-sm" style={{ color: '#ef4444' }}>
                    Failed to load contacts. Please refresh and try again.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <p className="text-center py-12 text-sm" style={{ color: '#9ca3af' }}>
                    {contacts.length === 0 ? 'No contacts yet. Add your first one.' : 'No contacts match your search.'}
                  </p>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && filtered.map((contact) => (
              <ContactRow key={contact.id} contact={contact} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
