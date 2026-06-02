export type ContactStage =
  | 'New Contact'
  | 'Contacted'
  | 'Interested'
  | 'Discipleship'
  | 'Joined Church'

export type ContactSource = 'QR' | 'MANUAL' | 'IMPORT' | 'EVENT'

export interface Contact {
  id: string
  initials: string
  name: string
  phone: string
  stage: ContactStage
  source: ContactSource
  evangelist: string
  lastInteraction: string
  workspaceId: string
  createdAt: string
}

export interface CreateContactRequest {
  name: string
  phone: string
  stage: ContactStage
  source: ContactSource
  evangelistId?: string
}

export interface ContactsResponse {
  contacts: Contact[]
  total: number
  page: number
  pageSize: number
}
