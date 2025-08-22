import { render, screen } from '@testing-library/react';
import { describe, test, vi, beforeEach } from 'vitest';
import ResolutionDetailButton from './index';
import useAccess from '@/components/atoms/access/useAccess';
import routes from '@/conf/routes';
import { validRoles } from '@/constants';

vi.mock('wouter', () => ({
  Link: vi.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

vi.mock('@/components/atoms/access/useAccess', () => ({
  default: vi.fn(),
}));

describe('ResolutionDetailButton', () => {
  const mockUseAccess = useAccess as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with admin role', () => {
    mockUseAccess.mockReturnValue((roles: string[]) =>
      roles.includes(validRoles.admin)
    );
    render(<ResolutionDetailButton id="123" label="Detail" />);
    const button = screen.getByRole('button', { name: 'Detail' });
    expect(button.closest('a')).toHaveAttribute('href', '');
    expect(screen.getByRole('button', { name: 'Detail' })).toBeInTheDocument();
  });

  test('renders with coordinator role', () => {
    mockUseAccess.mockReturnValue((roles: string[]) =>
      roles.includes(validRoles.cordinator)
    );
    render(<ResolutionDetailButton id="456" label="Coordinator Detail" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      routes.cordinator.resolutionDetail.path('456')
    );
    expect(
      screen.getByRole('button', { name: 'Coordinator Detail' })
    ).toBeInTheDocument();
  });

  test('renders with operator role', () => {
    mockUseAccess.mockReturnValue(() => false);
    render(<ResolutionDetailButton id="789" label="Operator Detail" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      routes.operator.resolutionDetail.path('789')
    );
    expect(
      screen.getByRole('button', { name: 'Operator Detail' })
    ).toBeInTheDocument();
  });
});
