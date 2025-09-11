import { useState } from 'react';
import { Box, Dialog, DialogContent, DialogContentText } from '@mui/material';
import ModalHeader from '../../molecules/modal-header';
import ModalActions from '../../molecules/modal-actions';
import tsStyles from './index.styles';

interface I18N {
  title: string;
  text: string;
  success: string;
  cancel: string;
}

const initialStateI18n: I18N = {
  title: 'Modal input',
  text: 'Label',
  success: 'Éxito',
  cancel: 'Cancelar',
};

interface ModalConfirmProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
  i18n?: Partial<I18N>;
  children?: React.ReactNode;
}

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
        {children && <Box sx={tsStyles.childrenBoxStyles}>{children}</Box>}
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
