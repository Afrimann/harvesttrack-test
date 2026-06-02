'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authRepository } from '@/lib/repositories/auth.repository'
import { useAuthStore } from '@/lib/stores/auth.store'
import type { UserDetailsRequest } from '@/lib/types/auth.types'
import { HttpError } from '@/lib/types/api.types'

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
    onSuccess: (response) => {
      setAuth(response.user, response.access_token)
      toast.success('Welcome back!')
      router.push('/workspace/dashboard')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Login failed. Check your credentials.'))
    },
  })
}

export function useUserDetails() {
  const { accessToken, setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: UserDetailsRequest) => authRepository.updateProfile(data, accessToken!),
    onSuccess: (user) => {
      setAuth(user, accessToken!)
      router.push('/auth/setting-up')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not save your details. Please try again.'))
    },
  })
}

export function useLogout() {
  const { accessToken, clearAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: () => authRepository.logout(accessToken!),
    onSettled: () => {
      clearAuth()
      router.push('/auth')
    },
  })
}

export function useCurrentUser() {
  const { accessToken, isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authRepository.me(accessToken!),
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
      setAuth(response.user, response.token)
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
      router.push('/auth')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not reset password. Please try again.'))
    },
  })
}
