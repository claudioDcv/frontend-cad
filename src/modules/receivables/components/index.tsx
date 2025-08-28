import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useReceivablesContext } from '../context/useReceivablesContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ModalHeader from '@/components/molecules/modal-header';
import ReceivablesOperator from './ReceivablesOperator';
import { IconList } from '@/components';

const ReceivablesOperatorDialog = () => {
  const { t } = useTranslation();
  const [openNewReceivableForm, setOpenNewReceivableForm] = useState(false);
  const { resolutionId, setResolutionId } = useReceivablesContext();
  return (
    <Dialog
      open={Boolean(resolutionId)}
      onClose={() => setResolutionId(null)}
      fullWidth
      maxWidth="xl"
    >
      <AppBar position="static">
        <ModalHeader
          onClose={() => setResolutionId(null)}
          icon={<IconList name="receivables" />}
          title={t('accountsReceivable.title')}
          actions={
            <Button
              startIcon={<AddCircleIcon />}
              variant="contained"
              color="secondary"
              onClick={() => setOpenNewReceivableForm(true)}
            >
              {t('accountsReceivable.newReceivable')}
            </Button>
          }
        />
      </AppBar>
      <DialogContent>
        <DialogContentText>
          {t('accountsReceivable.description')}
        </DialogContentText>
        {resolutionId && (
          <ReceivablesOperator
            resolutionId={resolutionId}
            openNewReceivableForm={openNewReceivableForm}
            setOpenNewReceivableForm={setOpenNewReceivableForm}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setResolutionId(null)} color="secondary">
          {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReceivablesOperatorDialog;
