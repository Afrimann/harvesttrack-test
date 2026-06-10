import { apiRequest } from '@/lib/api/api-client'
import type {
  ContactsResponse,
  CreateContactRequest,
  CreateContactResponse,
} from '@/lib/types/contact.types'

export const contactRepository = {
  getContacts: (workspaceId: string, token: string) =>
    apiRequest<ContactsResponse>(`/api/workspaces/${workspaceId}/contacts`, { token }),

  getContactById: (workspaceId: string, contactId: string, token: string) =>
    apiRequest<CreateContactResponse>(`/api/workspaces/${workspaceId}/contacts/${contactId}`, { token }),

  createContact: (workspaceId: string, data: CreateContactRequest, token: string) =>
    apiRequest<CreateContactResponse>(`/api/workspaces/${workspaceId}/contacts`, {
      method: 'POST',
      body: data,
      token,
    }),

  updateContact: (workspaceId: string, contactId: string, data: Partial<CreateContactRequest>, token: string) =>
    apiRequest<CreateContactResponse>(`/api/workspaces/${workspaceId}/contacts/${contactId}`, {
      method: 'PATCH',
      body: data,
      token,
    }),

  removeContact: (workspaceId: string, contactId: string, token: string) =>
    apiRequest<void>(`/api/workspaces/${workspaceId}/contacts/${contactId}`, {
      method: 'DELETE',
      token,
    }),
}
