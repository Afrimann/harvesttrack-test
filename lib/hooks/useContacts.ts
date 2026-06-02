'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contactRepository } from '@/lib/repositories/contact.repository'
import { useAuthStore } from '@/lib/stores/auth.store'
import type { CreateContactRequest } from '@/lib/types/contact.types'

interface UseContactsParams {
  stage?: string
  search?: string
  page?: number
}

export function useContacts(params?: UseContactsParams) {
  const { accessToken } = useAuthStore()

  return useQuery({
    queryKey: ['contacts', params],
    queryFn: () => contactRepository.getContacts(accessToken!, params),
    enabled: !!accessToken,
    staleTime: 2 * 60 * 1000,
  })
}

export function useCreateContact() {
  const { accessToken } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateContactRequest) =>
      contactRepository.createContact(data, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })
}

export function useUpdateContact() {
  const { accessToken } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateContactRequest> }) =>
      contactRepository.updateContact(id, data, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })
}

export function useDeleteContact() {
  const { accessToken } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => contactRepository.deleteContact(id, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })
}
