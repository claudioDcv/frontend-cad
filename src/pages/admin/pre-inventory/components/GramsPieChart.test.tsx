import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GramsPieChart from './GramsPieChart';

vi.mock('react-chartjs-2', () => ({
  Pie: (props: { data: unknown; options: unknown }) => (
    <div data-testid="pie-chart">{JSON.stringify(props.data)}</div>
  ),
}));

const investments = [
  { name: 'Gold', grams: 100 },
  { name: 'Silver', grams: 50 },
  { name: 'Platinum', grams: 25 },
];

describe('GramsPieChart', () => {
  it('renders Pie chart with correct data', () => {
    render(<GramsPieChart investments={investments} />);
    const chart = screen.getByTestId('pie-chart');
    expect(chart).toBeInTheDocument();
    expect(chart.textContent).toContain('Gold');
    expect(chart.textContent).toContain('100');
    expect(chart.textContent).toContain('Silver');
    expect(chart.textContent).toContain('50');
    expect(chart.textContent).toContain('Platinum');
    expect(chart.textContent).toContain('25');
  });
});
