import {
  Dialog,
  DialogContent,
} from '@mui/material';
import Input from '../../molecules/input';
import { initialStateI18n, ModalInputProps } from './index.type';
import ModalHeader from '../../molecules/modal-header';
import ModalActions from '../../molecules/modal-actions';

const ModalInput: React.FC<ModalInputProps> = ({
  open,
  value,
  onClose,
  onChange,
  onSuccess,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ModalHeader onClose={onClose}>
        {lang.title}
      </ModalHeader>
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
        onSuccess={onSuccess}
      />
    </Dialog>
  );
};

export default ModalInput;