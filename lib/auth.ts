import type { NextRequest } from 'next/server';
import type { SessionInfo, UserRole } from './types';

const ROLE_WEIGHT: Record<UserRole, number> = {
  viewer: 0,
  analyst: 1,
  manager: 2,
  admin: 3,
};

const DEFAULT_ROLE: UserRole = 'manager';

const PROTECTED_PREFIXES = ['/dashboard', '/api/operations', '/api/reports'];

export function normalizeRole(value?: string | null): UserRole {
  if (value === 'viewer' || value === 'analyst' || value === 'manager' || value === 'admin') {
    return value;
  }

  return DEFAULT_ROLE;
}

export function getSessionFromRequest(request: Pick<NextRequest, 'cookies' | 'headers'>): SessionInfo {
  const headerRole = request.headers.get('x-dss-role');
  const cookieRole = request.cookies.get('dss-role')?.value;
  const role = normalizeRole(headerRole ?? cookieRole);

  return {
    userId: role === 'admin' ? 'admin-001' : role === 'manager' ? 'mgr-001' : 'demo-001',
    name: role === 'admin' ? 'Administrador' : role === 'manager' ? 'Gerencia' : 'Usuario demo',
    role,
    authenticated: true,
  };
}

export function canAccessPath(pathname: string, role: UserRole): boolean {
  if (!PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }

  return ROLE_WEIGHT[role] >= ROLE_WEIGHT.manager;
}

export function createSessionForRole(role: UserRole): SessionInfo {
  return {
    userId: `${role}-demo`,
    name: role === 'admin' ? 'Administrador' : role === 'manager' ? 'Gerencia' : 'Usuario demo',
    role,
    authenticated: true,
  };
}