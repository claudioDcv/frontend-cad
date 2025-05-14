import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar,
  SnackbarOrigin,
} from '@mui/material';

interface I18N {
  title: string;
  text: string;
}

const initialState18N: I18N = {
  title: 'Title',
  text: 'Text',
};

interface NotificationProps {
  i18n?: Partial<I18N>;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  i18n,
  severity,
  open,
  onClose,
  autoHideDuration = 3000,
}) => {
  const lang = i18n ? { ...initialState18N, ...i18n } : initialState18N;
  const anchorOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
    >
      <Alert severity={severity} onClose={onClose}>
        <AlertTitle>{lang.title}</AlertTitle>
        {lang.text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;