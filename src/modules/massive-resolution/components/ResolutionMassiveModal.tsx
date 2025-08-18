import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalConfirm, ModalMassUpload } from '@/components';
import { Inventory } from '@/entities/Inventory.entity';
import usePatchResolutionInventory from '@/clients/patch-resolution-inventory';
import { useAlertContext } from '@/contexts/alert/useAlertContext';
import { AlertType } from '@/contexts/alert/types';
import { FetchStatus } from '@/constants';
import { Resolution } from '@/entities/Resolution.entity';
import usePatchResolutionResolve from '@/clients/patch-resolution-resolve';

export interface ResolutionMassiveModalProps {
  resolution: Resolution | null;
  onClose: () => void;

}

const ResolutionMassiveModal = ({
  resolution,
  onClose,
}: ResolutionMassiveModalProps) => {
  const { t } = useTranslation();
  const alertContext = useAlertContext();
  const [openInventory, setOpenInventory] = useState(false);
  const [showConfirm, setShowConfirm] = useState(!!resolution);
  const patchResolutionInventory = usePatchResolutionInventory();
  const patchResolutionResolve = usePatchResolutionResolve();

  useEffect(() => {
    setShowConfirm(!!resolution);
  }, [resolution]);

  const handleConfirmSuccess = () => {
    if (!resolution?.resolutionId) return;
    setShowConfirm(false);
    setOpenInventory(true);
  };

  const handleOnClose = () => {
    setOpenInventory(false);
    setShowConfirm(false);
    onClose();
  };

  useEffect(() => {
    if (patchResolutionInventory.status === FetchStatus.SUCCESS) {
      patchResolutionInventory.reset();
      alertContext.addAlert({
        type: AlertType.SUCCESS,
        title: t('common.success'),
        message: t('patchResolutionInventory.successMessage', {
          id: resolution?.resolutionId,
        }),
        callback: () => {
          setOpenInventory(false);
          setShowConfirm(false);
          onClose();
        },
      });
    }
    if (patchResolutionInventory.status === FetchStatus.ERROR) {
      patchResolutionInventory.reset();
      alertContext.addAlert({
        type: AlertType.ERROR,
        title: t('common.error'),
        message: t('patchResolutionInventory.errorMessage'),
        dismissible: true,
      });
    }
  }, [alertContext, onClose, patchResolutionInventory, resolution, t]);

  // Resolve
  useEffect(() => {
    if (patchResolutionResolve.status === FetchStatus.SUCCESS) {
      patchResolutionResolve.reset();
      alertContext.addAlert({
        type: AlertType.SUCCESS,
        title: t('common.success'),
        message: t('patchResolutionResolve.successMessage', {
          id: resolution?.resolutionId,
        }),
        callback: () => {
          setOpenInventory(false);
          setShowConfirm(false);
          onClose();
        },
      });
    }
    if (patchResolutionResolve.status === FetchStatus.ERROR) {
      patchResolutionResolve.reset();
      alertContext.addAlert({
        type: AlertType.ERROR,
        title: t('common.error'),
        message: t('patchResolutionResolve.errorMessage'),
        dismissible: true,
      });
    }
  }, [alertContext, onClose, patchResolutionResolve, resolution, t]);

  const handleSuccess = (inventories: Inventory[]) => {
    if (resolution?.resolutionId) {
      patchResolutionInventory.call({
        id: resolution?.resolutionId,
        inventories,
      });
    }
  };

  const handleSendOutput = () => {
    if (!resolution) return;
    patchResolutionResolve.call(resolution?.resolutionId);
  }
  if (!resolution) return null;

  return (
    <>
      <ModalConfirm
        open={showConfirm}
        onClose={handleOnClose}
        onSuccess={handleConfirmSuccess}
        i18n={{
          title: t('modalConfirm.massiveLoadTitle'),
          text: t('modalConfirm.massiveLoadDescription', resolution),
          cancel: t('common.cancel'),
          success: t('common.accept'),
        }}
      />

      <ModalMassUpload
        open={openInventory}
        onClose={handleOnClose}
        resolution={resolution}
        onSuccess={handleSuccess}
        onSendOutput={handleSendOutput}
        loading={patchResolutionInventory.loading}
      />
    </>
  );
};

export default ResolutionMassiveModal;
