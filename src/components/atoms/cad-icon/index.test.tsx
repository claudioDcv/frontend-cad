import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import CadIcon from './index';
import theme from '@/conf/theme';

vi.mock('@/components/molecules/icon', () => {
  return {
    __esModule: true,
    default: ({ name, color }: { name: string; color: string }) => (
      <div data-testid="icon-list" data-color={color}>
        {name}
      </div>
    ),
  };
});

describe('CadIcon', () => {
  test('renders IconList with default color if no color prop', () => {
    render(<CadIcon />);
    const icon = screen.getByTestId('icon-list');
    expect(icon).toHaveAttribute('data-color', theme.palette.secondary.main);
    expect(icon).toHaveTextContent('sent');
  });

  test('renders IconList with specific color', () => {
    render(<CadIcon color="error" />);
    const icon = screen.getByTestId('icon-list');
    expect(icon).toHaveAttribute('data-color', theme.palette.error.main);
  });

  test('renders IconList with default color if color is "default"', () => {
    render(<CadIcon color="default" />);
    const icon = screen.getByTestId('icon-list');
    expect(icon).toHaveAttribute('data-color', theme.palette.secondary.main);
  });
});
