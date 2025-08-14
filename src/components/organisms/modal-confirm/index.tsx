import { useState } from 'react';
import { Box, Dialog, DialogContent, DialogContentText } from '@mui/material';
import ModalHeader from '../../molecules/modal-header';
import ModalActions from '../../molecules/modal-actions';
import { initialStateI18n, ModalConfirmProps } from './index.types';

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  open,
  onClose,
  onSuccess,
  i18n,
  children,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  const [loading, setLoading] = useState(false);

  const handleSuccessClick = () => {
    try {
      setLoading(true);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ModalHeader onClose={onClose}>{lang.title}</ModalHeader>
      <DialogContent>
        <DialogContentText>{lang.text}</DialogContentText>
        {children && <Box mt={2}>{children}</Box>}
      </DialogContent>
      <ModalActions
        i18n={lang}
        onClose={onClose}
        onSuccess={handleSuccessClick}
        loading={loading}
      />
    </Dialog>
  );
};

export default ModalConfirm;
