import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, DialogActions, TextField } from '@mui/material';
import { ContractMetadata } from '@/entities/Contract.entity';
import { orFalseBoolean, orVoidString, toDay } from '@/utils';
import { Access, Checkbox, ModalActions } from '@/components';
import { validRoles } from '@/constants';
import useAccess from '@/components/atoms/access/useAccess';
import tsStyles from './index.styles';

export interface ContractNoteProps {
  metadata?: ContractMetadata | null;
  onSuccess: (contract: ContractMetadata) => void;
  onClose: () => void;
  loading: boolean;
  editable?: boolean;
}

const getCreatedAt = (): string => {
  return toDay().toString();
};

const initialState = (): ContractMetadata => ({
  contractId: 0,
  note: null,
  reviewed: false,
  reviewedBy: null,
  reviewedAt: null,
  confirmedBy: null,
  confirmedAt: null,
  createdAt: getCreatedAt(),
  updatedAt: null,
});

const ContractNote: React.FC<ContractNoteProps> = ({
  metadata: initialContract,
  onSuccess,
  onClose,
  loading,
  editable,
}) => {
  const { t } = useTranslation();
  const access = useAccess();

  const getTextAreaReadonly = () =>
    access([validRoles.admin, validRoles.operator]);

  const [metadata, setMetadata] = useState<ContractMetadata>({
    ...initialState(),
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
      <Box sx={tsStyles.containerStyles}>
        <TextField
          label={t('common.note')}
          value={metadata.note}
          onChange={handleChangeNote}
          disabled={!editable}
          slotProps={{
            input: {
              readOnly: getTextAreaReadonly(),
            },
          }}
        />
        <Access roles={[validRoles.cordinator]}>
          <Box sx={tsStyles.actionsBoxStyles}>
            <Checkbox
              onChange={handleChangeReviewed}
              label={t('common.reviewed')}
              value={metadata.reviewed}
              disabled={!editable}
            />
            <ModalActions
              wrap={false}
              onSuccess={handleSuccess}
              onClose={onClose}
              loading={loading}
              disabled={!editable}
            />
          </Box>
        </Access>
      </Box>
    </DialogActions>
  );
};

export default ContractNote;
