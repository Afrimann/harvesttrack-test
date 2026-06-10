export type ApiResponse<T> = {
  success: boolean
  message?: string
  data: T
}

export type User = {
  id: string
  email: string
  username: string | null
  emailVerified: string | null
  fullName?: string
  phoneNumber?: string
  accountType?: 'TYPE_1' | 'TYPE_2'
  workspaceName?: string
  image?: string | null
  gender?: 0 | 1 | 2
  createdAt: string
  updatedAt: string
}

export type SignupRequest = {
  email: string
  password: string
}

export type SignupResponse = {
  success: boolean
  data: User
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  success: boolean
  data: User
  token: string
}

export type UserDetailsRequest = Partial<{
  username: string
  phoneNumber: string
  accountType: 'TYPE_1' | 'TYPE_2'
  image: string
  gender: 0 | 1 | 2
}>

export type UserDetailsResponse = {
  data: User
}

export type WorkspaceSetup = {
  name: string
}

export type Workspace = {
  id: string
  name: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export type WorkspaceSetupResponse = {
  data: Workspace
}

export type WorkspaceListResponse = {
  data: Workspace[]
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
  data: User
  token: string
}
