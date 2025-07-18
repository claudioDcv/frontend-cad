import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconList, ModalConfirm } from '@/components';

interface Props {
  id: string;
  label: string;
  disabled?: boolean;
}

const ResolutionMassiveModal = ({ id, label, disabled }: Props) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleSuccess = async () => {
    console.log('ID Resolucion:', id);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title={label}>
        <IconButton disabled={disabled} onClick={handleOpen}>
          {<IconList name="box" />}
        </IconButton>
      </Tooltip>
      <ModalConfirm
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
        i18n={{
          title: 'Confirmación Carga Masiva',
          text: '¿Estas seguro que deseas modificar el envió normal a Carga Masiva para el documento 565456456 ?',
          cancel: t('common.cancel'),
          success: 'Marcar como enviado',
        }}
      />
    </>
  );
};

export default ResolutionMassiveModal;
