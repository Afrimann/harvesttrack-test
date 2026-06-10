'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { contactRepository } from '@/lib/repositories/contact.repository'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useWorkspaceStore } from '@/lib/stores/workspace.store'
import { useUIStore } from '@/lib/stores/ui.store'
import { HttpError } from '@/lib/types/api.types'
import type { CreateContactRequest } from '@/lib/types/contact.types'

function errorMsg(error: unknown, fallback: string) {
  return error instanceof HttpError ? error.message : fallback
}

export function useContact(contactId: string) {
  const { accessToken } = useAuthStore()
  const workspace = useWorkspaceStore((state) => state.workspace)

  return useQuery({
    queryKey: ['contacts', workspace?.id, contactId],
    queryFn: () => contactRepository.getContactById(workspace!.id, contactId, accessToken!),
    enabled: !!accessToken && !!workspace?.id && !!contactId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useContacts() {
  const { accessToken } = useAuthStore()
  const workspace = useWorkspaceStore((state) => state.workspace)

  return useQuery({
    queryKey: ['contacts', workspace?.id],
    queryFn: () => contactRepository.getContacts(workspace!.id, accessToken!),
    enabled: !!accessToken && !!workspace?.id,
    staleTime: 2 * 60 * 1000,
  })
}

export function useCreateContact() {
  const { accessToken } = useAuthStore()
  const workspace = useWorkspaceStore((state) => state.workspace)
  const closeContactModal = useUIStore((state) => state.closeContactModal)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateContactRequest) =>
      contactRepository.createContact(workspace!.id, data, accessToken!),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contacts', workspace?.id] })
      const name = [response.data.firstName, response.data.lastName].filter(Boolean).join(' ')
      toast.success(`${name} added to contacts.`)
      closeContactModal()
    },
    onError: (error) => {
      toast.error(errorMsg(error, 'Could not add contact. Please try again.'))
    },
  })
}

export function useUpdateContact() {
  const { accessToken } = useAuthStore()
  const workspace = useWorkspaceStore((state) => state.workspace)
  const closeEditContact = useUIStore((state) => state.closeEditContact)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateContactRequest> }) =>
      contactRepository.updateContact(workspace!.id, id, data, accessToken!),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contacts', workspace?.id] })
      const name = [response.data.firstName, response.data.lastName].filter(Boolean).join(' ')
      toast.success(`${name} updated.`)
      closeEditContact()
    },
    onError: (error) => {
      toast.error(errorMsg(error, 'Could not update contact. Please try again.'))
    },
  })
}

export function useDeleteContact() {
  const { accessToken } = useAuthStore()
  const workspace = useWorkspaceStore((state) => state.workspace)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contactId: string) =>
      contactRepository.removeContact(workspace!.id, contactId, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts', workspace?.id] })
      toast.success('Contact deleted.')
    },
    onError: (error) => {
      toast.error(errorMsg(error, 'Could not delete contact. Please try again.'))
    },
  })
}
