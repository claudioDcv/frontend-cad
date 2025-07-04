import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, DialogActions, TextField } from '@mui/material';
import ModalActions from '@/components/molecules/modal-actions';
import { ContractMetadata } from '@/entities/Contract.entity';
import { orFalseBoolean, orVoidString, toDay } from '@/utils';
import Checkbox from '../../atoms/checkbox';

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
  loading: boolean;
}

const ContractNote: React.FC<ContractNoteProps> = ({
  metadata: initialContract,
  onSuccess,
  onClose,
  loading,
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

  const handleSuccess = async () => {
    onSuccess(metadata);
  };

  return (
    <DialogActions>
      <Box
        sx={{ p: 2 }}
        display="flex"
        flexDirection="column"
        gap={2}
        justifyContent="flex-end"
      >
        <TextField
          label={t('common.note')}
          value={metadata.note}
          onChange={handleChangeNote}
        />
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={1}
        >
          <Checkbox
            onChange={handleChangeReviewed}
            label={t('common.reviewed')}
            value={metadata.reviewed}
          />
          <ModalActions
            wrap={false}
            onSuccess={handleSuccess}
            onClose={onClose}
            loading={loading}
          />
        </Box>
      </Box>
    </DialogActions>
  );
};

export default ContractNote;
