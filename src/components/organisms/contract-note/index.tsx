import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, DialogActions, TextField } from '@mui/material';
import { ContractMetadata } from '@/entities/Contract.entity';
import { orFalseBoolean, orVoidString } from '@/utils';
import { ContractNoteProps, initialState } from './index.types';
import { Access, Checkbox, ModalActions } from '@/components';
import { validRoles } from '@/constants';
import useAccess from '@/components/atoms/access/useAccess';

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
          disabled={!editable}
          slotProps={{
            input: {
              readOnly: getTextAreaReadonly(),
            },
          }}
        />
        <Access roles={[validRoles.cordinator]}>
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
