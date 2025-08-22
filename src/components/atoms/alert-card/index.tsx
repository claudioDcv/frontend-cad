import { Alert, AlertTitle, Box, Collapse } from '@mui/material';
import { AlertCardProps, initialState18N } from './index.types';

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
