import { vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useJWTNotification, { getToken } from './useJWTNotification';

describe('useJWTNotification', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with null token', () => {
        const { result } = renderHook(() => useJWTNotification());
        expect(result.current.token).toBeNull();
    });

    it('should request code by posting a message', () => {
        const postMessageMock = vi.spyOn(window.parent, 'postMessage');
        const { result } = renderHook(() => useJWTNotification());

        act(() => {
            result.current.requestCode();
        });

        expect(postMessageMock).toHaveBeenCalledWith({ action: 'requestCode' }, '*');
    });

    it('should update token on receiving sendCode message', () => {
        const { result } = renderHook(() => useJWTNotification());

        act(() => {
            window.dispatchEvent(new MessageEvent('message', {
                data: { action: 'sendCode', code: 'mock-token' },
            }));
        });

        expect(result.current.token).toBe('mock-token');
        expect(localStorage.getItem('TOKEN_KEY')).toBe('mock-token');
    });

    it('getToken should return token from localStorage', () => {
        localStorage.setItem('TOKEN_KEY', 'stored-token');
        expect(getToken()).toBe('stored-token');
    });

    it('getToken should return empty string if no token in localStorage', () => {
        expect(getToken()).toBe('');
    });
});