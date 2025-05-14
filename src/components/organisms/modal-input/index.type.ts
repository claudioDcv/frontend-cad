export interface I18N {
  title: string;
  label: string;
  success: string;
  cancel: string;
}

export const initialStateI18n: I18N = {
  title: "Modal input",
  label: "Label",
  success: "Success",
  cancel: "Cancel",
};

export interface ModalInputProps {
  open: boolean;
  value: string;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSuccess: () => void;
  i18n?: Partial<I18N>;
}