import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SalesChart from './SalesChart';

vi.mock('react-chartjs-2', () => ({
  Bar: (props: { data: unknown; options: unknown }) => (
    <div data-testid="bar-chart">{JSON.stringify(props.data)}</div>
  ),
}));

const investments = [
  { name: 'Gold', sales: 200 },
  { name: 'Silver', sales: 150 },
  { name: 'Platinum', sales: 75 },
];

describe('SalesChart', () => {
  it('renders Bar chart with correct data', () => {
    render(<SalesChart investments={investments} />);
    const chart = screen.getByTestId('bar-chart');
    expect(chart).toBeInTheDocument();
    expect(chart.textContent).toContain('Gold');
    expect(chart.textContent).toContain('200');
    expect(chart.textContent).toContain('Silver');
    expect(chart.textContent).toContain('150');
    expect(chart.textContent).toContain('Platinum');
    expect(chart.textContent).toContain('75');
  });
});
