import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditOffIcon from '@mui/icons-material/EditOff'; // Icono para sin nota
import { Contract } from '@/entities/Contract.entity';

const getContractStatusIcons = (contract: Contract) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {contract.cadMetadata?.reviewed ? (
        <CheckCircleIcon color="success" />
      ) : (
        <CancelIcon color="disabled" />
      )}
      {contract.cadMetadata?.note?.trim() ? (
        <EditNoteIcon color="primary" />
      ) : (
        <EditOffIcon color="disabled" />
      )}
    </Box>
  );
};

export default getContractStatusIcons;
