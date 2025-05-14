import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import ModalInventoryDelivery from '.';

const mockOnClose = vi.fn();
const mockOnSuccess = vi.fn();
const mockOptions = [{ value: '1', label: 'Option 1' }];
const mockOpen = true;

describe('ModalInventoryDelivery', () => {
  test('should render without crashing', () => {
    const { container } = render(
      <ModalInventoryDelivery
        open={mockOpen}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        inventories={mockOptions}
      />
    );
    expect(container).toBeInTheDocument(); 
  });
});
