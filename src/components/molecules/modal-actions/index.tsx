import { Button, DialogActions } from '@mui/material';

interface I18N {
  success: string;
  cancel: string;
}

const initialStateI18n: I18N = {
  success: 'Guardar',
  cancel: 'Cancelar',
};

interface ModalActionsProps {
  onClose: () => void;
  onSuccess?: () => void;
  i18n?: Partial<I18N>;
  wrap?: boolean;
  loading: boolean;
  disabled?: boolean;
}

const ModalActions: React.FC<ModalActionsProps> = ({
  i18n,
  onClose,
  onSuccess,
  wrap = true,
  loading,
  disabled = false,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  const base = (
    <>
      <Button
        onClick={onClose}
        variant="outlined"
        type="button"
        size="small"
        loading={loading}
        disabled={loading}
      >
        {lang?.cancel}
      </Button>
      <Button
        onClick={onSuccess}
        variant="contained"
        type="submit"
        size="small"
        loading={loading}
        disabled={loading || disabled}
      >
        {lang?.success}
      </Button>
    </>
  );

  if (wrap) {
    return <DialogActions>{base}</DialogActions>;
  }
  return base;
};

export default ModalActions;
