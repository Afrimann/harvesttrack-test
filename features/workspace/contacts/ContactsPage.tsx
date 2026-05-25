'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Download, Upload, Plus } from 'lucide-react'

type Stage = 'All' | 'New Contact' | 'Contacted' | 'Interested' | 'Discipleship' | 'Joined Church'
type Source = 'QR' | 'MANUAL' | 'IMPORT' | 'EVENT'

interface Contact {
  initials: string
  name: string
  phone: string
  stage: Exclude<Stage, 'All'>
  source: Source
  evangelist: string
  lastInteraction: string
}

const contacts: Contact[] = [
  { initials: 'AO', name: 'Amara Okafor',    phone: '+254 709360662', stage: 'New Contact',  source: 'QR',     evangelist: 'Pastor James', lastInteraction: '5 days ago' },
  { initials: 'DM', name: 'David Mensah',    phone: '+254 733573129', stage: 'New Contact',  source: 'MANUAL', evangelist: 'Sister Anna',  lastInteraction: '3 days ago' },
  { initials: 'GM', name: 'Grace Mwangi',    phone: '+254 705734339', stage: 'Contacted',    source: 'QR',     evangelist: 'Bro. Tunde',   lastInteraction: '1 day ago' },
  { initials: 'JB', name: 'Joseph Banda',    phone: '+254 788627227', stage: 'Contacted',    source: 'QR',     evangelist: 'Sister Joy',   lastInteraction: '2 days ago' },
  { initials: 'EA', name: 'Esther Adeyemi',  phone: '+254 710829951', stage: 'Interested',   source: 'IMPORT', evangelist: 'Pastor Eli',   lastInteraction: 'about 1 month ago' },
  { initials: 'SN', name: 'Samuel Nkomo',    phone: '+254 748823568', stage: 'Interested',   source: 'EVENT',  evangelist: 'Pastor James', lastInteraction: '3 days ago' },
  { initials: 'RO', name: 'Ruth Achieng',    phone: '+254 701234567', stage: 'Discipleship', source: 'QR',     evangelist: 'Bro. Tunde',   lastInteraction: '6 days ago' },
  { initials: 'HO', name: 'Hannah Osei',     phone: '+254 712345678', stage: 'Discipleship', source: 'MANUAL', evangelist: 'Sister Anna',  lastInteraction: '2 days ago' },
  { initials: 'MD', name: 'Michael Dlamini', phone: '+254 723456789', stage: 'Joined Church', source: 'EVENT', evangelist: 'Pastor James', lastInteraction: '10 days ago' },
  { initials: 'LO', name: 'Lydia Ofori',     phone: '+254 734567890', stage: 'Joined Church', source: 'QR',   evangelist: 'Sister Joy',   lastInteraction: '7 days ago' },
]

const stageStyles: Record<Exclude<Stage, 'All'>, { bg: string; dot: string; text: string }> = {
  'New Contact':  { bg: '#f3f4f6', dot: '#6b7280', text: '#374151' },
  'Contacted':    { bg: '#fefce8', dot: '#d97706', text: '#92400e' },
  'Interested':   { bg: '#f0fdfa', dot: '#0d9488', text: '#0f766e' },
  'Discipleship': { bg: '#f5f3ff', dot: '#7c3aed', text: '#5b21b6' },
  'Joined Church':{ bg: '#e8f5ee', dot: '#2E9E52', text: '#166534' },
}

const filterStages: Stage[] = ['All', 'New Contact', 'Contacted', 'Interested', 'Discipleship', 'Joined Church']

const columns = ['NAME', 'PHONE', 'STAGE', 'SOURCE', 'EVANGELIST', 'LAST INTERACTION']

export default function ContactsPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<Stage>('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return contacts
      .filter((c) => activeFilter === 'All' || c.stage === activeFilter)
      .filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
  }, [search, activeFilter])

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: 26, color: '#111827' }}>
            Contacts
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            {contacts.length} total contacts in your workspace
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
          <button className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-[#2E9E52] hover:bg-[#268a47] transition-colors duration-150">
            <Plus size={15} strokeWidth={2.5} />
            New contact
          </button>
        </div>
      </div>

      {/* Search + stage filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative" style={{ width: 320 }}>
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

        {/* Filter icon */}
        <button
          className="flex items-center justify-center rounded-full transition-colors duration-150"
          style={{ width: 36, height: 36, color: '#6b7280' }}
          title="Advanced filters"
        >
          <Filter size={16} />
        </button>

        {/* Stage pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {filterStages.map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveFilter(stage)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150"
              style={
                activeFilter === stage
                  ? { backgroundColor: '#2E9E52', color: '#ffffff', border: '1px solid #2E9E52' }
                  : { backgroundColor: '#ffffff', color: '#374151', border: '1px solid #e5e7eb' }
              }
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #f0f0f0' }}>
        {/* Header row */}
        <div
          className="grid px-5 py-3"
          style={{
            gridTemplateColumns: '2fr 1.4fr 1.4fr 0.9fr 1.2fr 1.2fr',
            borderBottom: '1px solid #f3f4f6',
          }}
        >
          {columns.map((col) => (
            <p
              key={col}
              className="font-semibold tracking-wide"
              style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.06em' }}
            >
              {col}
            </p>
          ))}
        </div>

        {/* Data rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center" style={{ color: '#9ca3af', fontSize: 14 }}>
            No contacts match your search.
          </div>
        ) : (
          filtered.map((c, i) => {
            const s = stageStyles[c.stage]
            return (
              <div
                key={i}
                className="grid items-center px-5 py-3.5 cursor-pointer transition-colors duration-150 hover:bg-gray-50"
                style={{
                  gridTemplateColumns: '2fr 1.4fr 1.4fr 0.9fr 1.2fr 1.2fr',
                  borderBottom: i < filtered.length - 1 ? '1px solid #f9fafb' : 'none',
                }}
              >
                {/* Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex items-center justify-center rounded-full font-bold shrink-0"
                    style={{ width: 36, height: 36, backgroundColor: '#e8f5ee', color: '#2E9E52', fontSize: 12 }}
                  >
                    {c.initials}
                  </div>
                  <span className="font-semibold truncate" style={{ fontSize: 14, color: '#111827' }}>
                    {c.name}
                  </span>
                </div>

                {/* Phone */}
                <span style={{ fontSize: 14, color: '#6b7280' }}>{c.phone}</span>

                {/* Stage */}
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium"
                    style={{ backgroundColor: s.bg, color: s.text, fontSize: 12 }}
                  >
                    <span
                      className="rounded-full inline-block shrink-0"
                      style={{ width: 6, height: 6, backgroundColor: s.dot }}
                    />
                    {c.stage}
                  </span>
                </div>

                {/* Source */}
                <div>
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-1 font-medium"
                    style={{ backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: 11, letterSpacing: '0.04em' }}
                  >
                    {c.source}
                  </span>
                </div>

                {/* Evangelist */}
                <span style={{ fontSize: 14, color: '#374151' }}>{c.evangelist}</span>

                {/* Last interaction */}
                <span style={{ fontSize: 14, color: '#9ca3af' }}>{c.lastInteraction}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
