import { useEffect, useState } from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModalActions, ModalConfirm } from '@/components';
import AlertCard from '@/components/atoms/alert-card';
import { diffInitialState, getDiff } from './index.utils';
import tsStyles from './index.styles';

interface Total {
  quantity: number;
  weight: number;
}

interface ActionsResolutionProps {
  expected: Total;
  current: Total;
  onClose: () => void;
  onSuccess: () => void;
  onSendOutput: () => void;
  loading: boolean;
}

const ActionsResolution: React.FC<ActionsResolutionProps> = ({
  onSendOutput,
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

  const handleModalSuccess = () => {
    onSuccess();
  };

  const handleAlertClose = () => {};

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
        <Box sx={tsStyles.dialogActionsContainer}>
          <Box sx={tsStyles.buttonGroup}>
            <ModalActions
              wrap={false}
              onSuccess={handleModalSuccess}
              onClose={onClose}
              loading={loading}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleOpenConfirm}
            >
              {t('common.sendToOutput')}
            </Button>
          </Box>
        </Box>
      </DialogActions>

      <ModalConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccess={onSendOutput}
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
            onClose={handleAlertClose}
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
