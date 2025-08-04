import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalConfirm, ModalMassUpload } from '@/components';
import { ResolutionMassiveModalProps } from './types';

const ResolutionMassiveModal = ({
  resolution,
  onClose,
}: ResolutionMassiveModalProps) => {
  const { t } = useTranslation();
  const [openInventory, setOpenInventory] = useState(false);
  const [showConfirm, setShowConfirm] = useState(!!resolution);

  const { resolutionId } = resolution ?? {};

  useEffect(() => {
    setShowConfirm(!!resolution);
  }, [resolution]);

  const handleConfirmSuccess = () => {
    if (!resolutionId) return;
    setShowConfirm(false);
    setOpenInventory(true);
  };

  const handleOnClose = () => {
    setOpenInventory(false);
    setShowConfirm(false);
    onClose();
  };

  const handleSuccess = () => {
    setOpenInventory(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      {showConfirm && (
        <ModalConfirm
          open={showConfirm}
          onClose={handleOnClose}
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
      )}

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
