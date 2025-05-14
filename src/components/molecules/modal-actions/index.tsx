import { useState } from 'react';
import { Button, DialogActions } from '@mui/material';
import Checkbox from '../../atoms/checkbox';

interface I18N {
  checkboxLabel: string;
  success: string;
  cancel: string;
}

const initialStateI18n: I18N = {
  checkboxLabel: 'Check Label',
  success: 'Success',
  cancel: 'Cancel',
};

interface ModalActionsProps {
  onClose: () => void;
  onSuccess?: (checked: boolean) => void;
  checked?: boolean;
  showCheckbox?: boolean;
  i18n?: Partial<I18N>;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  i18n,
  onClose,
  onSuccess,
  checked: outChecked,
  showCheckbox,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;
  const [checked, setChecked] = useState<boolean>(outChecked || false);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess(checked);
      onClose();
    }
  };
  return (
    <DialogActions>
      {showCheckbox && (
        <Checkbox
          value={checked}
          onChange={handleCheckboxChange}
          label={lang?.checkboxLabel}
        />
      )}
      <Button onClick={onClose} variant="contained" color="secondary" type="button">
        {lang?.cancel}
      </Button>
      <Button onClick={handleSuccess} variant="contained" color="primary" type="submit">
        {lang?.success}
      </Button>
    </DialogActions>
  );
};

export default ModalActions;