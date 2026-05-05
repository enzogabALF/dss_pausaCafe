import { describe, expect, it } from 'vitest';
import { canAccessPath, createSessionForRole, normalizeRole } from '@/lib/auth';

describe('auth guard helpers', () => {
  it('normaliza roles desconocidos a manager', () => {
    expect(normalizeRole('unknown')).toBe('manager');
  });

  it('permite rutas publicas y bloquea rutas sensibles para viewer', () => {
    expect(canAccessPath('/', 'viewer')).toBe(true);
    expect(canAccessPath('/simulator', 'viewer')).toBe(true);
    expect(canAccessPath('/dashboard', 'viewer')).toBe(false);
    expect(canAccessPath('/api/operations', 'viewer')).toBe(false);
    expect(canAccessPath('/api/reports', 'viewer')).toBe(false);
  });

  it('permite rutas sensibles para manager y admin', () => {
    expect(canAccessPath('/dashboard', 'manager')).toBe(true);
    expect(canAccessPath('/api/operations', 'admin')).toBe(true);
  });

  it('construye sesiones demo consistentes', () => {
    const session = createSessionForRole('admin');

    expect(session).toMatchObject({
      userId: 'admin-demo',
      name: 'Administrador',
      role: 'admin',
      authenticated: true,
    });
  });
});
