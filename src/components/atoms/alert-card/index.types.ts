import { AlertColor } from '@mui/material';

interface I18N {
  title: string;
  text: string;
}

export const initialState18N: I18N = {
  title: 'Title',
  text: 'Text',
};

export interface alertCardProps {
  i18n?: Partial<I18N>;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
  closable?: boolean;
}
