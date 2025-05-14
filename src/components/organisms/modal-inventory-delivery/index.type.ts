export type Item = {
  value: string;
  label: string;
};

export interface I18N {
  label: string;
  success: string;
  cancel: string;
}

export const initialStateI18N: I18N = {
  label: 'Label',
  success: 'Success',
  cancel: 'Cancel',
};

type SuccessData = {
  selectedOption: Item;
  selectedDestination: Item;
  units: number;
  grams: number;
  cost: number;
};

export interface InventoryDeliveryProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: SuccessData) => void;
  inventories: Item[];
  destinations?: Item[];
  i18n?: Partial<I18N>;
}