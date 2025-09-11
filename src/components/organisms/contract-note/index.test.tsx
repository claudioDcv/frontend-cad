import { render, screen, fireEvent } from '@testing-library/react';
import { vi, beforeEach, describe, test, expect } from 'vitest';
import ContractNote from '.';
import * as accessHook from '@/components/atoms/access/useAccess';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/components', () => ({
  Checkbox: (props: {
    value: boolean;
    label: string;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
  }) => (
    <input
      type="checkbox"
      checked={props.value}
      disabled={props.disabled}
      aria-label={props.label}
      onChange={() => props.onChange?.(!props.value)}
    />
  ),
  ModalActions: (props: {
    onSuccess: () => void;
    onClose: () => void;
    loading: boolean;
    disabled: boolean;
  }) => (
    <div>
      <button onClick={props.onSuccess} disabled={props.disabled}>
        Save
      </button>
      <button onClick={props.onClose} disabled={props.disabled}>
        Close
      </button>
    </div>
  ),
  Access: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogActions: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  ),
  Box: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ContractNote alternative test', () => {
  const baseProps: Parameters<typeof ContractNote>[0] = {
    onSuccess: vi.fn(),
    onClose: vi.fn(),
    loading: false,
    editable: true,
  };

  test('renders fields and disables note input if useAccess returns true', () => {
    const useAccessMock = vi
      .spyOn(accessHook, 'default')
      .mockReturnValue(() => true);
    render(<ContractNote {...baseProps} />);
    const noteInput = screen.getByLabelText('common.note') as HTMLInputElement;
    expect(noteInput.readOnly).toBe(true);
    useAccessMock.mockRestore();
  });

  test('calls onSuccess with updated note', () => {
    const useAccessMock = vi
      .spyOn(accessHook, 'default')
      .mockReturnValue(() => false);
    render(<ContractNote {...baseProps} />);
    const noteInput = screen.getByLabelText('common.note') as HTMLInputElement;
    fireEvent.change(noteInput, { target: { value: 'Updated note' } });

    const saveBtn = screen.getByText('Save');
    fireEvent.click(saveBtn);

    expect(baseProps.onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({ note: 'Updated note' })
    );
    useAccessMock.mockRestore();
  });
});
