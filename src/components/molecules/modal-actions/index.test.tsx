import { render, screen, fireEvent } from '@testing-library/react';
import ModalActions from './index';
import { describe, expect, test, vi } from 'vitest';

describe('ModalActions', () => {
  test('calls onSuccess when clicking the success button', () => {
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    render(<ModalActions onClose={onClose} onSuccess={onSuccess} loading={false} />);

    const successButton = screen.getByRole('button', { name: /success/i });
    fireEvent.click(successButton);
    expect(onSuccess).toHaveBeenCalled();
  });

  test('calls onClose when clicking the cancel button', () => {
    const onClose = vi.fn();

    render(<ModalActions onClose={onClose} onSuccess={vi.fn()} loading={false} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });
});
