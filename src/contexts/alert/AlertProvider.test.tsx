import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertProvider } from './AlertProvider';

vi.mock('react-i18next', () => ({ Trans: (props: { children: React.ReactNode }) => <>{props.children}</> }));
vi.mock('@mui/material', async () => {
    const mod = await import('@mui/material');
    return {
        ...mod,
        Snackbar: (props: { children: React.ReactNode; open: boolean; onClose: () => void }) => props.open ? <div data-testid="snackbar">{props.children}<button data-testid="close-btn" onClick={props.onClose}>close</button></div> : null,
        Alert: (props: { severity: string; onClose?: () => void; children: React.ReactNode }) => <div data-testid="mui-alert">{props.children}<button data-testid="alert-close" onClick={props.onClose}>close</button></div>,
    };
});

describe('AlertProvider', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    it('renders children', () => {
        render(
            <AlertProvider>
                <div data-testid="child">child</div>
            </AlertProvider>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
