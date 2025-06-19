export const STATUS_RESOLUTION = 14;
export const STATUS_PACKING_LIST = 32;

export const FIRST_PAGE = 0;

export const toDay = new Date();
export const defaultEndDate = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
export const defaultStartDate = new Date(toDay.getFullYear() - 5, toDay.getMonth(), 1);

export const emptyOption = { value: 'all', label: 'TODOS' };

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export function debounce<A extends unknown[]>(
  func: (...args: A) => void,
  wait: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: A) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}


