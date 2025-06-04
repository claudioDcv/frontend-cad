import { getToken } from '../hooks/useJWTNotification';

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
    if (props[key] != allKey) {
      clearedProps[key] = props[key];
    }
  });
  return clearedProps;
};