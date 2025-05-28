export const toDay = new Date();

export const emptyOption = { value: '', label: '' };

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
