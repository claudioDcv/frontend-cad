import { DisplayData } from '@/components';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

describe('DisplayData component', () => {
  test('should render label and value correctly', () => {
    render(<DisplayData label="Nombre" value="Daniel" />);
    expect(screen.getByText('Nombre:')).toBeInTheDocument();
    expect(screen.getByText('Daniel')).toBeInTheDocument();
  });

  test('should render number values', () => {
    render(<DisplayData label="Edad" value={30} />);
    expect(screen.getByText('Edad:')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  test('should render label even if value is undefined', () => {
    render(<DisplayData label="Correo" value={undefined} />);
    expect(screen.getByText('Correo:')).toBeInTheDocument();

    const spans = screen
      .getByText('Correo:')
      .closest('div')
      ?.querySelectorAll('span');
    expect(spans?.length).toBe(2);

    const valueText = spans?.[1].textContent;
    expect(valueText).toBe('N/A');
  });
});
