import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TripleToggleSwitch from './index';

describe('TripleToggleSwitch component', () => {
  const mockOnChange = vi.fn();
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    render(
      <TripleToggleSwitch
        value="option1"
        options={defaultOptions}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText(/Option 1/)).toBeInTheDocument();
    expect(screen.getByText(/Option 2/)).toBeInTheDocument();
    expect(screen.getByText(/Option 3/)).toBeInTheDocument();
  });

  test('calls onChange with the new value when an option is clicked', () => {
    render(
      <TripleToggleSwitch
        value="option1"
        options={defaultOptions}
        onChange={mockOnChange}
      />
    );
    fireEvent.click(screen.getByText(/Option 2/));
    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  test('renders the label if provided', () => {
    render(
      <TripleToggleSwitch
        value="option1"
        options={defaultOptions}
        label="Test Label"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
});
