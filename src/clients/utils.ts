import { getToken } from '../hooks/useJWTNotification';
import { PaginationMeta } from './types';

export const getHeader = () => {
  const key = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${key}`,
  };

  return headers;
};

export const clearProp = (param: number | string | boolean | null | undefined) => {
  return param === undefined || param === null ? '' : param.toString();
};

export const clearAllProps = (props: Record<string, string>) => {
  const clearedProps: Record<string, string> = {};
  const allKey = 'all';
  Object.keys(props).forEach((key) => {
    if (props[key] !== allKey && props[key] !== '') {
      clearedProps[key] = props[key];
    }
  });
  return clearedProps;
};

export function mapMeta<T extends { number: number; totalPages: number }>(
  data: T
): PaginationMeta {
  return {
    page: data.number + 1,
    count: data.totalPages,
  };
}
