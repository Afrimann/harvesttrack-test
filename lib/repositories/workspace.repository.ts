import { apiRequest } from '@/lib/api/api-client'
import type { WorkspaceListResponse } from '@/lib/types/auth.types'

export const workspaceRepository = {
  getOwned: (token: string) =>
    apiRequest<WorkspaceListResponse>('/api/workspaces', { token }),

  getJoined: (token: string) =>
    apiRequest<WorkspaceListResponse>('/api/workspaces/joined', { token }),
}
