import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ReviewStatus from '.';
import type { SvgIconProps } from '@mui/material/SvgIcon';

vi.mock('@mui/icons-material/Info', () => ({
  __esModule: true,
  default: (props: SvgIconProps) => <svg data-testid="info-icon" {...props} />,
}));

vi.mock('@mui/icons-material/CheckCircle', () => ({
  __esModule: true,
  default: (props: SvgIconProps) => <svg data-testid="check-icon" {...props} />,
}));

describe('ReviewStatus', () => {
  test('renders the info icon when value=false', () => {
    render(<ReviewStatus value={false} />);
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
  });

  test('renders the check icon when value=true', () => {
    render(<ReviewStatus value={true} />);
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  test('calls onView when the button is clicked', () => {
    const handleClick = vi.fn();
    render(<ReviewStatus value={true} onView={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
