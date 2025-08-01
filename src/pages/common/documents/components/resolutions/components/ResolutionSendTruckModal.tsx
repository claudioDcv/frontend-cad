import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { ModalConfirm, Notification } from '@/components';
import ModalInput from '@/components/organisms/modal-input';
import { formatDateHour, toDay } from '@/utils';
import { ResolutionSendTruckModalProps } from './types';

const ResolutionSendTruckModal = ({ id, onClose }: ResolutionSendTruckModalProps) => {
  const { t } = useTranslation();
  const date = formatDateHour(toDay());

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

  const handleSuccessInput = async () => {
    setOpenConfirm(true);
  };

  const handleConfirm = async () => {
    setNotificationMessage(t('notification.sendTruckSuccess', { id }));
    setNotificationSeverity('success');
    setNotificationOpen(true);
    setOpenConfirm(false);
    onClose();
  };

  const handleCancelConfirm = () => {
    setNotificationMessage(t('notification.sendTruckCancel', { id }));
    setNotificationSeverity('error');
    setNotificationOpen(true);
    setOpenConfirm(false);
    onClose();
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <>
      <ModalInput
        open={!!id}
        onClose={onClose}
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

      {id && (
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
      )}

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
