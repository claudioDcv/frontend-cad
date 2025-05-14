import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Checkbox from './index';

describe('Checkbox Component', () => {
  test('renders correctly with label', () => {
    render(<Checkbox value={false} onChange={() => {}} label='Accept terms' />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  test('toggles state when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox value={false} onChange={handleChange} label='Accept terms' />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('is checked when initial value is true', () => {
    render(<Checkbox value={true} onChange={() => {}} label='Accept terms' />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});