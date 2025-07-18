import { Dialog, DialogContent } from '@mui/material';
import Input from '../../molecules/input';
import { initialStateI18n, ModalInputProps } from './index.type';
import ModalHeader from '../../molecules/modal-header';
import ModalActions from '../../molecules/modal-actions';
import { useState } from 'react';

const ModalInput: React.FC<ModalInputProps> = ({
  open,
  value,
  onClose,
  onChange,
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
        <Input
          marginTop
          label={lang.label}
          value={value}
          size="medium"
          onChange={onChange}
        />
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

export default ModalInput;
