import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ModalInputIndex from './index';

vi.mock('../../molecules/modal-actions', () => {
  return {
    __esModule: true,
    default: ({
      onClose,
      onSuccess,
      i18n,
    }: {
      onClose: () => void;
      onSuccess: () => void;
      i18n: { cancel: string; success: string };
    }) => (
      <>
        <button onClick={onClose}>{i18n.cancel}</button>
        <button onClick={onSuccess}>{i18n.success}</button>
      </>
    ),
  };
});

const mockI18n = {
  title: 'Modal input',
  label: 'Label',
  success: 'Success',
  cancel: 'Cancel',
};

describe('ModalInputIndex', () => {
  test('should render when open', () => {
    render(
      <ModalInputIndex
        open
        value=""
        onClose={() => {}}
        onChange={() => {}}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('should close on cancel click', () => {
    const onCloseMock = vi.fn();

    render(
      <ModalInputIndex
        open
        value=""
        onClose={onCloseMock}
        onChange={() => {}}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should call onSuccess on success button click', () => {
    const onSuccessMock = vi.fn();

    render(
      <ModalInputIndex
        open
        value=""
        onClose={() => {}}
        onChange={() => {}}
        onSuccess={onSuccessMock}
        i18n={mockI18n}
      />
    );

    const successButton = screen.getByRole('button', { name: /success/i });
    fireEvent.click(successButton);

    expect(onSuccessMock).toHaveBeenCalled();
  });
});
