import { Alert, AlertTitle, Box, Collapse } from '@mui/material';
import { alertCardProps, initialState18N } from './index.types';

const AlertCard: React.FC<alertCardProps> = ({
  i18n,
  severity,
  open,
  onClose,
}) => {
  const lang = i18n ? { ...initialState18N, ...i18n } : initialState18N;

  return (
    <Collapse in={open}>
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          zIndex: 1400,
          width: 650,
        }}
      >
        <Alert severity={severity} onClose={onClose}>
          <AlertTitle>{lang.title}</AlertTitle>
          <Box sx={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{lang.text}</Box>
        </Alert>
      </Box>
    </Collapse>
  );
};

export default AlertCard;
