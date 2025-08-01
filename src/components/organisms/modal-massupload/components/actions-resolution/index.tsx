import { useEffect, useState } from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import { ActionsResolutionProps } from './index.types';
import { useTranslation } from 'react-i18next';
import { ModalActions, ModalConfirm } from '@/components';
import AlertCard from '@/components/atoms/alert-card';
import { diffInitialState, getDiff } from './index.utils';

const ActionsResolution: React.FC<ActionsResolutionProps> = ({
  onSuccess,
  onClose,
  loading,
  expected,
  current,
}) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [diff, setDiff] = useState({ ...diffInitialState });

  useEffect(() => {
    const diffData = getDiff(expected, current);
    setDiff(diffData);
  }, [expected, current]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSuccess = async () => {
    await onSuccess();
    setOpenConfirm(false);
  };

  const getText = () => {
    const message = [];

    if (diff.isQuantity) {
      const q = { quantity: diff.quantity };
      message.push(
        diff.quantityExceeded
          ? t('alertResolutionSolve.quantityExceeded', q)
          : t('alertResolutionSolve.quantityMissing', q)
      );
    }

    if (diff.isWeight) {
      const w = { weight: diff.weight };
      message.push(
        diff.weightExceeded
          ? t('alertResolutionSolve.weightExceeded', w)
          : t('alertResolutionSolve.weightMissing', w)
      );
    }

    return message.join('\n');
  };

  return (
    <>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button variant="contained" size="small" disabled>
            Cuentas por cobrar
          </Button>

          <Box display="flex" gap={1}>
            <ModalActions
              wrap={false}
              onSuccess={onSuccess}
              onClose={onClose}
              loading={loading}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleOpenConfirm}
            >
              {t('common.requestResolution')}
            </Button>
          </Box>
        </Box>
      </DialogActions>

      <ModalConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccess={handleSuccess}
        i18n={{
          title: t('modalConfirm.confirmationTitle'),
          text: t('modalConfirm.approvalConfirm'),
          success: t('common.send'),
          cancel: t('common.cancel'),
        }}
      >
        {(diff.isQuantity || diff.isWeight) && (
          <AlertCard
            severity="warning"
            open={true}
            closable={false}
            onClose={() => undefined}
            i18n={{
              title: t('alertResolutionSolve.warning'),
              text: getText(),
            }}
          />
        )}
      </ModalConfirm>
    </>
  );
};

export default ActionsResolution;
