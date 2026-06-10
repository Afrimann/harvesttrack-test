'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useUIStore } from '@/lib/stores/ui.store'
import { useCreateContact } from '@/lib/hooks/useContacts'
import type { CreateContactRequest } from '@/lib/types/contact.types'

type FormData = CreateContactRequest

const empty: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  state: '',
  zip: '',
  address: '',
}

const inputClass =
  'w-full rounded-xl px-3 py-2.5 text-sm text-gray-900 outline-none transition-all duration-150 border'
const baseStyle = { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }
const focusStyle = {
  backgroundColor: '#ffffff',
  borderColor: '#2E9E52',
  boxShadow: '0 0 0 3px rgba(46,158,82,0.1)',
}

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    return (
      <input
        {...props}
        ref={ref}
        className={inputClass}
        style={baseStyle}
        onFocus={(e) => { Object.assign(e.currentTarget.style, focusStyle); props.onFocus?.(e) }}
        onBlur={(e) => { Object.assign(e.currentTarget.style, baseStyle); props.onBlur?.(e) }}
      />
    )
  }
)

export default function NewContactModal() {
  const { contactModalOpen, closeContactModal } = useUIStore()
  const [form, setForm] = useState<FormData>(empty)
  const createContact = useCreateContact()
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (contactModalOpen) {
      setForm(empty)
      setTimeout(() => firstInputRef.current?.focus(), 60)
    }
  }, [contactModalOpen])

  useEffect(() => {
    if (!contactModalOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeContactModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [contactModalOpen, closeContactModal])

  function patch(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const payload: CreateContactRequest = { firstName: form.firstName }
    if (form.lastName) payload.lastName = form.lastName
    if (form.email) payload.email = form.email
    if (form.phone) payload.phone = form.phone
    if (form.country) payload.country = form.country
    if (form.city) payload.city = form.city
    if (form.state) payload.state = form.state
    if (form.zip) payload.zip = form.zip
    if (form.address) payload.address = form.address
    createContact.mutate(payload)
  }

  return (
    <AnimatePresence>
      {contactModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeContactModal}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="new-contact-title"
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col pointer-events-auto"
              style={{ maxHeight: '90vh' }}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5 border-b shrink-0"
                style={{ borderColor: '#f0f0f0' }}
              >
                <div>
                  <h2 id="new-contact-title" className="font-semibold text-gray-900" style={{ fontSize: 17 }}>
                    New contact
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
                    Add someone to your workspace
                  </p>
                </div>
                <button
                  onClick={closeContactModal}
                  className="flex items-center justify-center rounded-full transition-colors duration-150"
                  style={{ width: 32, height: 32, color: '#9ca3af' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  aria-label="Close"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
                <div className="px-6 py-5 flex flex-col gap-5">

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                        First name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <Input
                        ref={firstInputRef}
                        type="text"
                        placeholder="Amara"
                        value={form.firstName}
                        onChange={(e) => patch('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                        Last name
                      </label>
                      <Input
                        type="text"
                        placeholder="Okafor"
                        value={form.lastName}
                        onChange={(e) => patch('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                        Phone
                      </label>
                      <Input
                        type="tel"
                        placeholder="+254 700 000 000"
                        value={form.phone}
                        onChange={(e) => patch('phone', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => patch('email', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, backgroundColor: '#f3f4f6' }} />

                  {/* Address */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>
                      Address <span className="font-normal normal-case" style={{ color: '#9ca3af' }}>(optional)</span>
                    </p>

                    <Input
                      type="text"
                      placeholder="Street address"
                      value={form.address}
                      onChange={(e) => patch('address', e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="text"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => patch('city', e.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="State / Province"
                        value={form.state}
                        onChange={(e) => patch('state', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="text"
                        placeholder="ZIP / Postal code"
                        value={form.zip}
                        onChange={(e) => patch('zip', e.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Country"
                        value={form.country}
                        onChange={(e) => patch('country', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0"
                  style={{ borderColor: '#f0f0f0', backgroundColor: '#fafafa' }}
                >
                  <button
                    type="button"
                    onClick={closeContactModal}
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createContact.isPending || !form.firstName.trim()}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#2E9E52' }}
                    onMouseEnter={(e) => {
                      if (!createContact.isPending && form.firstName.trim())
                        e.currentTarget.style.backgroundColor = '#268a47'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2E9E52'
                    }}
                  >
                    {createContact.isPending ? 'Saving…' : 'Save contact'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
