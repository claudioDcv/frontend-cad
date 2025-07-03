import { Button, DialogActions } from '@mui/material';
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
  i18n?: Partial<I18N>;
  wrap?: boolean;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  i18n,
  onClose,
  onSuccess,
  wrap = true,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  const handleSuccess = () => {
    if (onSuccess) {
      onClose();
    }
  };

  const base = (<>
    <Button onClick={onClose} variant="contained" color="secondary" type="button" size="small">
      {lang?.cancel}
    </Button>
    <Button onClick={handleSuccess} variant="contained" color="primary" type="submit" size="small">
      {lang?.success}
    </Button>
  </>)

  if (wrap) {
    return (
      <DialogActions>
        {base}
      </DialogActions>
    );
  }
  return base;
};

export default ModalActions;