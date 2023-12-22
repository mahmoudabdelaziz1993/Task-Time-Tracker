import { SupabaseClient, User, createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware function for handling authentication and redirection.
 * 
 * @param req - The NextRequest object.
 * @returns The NextResponse object.
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const res: NextResponse = NextResponse.next()
  const supabase: SupabaseClient= createMiddlewareClient({ req, res })

  const {
    data: { user },
  }: { data: { user: User | null } } = await supabase.auth.getUser()
// if user and the current path is /authentication the user to /
console.log("pathname", req.nextUrl.pathname)
if (user && req.nextUrl.pathname === '/signin') {
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
 

  // if user is not signed in and the current path is not /signinredirect the user to /
  if (!user && req.nextUrl.pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  return res
}

export const config = {
  matcher: [/*
  * Match all request paths except for the ones starting with:
  * - api (API routes)
  * - _next/static (static files)
  * - _next/image (image optimization files)
  * - favicon.ico (favicon file)
  */
 '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',],
}