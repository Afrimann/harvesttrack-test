import { NextRequest, NextResponse } from 'next/server'

// Routes anyone can visit without a token
const PUBLIC_PATHS = ['/', '/delete', '/auth', '/auth/login', '/auth/signup', '/auth/check-email', '/auth/verify-email', '/auth/forgot-password', '/auth/oauth/callback', '/qr']

// Onboarding form pages — require auth and are locked once onboarding is done
const ONBOARDING_PATHS = ['/auth/details', '/auth/workspace', '/auth/setting-up']

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function isOnboardingPath(pathname: string) {
  return ONBOARDING_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const onboardingDone = request.cookies.get('onboarding_done')?.value
  const { pathname } = request.nextUrl

  // Unauthenticated users can't access onboarding or workspace routes
  if (!token && (isOnboardingPath(pathname) || !isPublicPath(pathname))) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Completed users can't go back into the onboarding flow
  if (token && onboardingDone && isOnboardingPath(pathname)) {
    return NextResponse.redirect(new URL('/workspace/dashboard', request.url))
  }

  // Authenticated users hitting auth pages go straight to the dashboard
  if (token && (pathname === '/auth' || pathname === '/auth/login' || pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/workspace/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Run on every route except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
