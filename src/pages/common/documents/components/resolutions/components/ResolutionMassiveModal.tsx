import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalConfirm, ModalMassUpload } from '@/components';
import { ButtonResolutionsProps } from './types';

const ResolutionMassiveModal = ({ id, onClose }: ButtonResolutionsProps) => {
  const { t } = useTranslation();

  const [openInventory, setOpenInventory] = useState(false);

  const handleConfirmSuccess = () => {
    console.log('ID Resolución:', id);
    setOpenInventory(true);
  };

  return (
    <>
      <ModalConfirm
        open={!!id}
        onClose={onClose}
        onSuccess={handleConfirmSuccess}
        i18n={{
          title: t('modalConfirm.massiveLoadTitle'),
          text: t('modalConfirm.massiveLoadDescription', { id }),
          cancel: t('common.cancel'),
          success: t('common.accept'),
        }}
      />

      {id && (
        <ModalMassUpload
          open={openInventory}
          onClose={onClose}
          documentId={String(id)}
          onSuccess={(data: { units: number; grams: number; cost: number }) => {
            console.log('Datos de carga masiva:', data);
            setOpenInventory(false);
          }}
        />
      )}
    </>
  );
};

export default ResolutionMassiveModal;
