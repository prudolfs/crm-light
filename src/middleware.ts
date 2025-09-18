import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const response = NextResponse.next()

  // Handle referral tracking for all routes
  const refCode = searchParams.get('ref')
  if (refCode) {
    response.cookies.set('referralCode', refCode, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  }

  // Only apply auth logic to auth-related routes
  if (pathname.startsWith('/login') || pathname.startsWith('/dashboard')) {
    const isAuth = await getToken({ req: request })
    const isAuthPage = pathname.startsWith('/login')

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      return response
    }

    if (pathname.startsWith('/dashboard') && !isAuth) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  // Match all routes to catch referrals everywhere, auth logic is applied conditionally inside
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
