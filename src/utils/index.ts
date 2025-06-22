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

export function formatToDDMMYYYY(dateInput: string | undefined ) {
  if (!dateInput) return '';

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
      console.error("Fecha inválida proporcionada:", dateInput);
      return ""; 
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatNumberWithGr(value: string | number) {
  // Verifica si el valor de entrada es un número válido.
  if (typeof value !== 'number' || isNaN(value)) {
      console.error("Entrada inválida. Se esperaba un número:", value);
      return ""; // Devuelve una cadena vacía o maneja el error como prefieras.
  }

  // Formatea el número con el separador de miles (punto).
  // Usamos 'es-ES' (español de España) para asegurar que el separador de miles sea un punto.
  const formattedNumber = value.toLocaleString('es-ES');

  // Agrega el sufijo " gr" al número formateado.
  return `${formattedNumber} gr`;
}
