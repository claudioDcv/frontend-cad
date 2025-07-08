import { useState } from 'react';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import ModalHeader from '../../molecules/modal-header';
import ModalActions from '../../molecules/modal-actions';

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
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  open,
  onClose,
  onSuccess,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  const [loading, setLoading] = useState(false);

  const handleSuccessClick = async () => {
    try {
      setLoading(true);
      await onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ModalHeader onClose={onClose}>{lang.title}</ModalHeader>
      <DialogContent>
        <DialogContentText>{lang.text}</DialogContentText>
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
