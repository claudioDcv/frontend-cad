import { useEffect } from 'react';

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
