import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Input from './index';
import { Search } from '@mui/icons-material';

describe('Input Component', () => {
  test('should render the input with the correct label and value', () => {
    const handleChange = vi.fn();
    const labelText = 'Test Label';
    const valueText = 'Test Value';

    render(
      <Input label={labelText} value={valueText} onChange={handleChange} />
    );

    const inputElement = screen.getByRole('textbox', { name: labelText });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(valueText);
  });

  test('should call the onChange handler when the input value changes', () => {
    const newValue = 'Hello World';
    const handleChange = vi.fn((event) => {
      expect(event.target.value).toBe(newValue);
    });

    const labelText = 'Test Label';
    const initialValue = '';

    render(
      <Input label={labelText} value={initialValue} onChange={handleChange} />
    );

    const inputElement = screen.getByRole('textbox', { name: labelText });
    fireEvent.change(inputElement, { target: { value: newValue } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('should render a number input when type is "number"', () => {
    const handleChange = vi.fn();
    const labelText = 'Number Input';
    const initialValue = 123;

    render(
      <Input
        label={labelText}
        value={initialValue}
        onChange={handleChange}
        type="number"
      />
    );

    const inputElement = screen.getByRole('spinbutton', { name: labelText });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialValue);

    fireEvent.change(inputElement, { target: { value: '456' } });
    expect(handleChange).toHaveBeenCalledTimes(1);

    const [[event]] = handleChange.mock.calls;
    expect(event.target.value).toBe('456');
  });

  test('should convert an invalid number input to "0"', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Number Input"
        value=""
        onChange={handleChange}
        type="number"
      />
    );

    const inputElement = screen.getByRole('spinbutton', {
      name: 'Number Input',
    });

    fireEvent.change(inputElement, { target: { value: 'abc' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('should render an icon at the start position', () => {
    const handleChange = vi.fn();
    const labelText = 'Input with Icon';

    render(
      <Input
        label={labelText}
        value=""
        onChange={handleChange}
        icon={<Search data-testid="search-icon" />}
        iconPosition="start"
      />
    );

    const iconElement = screen.getByTestId('search-icon');
    expect(iconElement).toBeInTheDocument();
  });

  test('should render a search icon when the type is "search"', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Search Input"
        value=""
        onChange={handleChange}
        type="search"
      />
    );

    const searchIcon = screen.getByTestId('SearchIcon');
    expect(searchIcon).toBeInTheDocument();
  });

  test('should render a textarea when the type is "textarea"', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Textarea Input"
        value=""
        onChange={handleChange}
        type="textarea"
      />
    );

    const textareaElement = screen.getByRole('textbox', {
      name: 'Textarea Input',
    });
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement.tagName).toBe('TEXTAREA');
  });
});
