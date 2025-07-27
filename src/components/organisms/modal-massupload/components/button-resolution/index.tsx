import { useState } from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import { ButtonResolutionProps } from './index.types';
import { useTranslation } from 'react-i18next';
import { ModalActions, ModalConfirm } from '@/components';
import AlertCard from '@/components/atoms/alert-card';

const ButtonResolution: React.FC<ButtonResolutionProps> = ({
  onSuccess,
  onClose,
  loading,
  expected,
  actual,
}) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [diffMessage, setDiffMessage] = useState('');

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleSuccess = async () => {
    const diffQuantity = expected.quantity - actual.quantity;
    const diffWeight = expected.weight - actual.weight;

    const messages = [];

    if (diffQuantity > 0) {
      messages.push(t('alert.quantityMissing', { quantity: diffQuantity }));
    } else if (diffQuantity < 0) {
      messages.push(
        t('alert.quantityExceeded', { quantity: Math.abs(diffQuantity) })
      );
    }

    if (diffWeight > 0) {
      messages.push(t('alert.weightMissing', { weight: diffWeight }));
    } else if (diffWeight < 0) {
      messages.push(
        t('alert.weightExceeded', { weight: Math.abs(diffWeight) })
      );
    }

    await onSuccess();
    setOpenConfirm(false);

    if (messages.length > 0) {
      setDiffMessage(`${t('alert.diffWarning')}\n${messages.join('\n')}`);
      setOpenAlert(true);
    }
  };

  return (
    <>
      <DialogActions>
        <Box sx={{ p: 2 }} display="flex" gap={2} justifyContent="flex-end">
          <ModalActions
            wrap={false}
            onSuccess={onSuccess}
            onClose={onClose}
            loading={loading}
          />
          <Button variant="contained" size="small" onClick={handleOpenConfirm}>
            {t('common.requestApproval')}
          </Button>
        </Box>
      </DialogActions>

      <ModalConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccess={handleSuccess}
        i18n={{
          title: t('modalConfirm.confirmationTitle'),
          text: t('modalConfirm.approvalConfirm'),
        }}
      />

      <AlertCard
        severity="warning"
        open={openAlert}
        onClose={handleCloseAlert}
        i18n={{
          title: t('alert.warning'),
          text: diffMessage,
        }}
      />
    </>
  );
};

export default ButtonResolution;
