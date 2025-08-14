export enum AlertType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export interface Alert {
    id: string;
    type: AlertType;
    title: string;
    message?: string;
    duration?: number; // in milliseconds
    dismissible?: boolean;
    callback?: () => void;
}