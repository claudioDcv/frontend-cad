import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconList, ModalConfirm, Notification } from '@/components';
import ModalInput from '@/components/organisms/modal-input';
import { formatDateHour, toDay } from '@/utils';
import { ButtonResolutionsProps } from './types';

const ResolutionSendTruckModal = ({
  id,
  label,
  disabled,
}: ButtonResolutionsProps) => {
  const { t } = useTranslation();
  const date = formatDateHour(toDay());

  const [openInput, setOpenInput] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState<
    'success' | 'error'
  >('success');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOpenInput = () => {
    setOpenInput(true);
  };

  const handleCloseInput = () => {
    setOpenInput(false);
  };

  const handleSuccessInput = async () => {
    console.log('✅ Enviar valor actualizado:', inputValue);
    console.log('ID Resolución:', id);
    setOpenInput(false);
    setOpenConfirm(true);
  };

  const handleConfirm = async () => {
    setNotificationMessage(t('notification.sendTruckSuccess', { id }));
    setNotificationSeverity('success');
    setNotificationOpen(true);
    setOpenConfirm(false);
  };

  const handleCancelConfirm = () => {
    setNotificationMessage(t('notification.sendTruckCancel', { id }));
    setNotificationSeverity('error');
    setNotificationOpen(true);
    setOpenConfirm(false);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <>
      <Tooltip title={label}>
        <IconButton disabled={disabled} onClick={handleOpenInput}>
          <IconList name="truckDoc" />
        </IconButton>
      </Tooltip>

      <ModalInput
        open={openInput}
        onClose={handleCloseInput}
        value={inputValue}
        onChange={handleChange}
        onSuccess={handleSuccessInput}
        i18n={{
          title: t('modalInput.truckDocumentTitle'),
          label: t('modalInput.truckDocumentLabel'),
          cancel: t('common.cancel'),
          success: t('modalInput.truckDocumentSuccess'),
        }}
      />

      <ModalConfirm
        open={openConfirm}
        onClose={handleCancelConfirm}
        onSuccess={handleConfirm}
        i18n={{
          title: t('modalConfirm.confirmationTitle'),
          text: t('modalConfirm.truckDocumentDescription', {
            id,
            date,
          }),
          cancel: t('common.cancel'),
          success: t('common.send'),
        }}
      />

      <Notification
        open={notificationOpen}
        severity={notificationSeverity}
        onClose={handleCloseNotification}
        i18n={{
          title:
            notificationSeverity === 'success'
              ? t('notification.success')
              : t('notification.error'),
          text: notificationMessage,
        }}
      />
    </>
  );
};

export default ResolutionSendTruckModal;
