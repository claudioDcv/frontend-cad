import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AlertCard from './index';
import { initialState18N } from './index.types';

interface I18N {
  title: string;
  text: string;
}

const mockI18n: Partial<I18N> = {
  title: 'Success title',
  text: 'Success text',
};

describe('AlertCard Component', () => {
  test('renders with provided i18n', () => {
    render(
      <AlertCard
        open={true}
        i18n={mockI18n}
        severity="success"
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Success title')).toBeInTheDocument();
    expect(screen.getByText('Success text')).toBeInTheDocument();
  });

  test('falls back to initialState18N if i18n is undefined', () => {
    render(<AlertCard open={true} severity="success" onClose={() => {}} />);
    expect(screen.getByText(initialState18N.title)).toBeInTheDocument();
    expect(screen.getByText(initialState18N.text)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(
      <AlertCard
        open={true}
        i18n={mockI18n}
        severity="success"
        onClose={onCloseMock}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not render close button if closable is false', () => {
    const onCloseMock = vi.fn();
    render(
      <AlertCard
        open={true}
        i18n={mockI18n}
        severity="success"
        onClose={onCloseMock}
        closable={false}
      />
    );
    expect(screen.queryByRole('button')).toBeNull();
  });

  test('renders alert even if closable is true', () => {
    render(
      <AlertCard
        open={true}
        i18n={mockI18n}
        severity="success"
        closable={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('renders alert when closable is omitted', () => {
    render(
      <AlertCard
        open={true}
        i18n={mockI18n}
        severity="success"
        onClose={() => {}}
      />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
