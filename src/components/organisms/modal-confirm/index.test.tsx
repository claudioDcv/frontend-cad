import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ModalConfirm from './index';

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
  title: 'Modal Confirm',
  text: 'Are you sure?',
  success: 'Confirm',
  cancel: 'Cancel',
};

describe('ModalConfirm', () => {
  test('renders correctly when open', () => {
    render(
      <ModalConfirm
        open={true}
        onClose={() => {}}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    expect(screen.getByText(mockI18n.title)).toBeInTheDocument();
    expect(screen.getByText(mockI18n.text)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: mockI18n.cancel })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: mockI18n.success })
    ).toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    const onCloseMock = vi.fn();

    render(
      <ModalConfirm
        open={true}
        onClose={onCloseMock}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    const cancelButton = screen.getByRole('button', { name: mockI18n.cancel });
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onSuccess when success button is clicked', () => {
    const onSuccessMock = vi.fn();

    render(
      <ModalConfirm
        open={true}
        onClose={() => {}}
        onSuccess={onSuccessMock}
        i18n={mockI18n}
      />
    );

    const successButton = screen.getByRole('button', {
      name: mockI18n.success,
    });
    fireEvent.click(successButton);

    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });
});
