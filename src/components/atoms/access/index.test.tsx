import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as useAccessModule from './useAccess';
import { Access } from '@/components';

describe('Access component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should render children when access is granted', () => {
    vi.spyOn(useAccessModule, 'default').mockReturnValue(() => true);

    render(
      <Access roles={['admin']}>
        <div>Contenido autorizado</div>
      </Access>
    );

    expect(screen.getByText('Contenido autorizado')).toBeInTheDocument();
  });

  test('should not render children when access is denied', () => {
    vi.spyOn(useAccessModule, 'default').mockReturnValue(() => false);

    render(
      <Access roles={['guest']}>
        <div>No deberías ver esto</div>
      </Access>
    );

    expect(screen.queryByText('No deberías ver esto')).not.toBeInTheDocument();
  });
});
