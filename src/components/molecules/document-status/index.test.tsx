import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import DocumentStatus from '.';
import { statusToKeyMap } from '@/constants';
import { ResolutionMetadata } from '@/entities/Resolution.entity';

vi.mock('@/components/atoms/cad-icon', () => ({
  __esModule: true,
  default: ({ color }: { color?: string }) => (
    <div data-testid="cad-icon">{color}</div>
  ),
}));

const sampleMetadata: ResolutionMetadata = {
  resolutionId: 1,
  resolvedBy: 123,
  resolvedAt: '2025-01-01',
  opened: 'true',
  openedBy: 456,
  openedAt: '2025-01-01',
};

describe('DocumentStatus', () => {
  test('renders Chip with the statusName', () => {
    const statusId = 1;
    render(<DocumentStatus statusId={statusId} statusName="Pendiente" />);
    const chip = screen.getByText('Pendiente');
    expect(chip).toBeInTheDocument();
  });

  test('renders CadIcon if metadata is present', () => {
    const statusId = 1;
    const color = statusToKeyMap[statusId]?.color;
    render(
      <DocumentStatus
        statusId={statusId}
        statusName="Pendiente"
        metadata={sampleMetadata}
      />
    );
    const cadIcon = screen.getByTestId('cad-icon');
    expect(cadIcon).toBeInTheDocument();
    expect(cadIcon).toHaveTextContent(color || '');
  });

  test('tooltip shows i18n text if metadata is present', () => {
    const statusId = 1;
    render(
      <DocumentStatus
        statusId={statusId}
        metadata={sampleMetadata}
        i18n={{ sent: 'Enviado a CAD' }}
      />
    );

    const chip = screen.getByLabelText('Enviado a CAD');
    expect(chip).toBeInTheDocument();
  });

  test('tooltip shows statusName if no metadata is present', () => {
    render(<DocumentStatus statusId={1} statusName="Pendiente" />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });
});
