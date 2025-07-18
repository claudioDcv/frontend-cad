import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconList } from '@/components';
import ModalInput from '@/components/organisms/modal-input';

interface Props {
  id: string;
  label: string;
  disabled?: boolean;
}

const ResolutionSendTruckModal = ({ id, label, disabled }: Props) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuccess = async () => {
    console.log('✅ Enviar valor actualizado:', inputValue);
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
          {<IconList name='truckDoc' />}
        </IconButton>
      </Tooltip>
      <ModalInput
        open={open}
        onClose={() => setOpen(false)}
        value={inputValue}
        onChange={handleChange}
        onSuccess={handleSuccess}
        i18n={{
          title: 'Envio de Documento en Camión',
          label: 'Mensaje',
          cancel: t('common.cancel'),
          success: 'Marcar como enviado',
        }}
      />
    </>
  );
};

export default ResolutionSendTruckModal;
