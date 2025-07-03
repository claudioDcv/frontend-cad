import { useEffect, useState } from 'react';
import { ContractMetadata } from '@/entities/Contract.entity';
import { DialogActions, Grid2 as Grid, TextField } from '@mui/material';
import Checkbox from '../checkbox';
import ModalActions from '@/components/molecules/modal-actions';
import { orFalseBoolean, orVoidString, toDay } from '@/utils';
import { useTranslation } from 'react-i18next';

const initialState: ContractMetadata = {
  contractId: 0,
  note: null,
  reviewed: false,
  reviewedBy: null,
  reviewedAt: null,
  confirmedBy: null,
  confirmedAt: null,
  createdAt: toDay.toString(),
  updatedAt: null,
};

interface ContractNoteProps {
  metadata?: ContractMetadata | null;
  onSuccess: (contract: ContractMetadata) => void;
  onClose: () => void;
};

const ContractNote: React.FC<ContractNoteProps> = ({
  metadata: initialContract,
  onSuccess,
  onClose,
}) => {
  const { t } = useTranslation();
  const [metadata, setMetadata] = useState<ContractMetadata>({
    ...initialState,
    ...initialContract,
    note: orVoidString(initialContract?.note),
    reviewed: orFalseBoolean(initialContract?.reviewed),
  });

  useEffect(() => {
    setMetadata((prev) => ({
      ...prev,
      contractId: initialContract?.contractId ?? 0,
      note: orVoidString(initialContract?.note),
      reviewed: orFalseBoolean(initialContract?.reviewed),
    }));
  }, [initialContract]);

  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata((prev) => ({
      ...prev,
      note: event.target.value,
    }));
  };

  const handleChangeReviewed = (reviewed: boolean) => {
    setMetadata((prev) => ({
      ...prev,
      reviewed,
    }));
  };

  const handleSuccess = () => {
    onSuccess(metadata);
  };

  return (
    <DialogActions>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }} gap={2}>
          <TextField
            label={t('contractMetadata.note')}
            value={metadata.note}
            onChange={handleChangeNote}
          />
          <Checkbox
            onChange={handleChangeReviewed}
            label={t('contractMetadata.reviewed')}
            value={metadata.reviewed}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ModalActions wrap={false} onSuccess={handleSuccess} onClose={onClose} />
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default ContractNote;
