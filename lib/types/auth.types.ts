export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type User = {
  id: string
  email: string
  username: string | null
  emailVerified: string | null
  fullName?: string
  phoneNumber?: string
  accountType?: 'Personal' | 'Church'
  workspaceName?: string
}

export type SignupRequest = {
  email: string
  password: string
}

export type SignupResponse = {
  success: boolean
  user: User
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  success: boolean
  user: User
  access_token: string
}

export type UserDetailsRequest = {
  fullName: string
  phoneNumber: string
  accountType: 'Personal' | 'Church'
  workspaceName: string
}

export type ForgotPasswordRequest = {
  email: string
}

export type VerifyOTPRequest = {
  email: string
  otp: string
}

export type ResetPasswordRequest = {
  email: string
  otp: string
  newPassword: string
}

export type MessageResponse = {
  success: boolean
  message: string
}

export type VerifyEmailResponse = {
  success: boolean
  user: User
  token: string
}
