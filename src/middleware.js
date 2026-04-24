import { NextResponse } from 'next/server';

/*
 * Edge middleware — runs before any admin page is rendered.
 *
 * If the user hits /admin/* without an auth cookie, they're redirected
 * to /admin/login immediately. This prevents the admin HTML shell from
 * briefly flashing before the client-side auth check kicks in, and also
 * protects against anyone casually inspecting the page source.
 *
 * We intentionally do NOT verify the JWT here (that requires Node APIs
 * that don't run in the Edge runtime). We only check cookie presence.
 * Real verification still happens in the API routes via requireAdmin().
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* Let the login page itself through */
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next();
  }

  /* Any other /admin/* path: require the auth cookie */
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const token = request.cookies.get('fl_admin_token')?.value;
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
