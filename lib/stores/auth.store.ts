import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types/auth.types'

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 days in seconds

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

function removeCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; path=/; max-age=0`
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  pendingEmail: string | null
  pendingOtp: string | null

  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  setPendingEmail: (email: string | null) => void
  setPendingOtp: (otp: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      pendingEmail: null,
      pendingOtp: null,

      setAuth: (user, token) => {
        setCookie('auth_token', token)
        set({ user, accessToken: token, isAuthenticated: true })
      },

      clearAuth: () => {
        removeCookie('auth_token')
        set({ user: null, accessToken: null, isAuthenticated: false })
      },

      setPendingEmail: (email) => set({ pendingEmail: email }),
      setPendingOtp: (otp) => set({ pendingOtp: otp }),
    }),
    {
      name: 'harvesttrack-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Re-sync cookie on app load in case it expired while localStorage still has the token
        if (state?.accessToken) {
          setCookie('auth_token', state.accessToken)
        }
      },
    },
  ),
)
