import { create } from 'zustand'
import type { Contact } from '@/lib/types/contact.types'

interface UIState {
  contactModalOpen: boolean
  openContactModal: () => void
  closeContactModal: () => void

  editingContact: Contact | null
  openEditContact: (contact: Contact) => void
  closeEditContact: () => void
}

export const useUIStore = create<UIState>((set) => ({
  contactModalOpen: false,
  openContactModal: () => set({ contactModalOpen: true }),
  closeContactModal: () => set({ contactModalOpen: false }),

  editingContact: null,
  openEditContact: (contact) => set({ editingContact: contact }),
  closeEditContact: () => set({ editingContact: null }),
}))
