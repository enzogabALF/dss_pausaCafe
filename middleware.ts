import { NextRequest, NextResponse } from 'next/server';
import { canAccessPath, getSessionFromRequest } from './lib/auth';

export function middleware(request: NextRequest) {
  const session = getSessionFromRequest(request);
  const pathname = request.nextUrl.pathname;

  if (!canAccessPath(pathname, session.role)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, error: 'Acceso denegado' }, { status: 403 });
    }

    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/operations/:path*', '/api/reports/:path*'],
};