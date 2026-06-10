export type ContactStage =
  | 'New Contact'
  | 'Contacted'
  | 'Interested'
  | 'Discipleship'
  | 'Joined Church'

export type ContactSource = 'QR' | 'MANUAL' | 'IMPORT' | 'EVENT'

export interface Contact {
  id: string
  workspaceId: string
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  country?: string
  city?: string
  state?: string
  zip?: string
  address?: string
  createdAt: string
  updatedAt: string
}

export interface CreateContactRequest {
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  country?: string
  city?: string
  state?: string
  zip?: string
  address?: string
}

export interface CreateContactResponse {
  data: Contact
}

export interface ContactsResponse {
  data: Contact[]
}
