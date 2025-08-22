import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import EditableRow from './index';
import type { RefObject } from 'react';

vi.mock('../../hooks/useClickOutside', () => ({
  default: (ref: RefObject<HTMLDivElement>, handler: () => void) => {
    (ref as RefObject<HTMLDivElement> & { __handler?: () => void }).__handler =
      () => {
        act(() => {
          handler();
        });
      };
  },
}));

describe('EditableRow', () => {
  test('renders with initial number formatted', () => {
    render(<EditableRow value="123.45" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('123,45');
    expect(input).toHaveAttribute('readonly');
  });

  test('becomes editable when clicked', () => {
    render(<EditableRow value="10" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.click(input);
    expect(input.readOnly).toBe(false);
  });

  test('updates value when typing valid number', () => {
    const handleChange = vi.fn();
    render(<EditableRow value="0" onChange={handleChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '12,3' } });

    expect(input.value).toBe('12,3');
    expect(handleChange).toHaveBeenCalledWith('12.3');
  });

  test('does not update with invalid number', () => {
    const handleChange = vi.fn();
    render(<EditableRow value="5" onChange={handleChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'abc' } });

    expect(input.value).toBe('5');
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('handles text input type correctly', () => {
    const handleChange = vi.fn();
    render(<EditableRow value="hello" onChange={handleChange} type="text" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'world' } });

    expect(input.value).toBe('world');
    expect(handleChange).toHaveBeenCalledWith('world');
  });

  test('handles click outside with valid number', async () => {
    const handleChange = vi.fn();
    render(<EditableRow value="12.34" onChange={handleChange} />);
    const wrapper = screen.getByRole('textbox').parentElement as HTMLElement;
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '56,78' } });

    fireEvent.blur(input);

    await waitFor(() => {
      expect(wrapper.dataset.focus).toBe('false');
      expect(input.value).toBe('56,78');
      expect(handleChange).toHaveBeenCalledWith('56.78');
    });
  });

  test('resets to initial value on invalid number when clicking outside', async () => {
    const handleChange = vi.fn();
    render(<EditableRow value="12.34" onChange={handleChange} />);
    const wrapper = screen.getByRole('textbox').parentElement as HTMLElement;
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'abc' } });

    fireEvent.blur(input);

    await waitFor(() => {
      expect(wrapper.dataset.focus).toBe('false');
      expect(input.value).toBe('12,34');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  test('handles click outside for text type', async () => {
    const handleChange = vi.fn();
    render(<EditableRow value="hello" onChange={handleChange} type="text" />);
    const wrapper = screen.getByRole('textbox').parentElement as HTMLElement;
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'world' } });

    fireEvent.blur(input);

    await waitFor(() => {
      expect(wrapper.dataset.focus).toBe('false');
      expect(input.value).toBe('world');
      expect(handleChange).toHaveBeenCalledWith('world');
    });
  });
});
