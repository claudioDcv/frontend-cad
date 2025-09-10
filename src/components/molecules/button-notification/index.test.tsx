import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ButtonNotification from './index';

describe('ButtonNotification', () => {
  const mockOnClick = vi.fn();

  test('renders the label correctly', () => {
    render(
      <ButtonNotification
        i18n={{ label: 'Test Label' }}
        onClick={mockOnClick}
        count={0}
      />
    );

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  test('renders the correct number of unread notifications', () => {
    render(
      <ButtonNotification
        i18n={{ label: 'Test Label' }}
        onClick={mockOnClick}
        count={5}
      />
    );

    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
  });

  test('does not render the chip when count is 0', () => {
    render(
      <ButtonNotification
        i18n={{ label: 'Test Label' }}
        onClick={mockOnClick}
        count={0}
      />
    );

    const badge = screen.queryByText('0');
    expect(badge).not.toBeInTheDocument();
  });

  test('calls onClick function when button is clicked', () => {
    render(
      <ButtonNotification
        i18n={{ label: 'Test Label' }}
        onClick={mockOnClick}
        count={5}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('uses initialStateI18n when i18n is not provided', () => {
    render(<ButtonNotification count={3} onClick={mockOnClick} />);

    const label = screen.getByText('Label');
    expect(label).toBeInTheDocument();
  });
});
