import { render, screen, fireEvent } from '@testing-library/react';
import ModalHeader from './index';
import { describe, expect, test, vi } from 'vitest';

describe('ModalHeader', () => {
  test('renders children correctly', () => {
    render(<ModalHeader onClose={vi.fn()}>Test Title</ModalHeader>);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<ModalHeader onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  test('renders close icon in the close button', () => {
    render(<ModalHeader onClose={vi.fn()} />);

    const closeIcon = screen.getByTestId('CloseIcon');
    expect(closeIcon).toBeInTheDocument();
  });
});
