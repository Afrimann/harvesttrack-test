import { apiRequest } from '@/app/lib/api/api-client'
import type {
  Contact,
  ContactsResponse,
  CreateContactRequest,
} from '@/lib/types/contact.types'

interface GetContactsParams {
  stage?: string
  search?: string
  page?: number
}

export const contactRepository = {
  getContacts: (token: string, params?: GetContactsParams) => {
    const query = new URLSearchParams()
    if (params?.stage) query.set('stage', params.stage)
    if (params?.search) query.set('search', params.search)
    if (params?.page) query.set('page', String(params.page))
    const qs = query.toString()
    return apiRequest<ContactsResponse>(`/api/contacts${qs ? `?${qs}` : ''}`, { token })
  },

  createContact: (data: CreateContactRequest, token: string) =>
    apiRequest<Contact>('/api/contacts', { method: 'POST', body: data, token }),

  updateContact: (id: string, data: Partial<CreateContactRequest>, token: string) =>
    apiRequest<Contact>(`/api/contacts/${id}`, { method: 'PATCH', body: data, token }),

  deleteContact: (id: string, token: string) =>
    apiRequest<void>(`/api/contacts/${id}`, { method: 'DELETE', token }),
}
