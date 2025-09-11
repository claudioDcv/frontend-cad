import { Alert, AlertColor, AlertTitle, Box, Collapse } from '@mui/material';

interface I18N {
  title: string;
  text: string;
}

const initialState18N: I18N = {
  title: 'Title',
  text: 'Text',
};

interface AlertCardProps {
  i18n?: Partial<I18N>;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
  closable?: boolean;
}

const AlertCard: React.FC<AlertCardProps> = ({
  i18n,
  severity,
  open,
  onClose,
  closable,
}) => {
  const lang = i18n ? { ...initialState18N, ...i18n } : initialState18N;
  const alertOnClose = closable !== false ? onClose : undefined;

  return (
    <Collapse in={open}>
      <Box>
        <Alert severity={severity} onClose={alertOnClose}>
          <AlertTitle>{lang.title}</AlertTitle>
          <Box sx={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
            {lang.text}
          </Box>
        </Alert>
      </Box>
    </Collapse>
  );
};

export default AlertCard;
