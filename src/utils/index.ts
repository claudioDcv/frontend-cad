export const STATUS_RESOLUTION = 14;

export const toDay = new Date();
export const toEndMonth = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);

export const emptyOption = { value: '', label: '' };

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
