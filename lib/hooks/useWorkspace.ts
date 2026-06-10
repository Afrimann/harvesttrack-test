'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { workspaceRepository } from '@/lib/repositories/workspace.repository'
import { useWorkspaceStore } from '@/lib/stores/workspace.store'
import { useAuthStore } from '@/lib/stores/auth.store'
import type { Workspace } from '@/lib/types/auth.types'

function setOnboardingCookie() {
  document.cookie = 'onboarding_done=1; path=/; max-age=31536000; SameSite=Lax'
}

// Called after login/OAuth — fetches workspaces and routes accordingly.
export async function resolveWorkspaces(
  token: string,
  router: ReturnType<typeof useRouter>,
) {
  const [owned, joined] = await Promise.all([
    workspaceRepository.getOwned(token),
    workspaceRepository.getJoined(token),
  ])
  const all = [...owned.data, ...joined.data]

  if (all.length === 0) {
    router.push('/auth/details')
  } else if (all.length === 1) {
    useWorkspaceStore.getState().setWorkspace(all[0])
    setOnboardingCookie()
    router.push('/workspace/dashboard')
  } else {
    router.push('/auth/select-workspace')
  }
}

// Used on the select-workspace page to list all available workspaces.
export function useWorkspaces() {
  const token = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const [owned, joined] = await Promise.all([
        workspaceRepository.getOwned(token!),
        workspaceRepository.getJoined(token!),
      ])
      return [...owned.data, ...joined.data]
    },
    enabled: !!token,
    staleTime: 2 * 60 * 1000,
  })
}

// Used when the user picks a workspace from the selection page.
export function useActivateWorkspace() {
  const { setWorkspace } = useWorkspaceStore()
  const router = useRouter()

  return (workspace: Workspace) => {
    setWorkspace(workspace)
    setOnboardingCookie()
    router.push('/workspace/dashboard')
  }
}
