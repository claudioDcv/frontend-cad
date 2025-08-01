import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalConfirm, ModalMassUpload } from '@/components';
import { ResolutionMassiveModalProps } from './types';

const ResolutionMassiveModal = ({
  resolution,
  onClose,
}: ResolutionMassiveModalProps) => {
  const { t } = useTranslation();
  const [openInventory, setOpenInventory] = useState(false);

  const { resolutionId } = resolution ?? {};

  const handleConfirmSuccess = () => {
    if (!resolutionId) return;
    setOpenInventory(true);
  };

  const handleOnClose = () => {
    setOpenInventory(false);
    onClose();
  };

  const handleSuccess = () => {
    setOpenInventory(false);
    onClose();
  };

  return (
    <>
      <ModalConfirm
        open={!!resolution}
        onClose={onClose}
        onSuccess={handleConfirmSuccess}
        i18n={{
          title: t('modalConfirm.massiveLoadTitle'),
          text: t('modalConfirm.massiveLoadDescription', {
            id: resolutionId,
          }),
          cancel: t('common.cancel'),
          success: t('common.accept'),
        }}
      />

      {resolution && (
        <ModalMassUpload
          open={openInventory}
          onClose={handleOnClose}
          resolution={resolution}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default ResolutionMassiveModal;
