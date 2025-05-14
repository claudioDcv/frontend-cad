import { render, screen, fireEvent } from '@testing-library/react';
import ModalActions from './index'; 
import { describe, expect, test, vi } from 'vitest';

describe('ModalActions', () => {
  test('calls onSuccess with checked state when clicking the success button', () => {
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    render(
      <ModalActions
        onClose={onClose}
        onSuccess={onSuccess}
        checked={false}
        showCheckbox={true}
      />
    );

    const successButton = screen.getByRole('button', { name: /success/i });
    expect(successButton).toBeInTheDocument();
    fireEvent.click(successButton);
    expect(onSuccess).toHaveBeenCalledWith(false);
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when clicking the cancel button', () => {
    const onClose = vi.fn();

    render(
      <ModalActions
        onClose={onClose}
        onSuccess={vi.fn()}
        checked={false}
        showCheckbox={true}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });

  test('toggles checkbox state when clicking on the checkbox', () => {
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    render(
      <ModalActions
        onClose={onClose}
        onSuccess={onSuccess}
        checked={false}
        showCheckbox={true}
      />
    );

    const checkbox = screen.getByLabelText(/check label/i);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const successButton = screen.getByRole('button', { name: /success/i });
    fireEvent.click(successButton);
    expect(onSuccess).toHaveBeenCalledWith(true);
  });

  test('does not render checkbox when showCheckbox is false', () => {
    render(
      <ModalActions
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        checked={false}
        showCheckbox={false}
      />
    );

    const checkbox = screen.queryByLabelText(/check label/i);
    expect(checkbox).toBeNull();
  });
});
