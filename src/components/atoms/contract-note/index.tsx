import { useEffect, useState } from 'react';
import { Contract } from '@/entities/Contract.entity';
import { Grid2 as Grid, TextField } from '@mui/material';
import Checkbox from '../checkbox';
import ModalActions from '@/components/molecules/modal-actions';
import { toDay } from '@/utils';

interface ContractNoteProps {
  contract: Contract;
  onSave: (contract: Contract) => void;
  onClose: () => void;
}

const ContractNote: React.FC<ContractNoteProps> = ({
  contract: initialContract,
  onSave,
  onClose,
}) => {
  const [contract, setContract] = useState<Contract>(() => ({
    ...initialContract,
    cadMetadata: initialContract.cadMetadata || {
      contractId: initialContract.contractId,
      note: '',
      reviewed: false,
      reviewedBy: null,
      reviewedAt: null,
      confirmedBy: null,
      confirmedAt: null,
      createdAt: toDay.toISOString(),
      updatedAt: null,
    },
  }));

  useEffect(() => {
    setContract((prevContract) => ({
      ...prevContract,
      cadMetadata: {
        ...prevContract.cadMetadata,
        contractId: initialContract.contractId,
      },
    }));
  }, [initialContract]);

  const handleSave = () => {
    if (!contract.cadMetadata) {
      console.error('Contract metadata is missing');
      return;
    }
    onSave(contract);
    onClose();
  };

  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContract((prevContract) => ({
      ...prevContract,
      cadMetadata: {
        ...prevContract.cadMetadata,
        note: event.target.value,
      },
    }));
  };

  const handleChangeReviewed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContract((prevContract) => ({
      ...prevContract,
      cadMetadata: {
        ...prevContract.cadMetadata,
        reviewed: event.target.checked,
      },
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Nota del contrato"
          value={contract.cadMetadata.note}
          onChange={handleChangeNote}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Checkbox
          onChange={handleChangeReviewed}
          label="Contrato revisado"
          value={contract.cadMetadata.reviewed}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <ModalActions onSuccess={handleSave} onClose={onClose} />
      </Grid>
    </Grid>
  );
};

export default ContractNote;
