import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import MonthRangePicker from './index';

describe("MonthRangePicker", () => {
  const initialValue: [Date, Date] = [
    new Date(2023, 0, 1),
    new Date(2023, 5, 1),
  ];

  test("renders the component correctly with initial value", () => {
    render(<MonthRangePicker value={initialValue} onChange={() => undefined} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Ene 2023 - Jun 2023");
  });
});
