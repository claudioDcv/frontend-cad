import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconList, ModalConfirm, ModalMassUpload } from '@/components';
import { ButtonResolutionsProps } from './types';

const ResolutionMassiveModal = ({
  id,
  label,
  disabled,
}: ButtonResolutionsProps) => {
  const { t } = useTranslation();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmSuccess = () => {
    console.log('ID Resolución:', id);
    setOpenConfirm(false);
    setOpenInventory(true);
  };

  return (
    <>
      <Tooltip title={label}>
        <IconButton disabled={disabled} onClick={handleOpenConfirm}>
          <IconList name="box" />
        </IconButton>
      </Tooltip>

      <ModalConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccess={handleConfirmSuccess}
        i18n={{
          title: t('modalConfirm.massiveLoadTitle'),
          text: t('modalConfirm.massiveLoadDescription', { id }),
          cancel: t('common.cancel'),
          success: t('common.accept'),
        }}
      />

      <ModalMassUpload
        open={openInventory}
        onClose={() => setOpenInventory(false)}
        onSuccess={(data: { units: number; grams: number; cost: number }) => {
          console.log('Datos de carga masiva:', data);
          setOpenInventory(false);
        }}
      />
    </>
  );
};

export default ResolutionMassiveModal;
