import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ButtonClear from './index';

describe('ButtonClear', () => {
  test('render correctly', () => {
    render(<ButtonClear onClick={() => {}} label='Borrar' />);

    const button = screen.getByRole('button', { name: /Borrar/i });
    expect(button).toBeInTheDocument();
  });

  test('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ButtonClear onClick={handleClick} label='Borrar' />);

    const button = screen.getByRole('button', { name: /Borrar/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should be disabled when disabled prop is true', () => {
    render(<ButtonClear onClick={() => {}} label='Borrar' disabled />);

    const button = screen.getByRole('button', { name: /borrar/i });
    expect(button).toBeDisabled();
  })
});
