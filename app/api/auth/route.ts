import { NextRequest, NextResponse } from 'next/server';
import { createSessionForRole, normalizeRole } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const role = normalizeRole(request.headers.get('x-dss-role') ?? request.cookies.get('dss-role')?.value);
  const session = createSessionForRole(role);

  return NextResponse.json({
    success: true,
    session,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const role = normalizeRole(body?.role ?? request.headers.get('x-dss-role') ?? request.cookies.get('dss-role')?.value);
  const session = createSessionForRole(role);

  const response = NextResponse.json({
    success: true,
    session,
    timestamp: new Date().toISOString(),
  });

  response.cookies.set('dss-role', role, {
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
