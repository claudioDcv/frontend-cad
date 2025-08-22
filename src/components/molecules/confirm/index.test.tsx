import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Confirm from './index';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Confirm component', () => {
  const mockResponse = vi.fn();
  const mockCancel = vi.fn();

  beforeEach(() => {
    mockResponse.mockClear();
    mockCancel.mockClear();
  });

  test('renders children and does not show dialog initially', () => {
    render(
      <Confirm response={mockResponse}>
        {(show) => <button onClick={() => show()}>Open</button>}
      </Confirm>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.queryByText('confirm.confirmation')).not.toBeInTheDocument();
  });

  test('opens dialog when showDialog is called', () => {
    render(
      <Confirm response={mockResponse}>
        {(show) => <button onClick={() => show()}>Open</button>}
      </Confirm>
    );

    fireEvent.click(screen.getByText('Open'));

    expect(screen.getByText('confirm.confirmation')).toBeInTheDocument();
    expect(screen.getByText('confirm.areYouSure')).toBeInTheDocument();
  });

  test('uses custom title and description if provided', () => {
    render(
      <Confirm
        response={mockResponse}
        title="Custom Title"
        description="Custom Desc"
      >
        {(show) => <button onClick={() => show()}>Open</button>}
      </Confirm>
    );

    fireEvent.click(screen.getByText('Open'));

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Desc')).toBeInTheDocument();
  });

  test('calls response when confirm button is clicked', () => {
    render(
      <Confirm response={mockResponse}>
        {(show) => <button onClick={() => show('data')}>Open</button>}
      </Confirm>
    );

    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('confirm.yes'));

    expect(mockResponse).toHaveBeenCalledWith('data');
    expect(screen.queryByText('confirm.confirmation')).not.toBeInTheDocument();
  });

  test('calls cancel when cancel button is clicked', () => {
    render(
      <Confirm response={mockResponse} cancel={mockCancel}>
        {(show) => <button onClick={() => show()}>Open</button>}
      </Confirm>
    );

    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('confirm.no'));

    expect(mockCancel).toHaveBeenCalled();
    expect(screen.queryByText('confirm.confirmation')).not.toBeInTheDocument();
  });
});
