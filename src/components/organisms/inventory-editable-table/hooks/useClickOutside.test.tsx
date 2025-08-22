import { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import useClickOutside from './useClickOutside';

const MockComponent = ({ callback }: { callback: () => void }) => {
  const ref = useRef(null);
  useClickOutside(ref, callback);
  return <div ref={ref} data-testid="inside-element"></div>;
};

describe('useClickOutside', () => {
  test('calls the callback when a click occurs outside the element', () => {
    const mockCallback = vi.fn();
    render(<MockComponent callback={mockCallback} />);

    fireEvent.mouseDown(document.body);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('does not call the callback when a click occurs inside the element', () => {
    const mockCallback = vi.fn();
    const { getByTestId } = render(<MockComponent callback={mockCallback} />);
    const insideElement = getByTestId('inside-element');

    fireEvent.mouseDown(insideElement);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  test('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const mockCallback = vi.fn();
    const { unmount } = render(<MockComponent callback={mockCallback} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function)
    );
  });

  test('works with touchstart events', () => {
    const mockCallback = vi.fn();
    render(<MockComponent callback={mockCallback} />);

    fireEvent.touchStart(document.body);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
