import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Pagination from './index';

describe('Pagination Component', () => {
  test('should render pagination', () => {
    render(<Pagination count={5} page={1} onChange={() => {}} />);
    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  test('should call onChange when page is changed', () => {
    const onChangeMock = vi.fn();
    render(<Pagination count={5} page={1} onChange={onChangeMock} />);

    const nextButton = screen.getByText('2');
    fireEvent.click(nextButton);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.anything(), 2); 
  });

  test('should display correct number of pages', () => {
    render(<Pagination count={5} page={3} onChange={() => {}} />);

    expect(screen.getByText('3')).toBeInTheDocument(); 
  });
});

