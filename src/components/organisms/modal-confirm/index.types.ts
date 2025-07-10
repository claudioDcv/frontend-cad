interface I18N {
  title: string;
  text: string;
  success: string;
  cancel: string;
}

export const initialStateI18n: I18N = {
  title: 'Modal input',
  text: 'Label',
  success: 'Éxito',
  cancel: 'Cancelar',
};

export interface ModalConfirmProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
  i18n?: Partial<I18N>;
}
