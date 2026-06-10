import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

function removeCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; path=/; max-age=0`
}

interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  pendingEmail: string | null
  pendingOtp: string | null

  setAuth: (token: string) => void
  clearAuth: () => void
  setPendingEmail: (email: string | null) => void
  setPendingOtp: (otp: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      pendingEmail: null,
      pendingOtp: null,

      setAuth: (token) => {
        setCookie('auth_token', token)
        set({ accessToken: token, isAuthenticated: true })
      },

      clearAuth: () => {
        removeCookie('auth_token')
        set({ accessToken: null, isAuthenticated: false })
      },

      setPendingEmail: (email) => set({ pendingEmail: email }),
      setPendingOtp: (otp) => set({ pendingOtp: otp }),
    }),
    {
      name: 'harvesttrack-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          setCookie('auth_token', state.accessToken)
        }
      },
    },
  ),
)
