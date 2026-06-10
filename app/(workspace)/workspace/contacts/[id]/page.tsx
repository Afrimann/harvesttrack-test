'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Pencil,
  Trash2,
  Globe,
} from 'lucide-react'
import { useContact, useDeleteContact } from '@/lib/hooks/useContacts'
import { useUIStore } from '@/lib/stores/ui.store'
import { timeAgo, initials } from '@/lib/utils'
import EditContactModal from '@/features/workspace/contacts/EditContactModal'

function ContactSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-5">
      <div className="h-8 w-32 rounded-lg bg-gray-100" />
      <div className="rounded-2xl bg-white p-6 sm:p-8" style={{ border: '1px solid #f0f0f0' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-100 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-6 sm:h-7 w-40 sm:w-48 rounded-lg bg-gray-100" />
            <div className="h-4 w-28 sm:w-32 rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white p-6 h-40" style={{ border: '1px solid #f0f0f0' }} />
        <div className="rounded-2xl bg-white p-6 h-40" style={{ border: '1px solid #f0f0f0' }} />
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value?: string | null
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
        style={{ width: 32, height: 32, backgroundColor: '#f3f4f6' }}
      >
        <span style={{ color: '#6b7280' }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide mb-0.5" style={{ color: '#9ca3af' }}>
          {label}
        </p>
        <p
          className="text-sm font-medium truncate"
          style={{ color: value ? '#111827' : '#d1d5db' }}
        >
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data, isLoading, isError } = useContact(id)
  const deleteContact = useDeleteContact()
  const openEditContact = useUIStore((state) => state.openEditContact)

  const contact = data?.data

  function handleDelete() {
    if (!contact) return
    if (!confirm(`Delete ${contact.firstName}? This cannot be undone.`)) return
    deleteContact.mutate(contact.id, {
      onSuccess: () => router.replace('/workspace/contacts'),
    })
  }

  const displayName = contact
    ? [contact.firstName, contact.lastName].filter(Boolean).join(' ')
    : ''

  const abbr = contact ? initials(contact.firstName, contact.lastName) : ''

  const hasAddress = contact && (
    contact.address || contact.city || contact.state || contact.zip || contact.country
  )

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto flex flex-col gap-5">
      {/* Back */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium transition-colors duration-150"
          style={{ color: '#6b7280' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        >
          <ArrowLeft size={16} />
          Back to contacts
        </button>

        {contact && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEditContact(contact)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold border transition-colors duration-150"
              style={{ color: '#374151', borderColor: '#e5e7eb', backgroundColor: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteContact.isPending}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-150 disabled:opacity-50"
              style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
            >
              <Trash2 size={14} />
              {deleteContact.isPending ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      {isLoading && <ContactSkeleton />}

      {isError && (
        <div
          className="bg-white rounded-2xl p-12 text-center"
          style={{ border: '1px solid #f0f0f0' }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: '#ef4444' }}>
            Could not load contact.
          </p>
          <button
            onClick={() => router.back()}
            className="text-sm underline"
            style={{ color: '#9ca3af' }}
          >
            Go back
          </button>
        </div>
      )}

      {contact && (
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero card */}
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1px solid #f0f0f0' }}
          >
            {/* Gradient banner */}
            <div
              className="h-20 w-full"
              style={{
                background: 'linear-gradient(135deg, #162a1e 0%, #1e3d29 40%, #2E9E52 100%)',
              }}
            />
            <div className="px-4 sm:px-8 pb-6 sm:pb-7">
              {/* Avatar overlapping banner */}
              <div className="flex items-end justify-between" style={{ marginTop: -32 }}>
                <div
                  className="flex items-center justify-center rounded-2xl font-bold text-white shrink-0"
                  style={{
                    width: 72,
                    height: 72,
                    backgroundColor: '#2E9E52',
                    fontSize: 26,
                    border: '4px solid #ffffff',
                    boxShadow: '0 4px 12px rgba(46,158,82,0.25)',
                  }}
                >
                  {abbr}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: '#e8f5ee', color: '#166534' }}
                  >
                    <span
                      className="rounded-full"
                      style={{ width: 6, height: 6, backgroundColor: '#2E9E52', display: 'inline-block' }}
                    />
                    New Contact
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <h1 className="font-bold text-gray-900 text-xl sm:text-2xl">
                  {displayName}
                </h1>
                {contact.email && (
                  <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>
                    {contact.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Contact info */}
            <div
              className="bg-white rounded-2xl p-6 flex flex-col gap-5"
              style={{ border: '1px solid #f0f0f0' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>
                Contact info
              </p>
              <InfoRow icon={<Mail size={15} />} label="Email" value={contact.email} />
              <InfoRow icon={<Phone size={15} />} label="Phone" value={contact.phone} />
            </div>

            {/* Address */}
            <div
              className="bg-white rounded-2xl p-6 flex flex-col gap-5"
              style={{ border: '1px solid #f0f0f0' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>
                Address
              </p>
              {hasAddress ? (
                <>
                  <InfoRow icon={<MapPin size={15} />} label="Street" value={contact.address} />
                  <InfoRow
                    icon={<Building2 size={15} />}
                    label="City / State"
                    value={[contact.city, contact.state].filter(Boolean).join(', ') || undefined}
                  />
                  <InfoRow icon={<Globe size={15} />} label="Country" value={contact.country} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 py-6">
                  <MapPin size={28} color="#e5e7eb" />
                  <p className="text-xs mt-2" style={{ color: '#d1d5db' }}>
                    No address on file
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div
            className="bg-white rounded-2xl px-5 py-5 sm:px-6"
            style={{ border: '1px solid #f0f0f0' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{ width: 32, height: 32, backgroundColor: '#f3f4f6' }}
                >
                  <Calendar size={14} color="#6b7280" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9ca3af' }}>
                    Added
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {new Date(contact.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                    <span className="font-normal ml-1.5" style={{ color: '#9ca3af' }}>
                      ({timeAgo(contact.createdAt)})
                    </span>
                  </p>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px" style={{ backgroundColor: '#f0f0f0' }} />
              <div className="block sm:hidden h-px w-full" style={{ backgroundColor: '#f3f4f6' }} />

              <div className="flex items-center gap-2.5">
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{ width: 32, height: 32, backgroundColor: '#f3f4f6' }}
                >
                  <Calendar size={14} color="#6b7280" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9ca3af' }}>
                    Last updated
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {new Date(contact.updatedAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                    <span className="font-normal ml-1.5" style={{ color: '#9ca3af' }}>
                      ({timeAgo(contact.updatedAt)})
                    </span>
                  </p>
                </div>
              </div>

              <div className="sm:ml-auto">
                <p className="text-xs" style={{ color: '#d1d5db' }}>
                  ID: {contact.id.slice(0, 8)}…
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <EditContactModal />
    </div>
  )
}
