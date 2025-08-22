import { describe, test, expect, vi } from 'vitest';
import useAccess from './useAccess';
import { validRoles } from '@/constants';
import * as wouter from 'wouter';

vi.mock('wouter', () => ({
  useLocation: vi.fn(),
}));

describe('useAccess hook', () => {
  test('returns false if location is undefined', () => {
    (wouter.useLocation as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      [undefined]
    );
    const access = useAccess();
    expect(access([validRoles.admin])).toBe(false);
  });

  test('returns true if roles match route', () => {
    (wouter.useLocation as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      ['/admin/dashboard']
    );
    const access = useAccess();
    expect(access([validRoles.admin])).toBe(true);
  });

  test('returns false if roles do not match route', () => {
    (wouter.useLocation as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      ['/operator/home']
    );
    const access = useAccess();
    expect(access([validRoles.admin])).toBe(false);
  });

  test('works with multiple roles', () => {
    (wouter.useLocation as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      ['/cordinator/tasks']
    );
    const access = useAccess();
    expect(access([validRoles.admin, validRoles.cordinator])).toBe(true);
  });

  test('ignores roles not in validRoles', () => {
    (wouter.useLocation as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      ['/operator/home']
    );
    const access = useAccess();
    expect(access(['nonexistentRole'])).toBe(false);
  });
});
