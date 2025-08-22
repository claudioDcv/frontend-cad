import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import MonthRangePicker from './index';
import dayjs from 'dayjs';

describe('MonthRangePicker', () => {
  const initialValue: [Date, Date] = [
    new Date(2023, 0, 1),
    new Date(2023, 5, 1),
  ];

  test('renders correctly with initial value', () => {
    render(
      <MonthRangePicker value={initialValue} onChange={() => undefined} />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Ene 2023 - Jun 2023');
  });

  test('opens dropdown when clicking button', async () => {
    render(
      <MonthRangePicker value={initialValue} onChange={() => undefined} />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const dropdown = await screen.findByText('Inicio del año');
    expect(dropdown).toBeTruthy();
    expect(screen.getByText('Fin del año')).toBeTruthy();
  });

  test('reset button resets to current month', async () => {
    const handleChange = vi.fn();
    const now = dayjs();
    render(<MonthRangePicker value={initialValue} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button'));

    const resetButton = await screen.findByLabelText(/Hasta la fecha actual/i);
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      const [newStart, newEnd] = handleChange.mock.calls[0][0];
      expect(newStart.getMonth()).toBe(now.month());
      expect(newEnd.getMonth()).toBe(now.month());
    });
  });

  test('cierra el dropdown al hacer click fuera', async () => {
    render(<MonthRangePicker value={initialValue} onChange={() => undefined} />);
    fireEvent.click(screen.getByRole('button'));
    // Simula click fuera
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByText('Inicio del año')).not.toBeInTheDocument();
    });
  });

  test('cambia el rango de años con los botones de navegación', async () => {
    render(<MonthRangePicker value={initialValue} onChange={() => undefined} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText(/Anterior/i));
    fireEvent.click(screen.getByLabelText(/Siguiente/i));
    // No error = navega correctamente
    expect(screen.getByText('Inicio del año')).toBeInTheDocument();
  });
});
