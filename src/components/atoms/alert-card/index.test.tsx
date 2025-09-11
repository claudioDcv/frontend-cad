import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AlertCard from './index';

describe('AlertCard Component', () => {
  test('should render when open', () => {
    render(<AlertCard open={true} severity="success" onClose={() => {}} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();

    render(<AlertCard open={true} severity="success" onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
