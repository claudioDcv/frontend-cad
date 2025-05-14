import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Input from './index';

describe('Input Component', () => {
  test('should render correctly', () => {
    render(<Input label='label' value='value' onChange={() => undefined} />);

    const input = screen.getByLabelText(/label/i);
    expect(input).toBeInTheDocument();
  });

  test('should call onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<Input label='label' value='value' onChange={handleChange} />);

    const input = screen.getByLabelText(/label/i);
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
