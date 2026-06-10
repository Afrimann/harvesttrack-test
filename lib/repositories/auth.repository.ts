import { apiRequest } from "@/lib/api/api-client";
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  UserDetailsRequest,
  UserDetailsResponse,
  User,
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
  MessageResponse,
  VerifyEmailResponse,
  WorkspaceSetup,
  WorkspaceSetupResponse,
} from "@/lib/types/auth.types";

export const authRepository = {
  signup: (data: SignupRequest) =>
    apiRequest<SignupResponse>("/api/auth/signup", {
      method: "POST",
      body: data,
    }),

  login: (data: LoginRequest) =>
    apiRequest<LoginResponse>("/api/auth/signin", {
      method: "POST",
      body: data,
    }),

  me: (token: string) => apiRequest<User>("/api/auth/me", { token }),

  updateProfile: (data: UserDetailsRequest, token: string) =>
    apiRequest<UserDetailsResponse>("/api/users/me", { method: "PATCH", body: data, token }),

  workspaceSetup: (data: WorkspaceSetup, token: string) =>
    apiRequest<WorkspaceSetupResponse>("/api/workspaces", { method: "POST", body: data, token }),

  logout: () =>
    apiRequest<void>("/api/auth/logout", { method: "POST"}),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiRequest<MessageResponse>("/api/auth/forgot-password", {
      method: "POST",
      body: data,
    }),

  verifyOTP: (data: VerifyOTPRequest) =>
    apiRequest<MessageResponse>("/api/auth/verify-otp", {
      method: "POST",
      body: data,
    }),

  resetPassword: (data: ResetPasswordRequest) =>
    apiRequest<MessageResponse>("/api/auth/reset-password", {
      method: "POST",
      body: data,
    }),

  verifyEmail: (token: string) =>
    apiRequest<VerifyEmailResponse>(`/api/auth/verify`, {
      method: "POST",
      body: { token },
    }),

  resendVerification: (email: string) =>
    apiRequest<MessageResponse>("/api/auth/resend-verification", {
      method: "POST",
      body: { email },
    }),
};
