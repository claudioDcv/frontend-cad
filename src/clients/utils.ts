import { getToken } from '../hooks/useJWTNotification';
import { PageResponse, Paginated, PaginationMeta } from './types';

export const getHeader = () => {
  const key = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${key}`,
  };

  return headers;
};

export const clearProp = (
  param: number | string | boolean | null | undefined
) => {
  return param === undefined || param === null ? '' : param.toString();
};

export const clearAllProps = (
  props: Record<string, string | number | boolean>
) => {
  const clearedProps: Record<string, string> = {};
  const allKey = 'all';
  Object.keys(props).forEach((key) => {
    if (props[key] !== allKey && props[key] !== '') {
      clearedProps[key] = `${props[key]}`;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initialPageableData: PageResponse<any> = {
  totalPages: 0,
  totalElements: 0,
  pageable: {
    pageNumber: 0,
    pageSize: 0,
    sort: {
      sorted: false,
      empty: false,
      unsorted: false,
    },
    offset: 0,
    paged: undefined,
    unpaged: undefined,
  },
  size: 0,
  content: [],
  number: 0,
  sort: [],
  first: false,
  last: false,
  numberOfElements: 0,
  empty: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initialPaginatedData: Paginated<any> = {
  content: [],
  meta: {
    page: 0,
    count: 0,
  },
};

export const pageableToPaginated = <T>(data: PageResponse<T>): Paginated<T> => {
  return {
    content: data.content,
    meta: {
      page: data.number + 1,
      count: data.totalPages,
    },
  };
};

// aceptar o recharazar, la respuesta no hay que llamar de nuevo al servicio, sino cambiar el valor de la tabla
// si pongo aceptar donde dice pendiente poner estado aprobado/rechazado
// se llama la data se guarda en variable de estado, se busca por id y se cambia el valor de estado
// agregar las traducciones
