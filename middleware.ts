import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  const isWorkspaceRoute = pathname.startsWith('/workspace')
  // Details and setting-up require the user to be authenticated (post email verification)
  const isProtectedOnboarding =
    pathname === '/auth/details' || pathname === '/auth/setting-up'
  // Only redirect away from the root /auth page, not sub-routes like /auth/verify-email
  const isAuthRoot = pathname === '/auth'

  if ((isWorkspaceRoute || isProtectedOnboarding) && !token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (isAuthRoot && token) {
    return NextResponse.redirect(new URL('/workspace/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/workspace/:path*', '/auth', '/auth/details', '/auth/setting-up'],
}
