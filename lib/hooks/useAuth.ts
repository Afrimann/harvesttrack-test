'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authRepository } from '@/lib/repositories/auth.repository'
import { useAuthStore } from '@/lib/stores/auth.store'
import { useUserStore } from '@/lib/stores/user.store'
import { useWorkspaceStore } from '@/lib/stores/workspace.store'
import { resolveWorkspaces } from '@/lib/hooks/useWorkspace'
import type { UserDetailsRequest } from '@/lib/types/auth.types'
import { HttpError } from '@/lib/types/api.types'
import { apiRequest } from '../api/api-client'

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof HttpError ? error.message : fallback
}

export function useSignup() {
  const { setPendingEmail } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: authRepository.signup,
    onSuccess: (_, variables) => {
      setPendingEmail(variables.email)
      toast.success('Account created! Check your email to verify.')
      router.push('/auth/check-email')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Sign up failed. Please try again.'))
    },
  })
}

export function useLogin() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: authRepository.login,
    onSuccess: async (response) => {
      setAuth(response.token)
      useUserStore.getState().setUser(response.data)
      try {
        await resolveWorkspaces(response.token, router)
      } catch {
        toast.error('Could not load your workspaces. Please try again.')
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Login failed. Check your credentials.'))
    },
  })
}

export function useUserDetails() {
  const { accessToken } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: UserDetailsRequest) => authRepository.updateProfile(data, accessToken!),
    onSuccess: (response) => {
      useUserStore.getState().setUser(response.data)
      router.push('/auth/workspace')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not save your details. Please try again.'))
    },
  })
}

export function useLogout() {
  const { clearAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onSettled: () => {
      clearAuth()
      useUserStore.getState().clearUser()
      useWorkspaceStore.getState().clearWorkspace()
      router.push('/auth/login')
    },
  })
}

export function useCurrentUser() {
  const { accessToken, isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const user = await authRepository.me(useAuthStore.getState().accessToken!)
      useUserStore.getState().setUser(user)
      return user
    },
    enabled: isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000,
  })
}

export function useForgotPassword() {
  const { setPendingEmail } = useAuthStore()

  return useMutation({
    mutationFn: authRepository.forgotPassword,
    onSuccess: (_, variables) => {
      setPendingEmail(variables.email)
      toast.success('OTP sent! Check your inbox.')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not send OTP. Please try again.'))
    },
  })
}

export function useVerifyOTP() {
  const { setPendingOtp } = useAuthStore()

  return useMutation({
    mutationFn: authRepository.verifyOTP,
    onSuccess: (_, variables) => {
      setPendingOtp(variables.otp)
      toast.success('OTP verified!')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Invalid or expired OTP.'))
    },
  })
}

export function useVerifyEmail() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: authRepository.verifyEmail,
    onSuccess: (response) => {
      setAuth(response.token)
      useUserStore.getState().setUser(response.data)
      toast.success('Email verified! Set up your workspace.')
      router.push('/auth/details')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Verification failed. The link may have expired.'))
      router.push('/auth')
    },
  })
}

export function useResendVerification() {
  return useMutation({
    mutationFn: authRepository.resendVerification,
    onSuccess: () => {
      toast.success('Verification email resent! Check your inbox.')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not resend email. Please try again.'))
    },
  })
}

export function useResetPassword() {
  const { setPendingEmail, setPendingOtp } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: authRepository.resetPassword,
    onSuccess: () => {
      setPendingEmail(null)
      setPendingOtp(null)
      toast.success('Password reset successfully! You can now log in.')
      router.push('/auth/login')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not reset password. Please try again.'))
    },
  })
}

export function useOAuthCallback() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: async (token: string) => {
      const user = await authRepository.me(token)
      return { user, token }
    },
    onSuccess: async ({ user, token }) => {
      setAuth(token)
      useUserStore.getState().setUser(user)
      try {
        await resolveWorkspaces(token, router)
      } catch {
        toast.error('Sign-in failed. Please try again.')
        router.push('/auth/login')
      }
    },
    onError: () => {
      toast.error('Sign-in failed. Please try again.')
      router.push('/auth/login')
    },
  })
}

export function useWorkspaceSetup() {
  const { accessToken } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: { name: string }) => authRepository.workspaceSetup(data, accessToken!),
    onSuccess: (response) => {
      useWorkspaceStore.getState().setWorkspace(response.data)
      router.push('/auth/setting-up')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not set up workspace. Please try again.'))
    },
  })
}

export function useCreateWorkspace() {
  const { accessToken } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { name: string }) => authRepository.workspaceSetup(data, accessToken!),
    onSuccess: (response) => {
      useWorkspaceStore.getState().setWorkspace(response.data)
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      toast.success(`"${response.data.name}" is ready!`)
      router.push('/workspace/dashboard')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not create workspace. Please try again.'))
    },
  })
}

export function deleteAllUsers() {
  const router = useRouter()
  return useMutation({
    mutationFn: () => apiRequest('/api/auth/users/all', { method: 'DELETE' }),
    onSuccess: () => {
      router.replace('/auth/signup')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not delete users. Please try again'))
    },
  })
}
